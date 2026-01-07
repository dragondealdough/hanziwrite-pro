import { GoogleGenAI, Modality } from "@google/genai";
import { AIInsight, CharacterData } from "../types";

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry<T>(fn: () => Promise<T>, retries = 3, backoff = 1000): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0 && (error.status === 500 || error.status === 503 || error.message?.includes('xhr error') || error.message?.includes('fetch failed'))) {
      console.warn(`Retrying API call... (${retries} attempts left)`);
      await delay(backoff);
      return fetchWithRetry(fn, retries - 1, backoff * 2);
    }
    throw error;
  }
}

export async function getCharacterInsights(character: string): Promise<AIInsight> {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
  const prompt = `Provide educational insights for the Traditional Chinese character (Taiwan usage) "${character}".
  Return a JSON object with exactly the following keys:
  - character: "${character}"
  - pinyin: Pinyin for the character.
  - zhuyin: Zhuyin (Bopomofo) for the character.
  - mnemonic: A short, memorable sentence to help remember how to write or the meaning of the character.
  - breakdown: A brief explanation of the radicals or components (Traditional).
  - usage: A common word or short phrase using this character (with Pinyin and Zhuyin, Traditional Chinese).
  
  Do not include markdown formatting. Just return the raw JSON object.`;

  try {
    return await fetchWithRetry(async () => {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" },
      });
      if (!response.text) throw new Error("Empty response");
      return JSON.parse(response.text) as AIInsight;
    });
  } catch (error: any) {
    return {
      character: character,
      pinyin: "(unknown)",
      zhuyin: "(unknown)",
      mnemonic: `Visualize ${character} and practice its structure to build muscle memory.`,
      breakdown: "Detailed breakdown currently unavailable.",
      usage: `${character} (Usage unavailable)`,
    };
  }
}

export async function searchMandarin(query: string): Promise<CharacterData[]> {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
  const prompt = `The user wants to practice writing Traditional Chinese characters (Taiwan standard) based on the search query: "${query}".
  Return a JSON array of CharacterData objects for each character in the word.
  Each object must have:
  - char (Traditional Chinese character)
  - pinyin (with tone marks)
  - zhuyin (Bopomofo)
  - meaning (English meaning)
  - difficulty (1-5)
  - exampleSentence (a short example sentence in Traditional Chinese using this character)
  - exampleTranslation (English translation of the example sentence)
  Do not include markdown.`;

  try {
    return await fetchWithRetry(async () => {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-05-20",
        contents: prompt,
        config: { responseMimeType: "application/json" },
      });
      if (!response.text) throw new Error("Empty response");
      return JSON.parse(response.text) as CharacterData[];
    });
  } catch (error) {
    console.error("Search Error:", error);
    throw error;
  }
}

let audioContext: AudioContext | null = null;
function getAudioContext() {
  if (!audioContext) audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  return audioContext;
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
  }
  return buffer;
}

export async function playMandarinAudio(text: string, pinyin?: string): Promise<void> {
  // Use Browser SpeechSynthesis as a reliable fallback immediately if API_KEY is missing or if previous errors occurred.
  // However, we default to Gemini for high quality.

  const performFallback = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-TW';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  try {
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') await ctx.resume();

    // Adding Pinyin to the prompt significantly improves pronunciation accuracy for single characters
    const instruction = pinyin
      ? `Pronounce the Traditional Chinese character "${text}" clearly with the pronunciation matching the Pinyin "${pinyin}". Do not say anything else.`
      : `Pronounce the Traditional Chinese character "${text}" clearly. Do not say anything else.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: instruction }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
        },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    const audioPart = parts.find(p => p.inlineData && p.inlineData.mimeType?.startsWith('audio/'));
    const base64Audio = audioPart?.inlineData?.data;

    if (!base64Audio) {
      console.warn("Gemini TTS: No audio data returned, switching to fallback.");
      performFallback();
      return;
    }

    const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.start();
  } catch (error) {
    console.warn("Gemini TTS Error (falling back to system voice):", error);
    performFallback();
  }
}
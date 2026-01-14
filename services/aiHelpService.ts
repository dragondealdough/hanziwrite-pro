import { pipeline, env } from '@xenova/transformers';
import { pdfjs } from 'react-pdf';

// Skip local model checks for browser env
env.allowLocalModels = false;
env.useBrowserCache = true;

const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2';

export interface PageIndex {
    pageNumber: number;
    text: string;
    embedding: number[];
}

export interface SearchResult {
    pageNumber: number;
    score: number;
    snippet: string;
    matchType: 'exact' | 'semantic';
}

class AIHelpService {
    private extractor: any = null;
    private index: PageIndex[] = [];
    private isIndexing = false;

    async init() {
        if (!this.extractor) {
            this.extractor = await pipeline('feature-extraction', MODEL_NAME);
        }
    }

    async getEmbedding(text: string): Promise<number[]> {
        if (!this.extractor) await this.init();
        const output = await this.extractor(text, { pooling: 'mean', normalize: true });
        return Array.from(output.data);
    }

    async indexPDF(url: string, onProgress?: (current: number, total: number) => void) {
        if (this.isIndexing) return;
        this.isIndexing = true;

        try {
            // Check local storage first
            const cached = localStorage.getItem('pdf_index_v1');
            if (cached) {
                this.index = JSON.parse(cached);
                this.isIndexing = false;
                return;
            }

            // Check for pre-computed index
            try {
                const precomputed = await fetch('/pdf-index.json');
                if (precomputed.ok) {
                    this.index = await precomputed.json();
                    localStorage.setItem('pdf_index_v1', JSON.stringify(this.index)); // Cache it too
                    this.isIndexing = false;
                    return;
                }
            } catch (e) {
                console.warn('Pre-computed index not found, falling back to live indexing.');
            }

            const pdf = await pdfjs.getDocument(url).promise;
            const totalPages = pdf.numPages;
            const newIndex: PageIndex[] = [];

            // Start from page 14 (content start)
            for (let i = 14; i <= totalPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const text = textContent.items.map((item: any) => item.str).join(' ');

                // Only index if there's meaningful content
                if (text.length > 50) {
                    const embedding = await this.getEmbedding(text);
                    newIndex.push({ pageNumber: i, text, embedding });
                }

                if (onProgress) onProgress(i, totalPages);

                // Yeild to main thread to keep UI responsive
                await new Promise(resolve => setTimeout(resolve, 10));
            }

            this.index = newIndex;
            localStorage.setItem('pdf_index_v1', JSON.stringify(this.index));
        } catch (e) {
            console.error("Indexing failed", e);
        } finally {
            this.isIndexing = false;
        }
    }

    async search(query: string): Promise<SearchResult[]> {
        if (this.index.length === 0) return [];

        const queryEmbedding = await this.getEmbedding(query);

        // Extract Chinese characters for "Hybrid Search"
        const queryChars = query.match(/[\u4e00-\u9fa5]/g) || [];
        const uniqueQueryChars = Array.from(new Set(queryChars));
        const hasSpecificChars = uniqueQueryChars.length > 0;

        let results: SearchResult[] = [];

        for (const item of this.index) {
            let score = this.cosineSimilarity(queryEmbedding, item.embedding);
            let matchType: 'exact' | 'semantic' = 'semantic';

            // 2. Keyword/Character Boosting
            if (hasSpecificChars) {
                let matchCount = 0;
                for (const char of uniqueQueryChars) {
                    if (item.text.includes(char)) {
                        matchCount++;
                    }
                }

                if (matchCount > 0) {
                    const coverage = matchCount / uniqueQueryChars.length;

                    if (coverage === 1 && uniqueQueryChars.length > 1) {
                        score += 0.5; // Massive boost for intersection
                        matchType = 'exact';
                    } else if (coverage === 1) {
                        score += 0.2;
                        matchType = 'exact';
                    } else {
                        score += 0.1 * coverage;
                    }
                }
            }

            // Generate snippet
            // If exact match, try to center on the chars. Otherwise Start of text.
            let snippet = item.text.substring(0, 120) + '...';
            if (hasSpecificChars && matchType === 'exact') {
                const firstCharIdx = item.text.indexOf(uniqueQueryChars[0]);
                if (firstCharIdx !== -1) {
                    const start = Math.max(0, firstCharIdx - 40);
                    const end = Math.min(item.text.length, firstCharIdx + 80);
                    snippet = (start > 0 ? '...' : '') + item.text.substring(start, end) + '...';
                }
            }

            if (score > 0.25) { // Threshold to cut off garbage
                results.push({ pageNumber: item.pageNumber, score, snippet, matchType });
            }
        }

        // Sort by score desc and take top 5
        return results.sort((a, b) => b.score - a.score).slice(0, 5);
    }

    private cosineSimilarity(a: number[], b: number[]) {
        let dot = 0;
        let magA = 0;
        let magB = 0;
        for (let i = 0; i < a.length; i++) {
            dot += a[i] * b[i];
            magA += a[i] * a[i];
            magB += b[i] * b[i];
        }
        return dot / (Math.sqrt(magA) * Math.sqrt(magB));
    }
}

export const aiService = new AIHelpService();

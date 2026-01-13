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

    async search(query: string): Promise<number | null> {
        if (this.index.length === 0) return null;

        const queryEmbedding = await this.getEmbedding(query);

        let maxScore = -1;
        let bestPage = -1;

        for (const item of this.index) {
            const score = this.cosineSimilarity(queryEmbedding, item.embedding);
            if (score > maxScore) {
                maxScore = score;
                bestPage = item.pageNumber;
            }
        }

        return bestPage;
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

import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFReaderProps {
    onBack: () => void;
}

const START_PAGE = 14;

const PDFReader: React.FC<PDFReaderProps> = ({ onBack }) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(START_PAGE);
    const [scale, setScale] = useState(1.0);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const pdfRef = useRef<any>(null);

    function onDocumentLoadSuccess(pdf: any) {
        setNumPages(pdf.numPages);
        pdfRef.current = pdf;
    }

    const handleSearch = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!searchQuery.trim() || !pdfRef.current) return;

        setIsSearching(true);
        try {
            const query = searchQuery.toLowerCase();
            // Start searching from current page, wrapping around if needed
            // But for simplicity/predictability, let's search forward from page 14

            let foundPage = -1;

            // brute force search all allowed pages
            for (let i = START_PAGE; i <= numPages; i++) {
                const page = await pdfRef.current.getPage(i);
                const textContent = await page.getTextContent();
                const textItems = textContent.items.map((item: any) => item.str).join(' ');

                if (textItems.toLowerCase().includes(query)) {
                    foundPage = i;
                    break;
                }
            }

            if (foundPage !== -1) {
                setPageNumber(foundPage);
            } else {
                alert('Text not found in the book.');
            }
        } catch (err) {
            console.error('Search failed:', err);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-100 dark:bg-[#0d0f12] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white dark:bg-[#16191e] border-b border-slate-200 dark:border-slate-800 shadow-sm z-10 gap-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-bold uppercase tracking-widest text-xs transition-colors shrink-0"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back
                </button>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 max-w-md relative">
                    <input
                        type="text"
                        placeholder="Search in book..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        disabled={isSearching}
                        className="w-full pl-4 pr-10 py-2 bg-slate-50 dark:bg-[#0d0f12] border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold focus:ring-2 ring-rose-500/50 outline-none"
                    />
                    <button
                        type="submit"
                        disabled={isSearching}
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    >
                        {isSearching ? (
                            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        )}
                    </button>
                </form>

                <div className="w-20 hidden md:block"></div> {/* Spacer */}
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-center gap-4 p-2 bg-slate-50 dark:bg-[#121418] border-b border-slate-200 dark:border-slate-800">
                <button
                    disabled={pageNumber <= START_PAGE}
                    onClick={() => setPageNumber(p => p - 1)}
                    className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
                >
                    <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>

                <span className="font-mono text-sm font-bold dark:text-slate-300">
                    Page {pageNumber} of {numPages || '--'}
                </span>

                <button
                    disabled={pageNumber >= numPages}
                    onClick={() => setPageNumber(p => p + 1)}
                    className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
                >
                    <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>

                <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-2"></div>

                <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded dark:text-white">-</button>
                <span className="text-xs font-bold w-12 text-center dark:text-slate-300">{Math.round(scale * 100)}%</span>
                <button onClick={() => setScale(s => Math.min(2.0, s + 0.1))} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded dark:text-white">+</button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto flex justify-center p-8 bg-slate-200/50 dark:bg-[#0d0f12]">
                <div className="shadow-2xl">
                    <Document
                        file="/reference_book.pdf"
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="flex flex-col items-center"
                        loading={<div className="p-10 text-slate-400 font-bold animate-pulse">Loading Document...</div>}
                        error={<div className="p-10 text-rose-500 font-bold">Failed to load PDF.</div>}
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            renderTextLayer={true}
                            renderAnnotationLayer={false}
                            className="bg-white"
                        />
                    </Document>
                </div>
            </div>
        </div>
    );
};

export default PDFReader;

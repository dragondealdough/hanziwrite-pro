
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure worker - crucial for Vite
// Using unpkg for worker source as a fallback/standard pattern for react-pdf without complex build config
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFReaderProps {
    onBack: () => void;
}

const PDFReader: React.FC<PDFReaderProps> = ({ onBack }) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <div className="flex flex-col h-full bg-slate-100 dark:bg-[#0d0f12] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white dark:bg-[#16191e] border-b border-slate-200 dark:border-slate-800 shadow-sm z-10">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-bold uppercase tracking-widest text-xs transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back
                </button>
                <div className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-sm">
                    Reference Book
                </div>
                <div className="w-20"></div> {/* Spacer for alignment */}
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-center gap-4 p-2 bg-slate-50 dark:bg-[#121418] border-b border-slate-200 dark:border-slate-800">
                <button
                    disabled={pageNumber <= 1}
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
                        error={<div className="p-10 text-rose-500 font-bold">Failed to load PDF. Please check if the file exists.</div>}
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            renderTextLayer={false}
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

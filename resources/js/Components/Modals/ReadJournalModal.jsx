import React from 'react';
import { formatDateIndo } from '@/Utils/dateHelpers';

export default function ReadJournalModal({
    isOpen,
    journal,
    onClose,
}) {
    if (!isOpen || !journal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in font-sans">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto border border-slate-200 animate-scale-up">
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                    <div>
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-black text-white mb-2 inline-block uppercase tracking-wider">
                            {journal.category}
                        </span>
                        <h3 className="font-display font-black text-xl md:text-2xl text-slate-900 tracking-tight">
                            {journal.title}
                        </h3>
                        <p className="text-xs font-mono text-slate-400 mt-1">Tanggal: {formatDateIndo(journal.study_date)}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        <i className="ph-bold ph-x text-xl"></i>
                    </button>
                </div>

                <div className="text-slate-800 leading-relaxed whitespace-pre-wrap text-xs sm:text-sm font-mono bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    {journal.content}
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-mono font-bold rounded-xl transition-all cursor-pointer active:scale-95"
                    >
                        Tutup Bacaan
                    </button>
                </div>
            </div>
        </div>
    );
}

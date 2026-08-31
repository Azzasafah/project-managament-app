import React from 'react';
import { formatDateIndo } from '@/Utils/dateHelpers';

export default function ReadJournalModal({
    isOpen,
    journal,
    onClose,
}) {
    if (!isOpen || !journal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                    <div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 mb-2 inline-block">
                            {journal.category}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-slate-800">
                            {journal.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">Tanggal: {formatDateIndo(journal.study_date)}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                        <i className="ph-bold ph-x text-2xl"></i>
                    </button>
                </div>
                <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-sm font-mono bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    {journal.content}
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}

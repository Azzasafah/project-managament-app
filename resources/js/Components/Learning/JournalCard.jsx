import React from 'react';
import { getDayNumber, getMonthShort, formatDateIndo } from '@/Utils/dateHelpers';

export default function JournalCard({
    journal,
    onEdit,
    onDelete,
    onReadFull,
}) {
    return (
        <article className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 md:p-6 transition-all hover:border-slate-400 hover:shadow-md font-sans">
            <div className="flex items-start gap-4 mb-4">
                {/* Date Badge Box */}
                <div className="hidden sm:flex flex-col items-center justify-center min-w-[64px] bg-slate-50 rounded-2xl py-3 border border-slate-200/80">
                    <span className="text-xl font-display font-black text-slate-900 leading-none">
                        {getDayNumber(journal.study_date)}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-neutral-500 tracking-wider uppercase mt-1">
                        {getMonthShort(journal.study_date)}
                    </span>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-neutral-900 text-white uppercase tracking-wider">
                                {journal.category}
                            </span>
                            <span className="sm:hidden text-xs font-mono text-slate-500">
                                {formatDateIndo(journal.study_date, true)}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => onEdit(journal)}
                                className="text-slate-400 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                                title="Edit Jurnal"
                            >
                                <i className="ph-bold ph-pencil-simple text-sm"></i>
                            </button>
                            <button
                                onClick={() => onDelete(journal.id)}
                                className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Hapus Jurnal"
                            >
                                <i className="ph-bold ph-trash text-sm"></i>
                            </button>
                        </div>
                    </div>

                    <h3
                        onClick={() => onReadFull(journal)}
                        className="text-base sm:text-lg font-display font-extrabold text-slate-900 leading-snug mb-2 hover:text-neutral-700 cursor-pointer transition-colors"
                    >
                        {journal.title}
                    </h3>

                    {Array.isArray(journal.tags) && journal.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {journal.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-[10px] font-mono font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 md:p-5 text-xs sm:text-sm text-slate-600 leading-relaxed border border-slate-100 font-sans">
                <p>{journal.snippet || journal.content}</p>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => onReadFull(journal)}
                    className="text-xs font-mono font-bold text-neutral-800 hover:text-black flex items-center gap-1 group cursor-pointer active:scale-95"
                >
                    Baca Artikel Penuh{' '}
                    <i className="ph-bold ph-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                </button>
            </div>
        </article>
    );
}

import React from 'react';
import { getDayNumber, getMonthShort, formatDateIndo } from '@/Utils/dateHelpers';

export default function JournalCard({
    journal,
    onEdit,
    onDelete,
    onReadFull,
}) {
    return (
        <article className="bg-white rounded-3xl border border-slate-100 shadow-soft p-5 md:p-6 transition-transform hover:-translate-y-1 duration-300">
            <div className="flex items-start gap-4 mb-4">
                {/* Date Badge Box */}
                <div className="hidden sm:flex flex-col items-center justify-center min-w-[60px] bg-slate-50 rounded-2xl py-3 border border-slate-100 shadow-inner">
                    <span className="text-base font-black text-slate-800 leading-none">
                        {getDayNumber(journal.study_date)}
                    </span>
                    <span className="text-[10px] font-extrabold text-indigo-600 tracking-wider uppercase mt-1">
                        {getMonthShort(journal.study_date)}
                    </span>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600">
                                {journal.category}
                            </span>
                            <span className="sm:hidden text-xs text-slate-500 font-semibold">
                                {formatDateIndo(journal.study_date, true)}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => onEdit(journal)}
                                className="text-slate-300 hover:text-indigo-600 p-1 cursor-pointer"
                                title="Edit Jurnal"
                            >
                                <i className="ph-bold ph-pencil-simple"></i>
                            </button>
                            <button
                                onClick={() => onDelete(journal.id)}
                                className="text-slate-300 hover:text-rose-600 p-1 cursor-pointer"
                                title="Hapus Jurnal"
                            >
                                <i className="ph-bold ph-trash"></i>
                            </button>
                        </div>
                    </div>

                    <h3
                        onClick={() => onReadFull(journal)}
                        className="text-lg md:text-xl font-bold text-slate-800 leading-tight mb-2 hover:text-indigo-600 cursor-pointer transition-colors"
                    >
                        {journal.title}
                    </h3>

                    {Array.isArray(journal.tags) && journal.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {journal.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 md:p-5 text-sm text-slate-600 leading-relaxed border border-slate-100">
                <p>{journal.snippet || journal.content}</p>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => onReadFull(journal)}
                    className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group cursor-pointer"
                >
                    Baca Artikel Penuh{' '}
                    <i className="ph-bold ph-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                </button>
            </div>
        </article>
    );
}

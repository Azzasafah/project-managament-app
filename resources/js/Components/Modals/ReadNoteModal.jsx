import React from 'react';
import { formatDateIndo } from '@/Utils/dateHelpers';

export default function ReadNoteModal({
    isOpen,
    note,
    onClose,
}) {
    if (!isOpen || !note) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in font-sans">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl space-y-4 border border-slate-200 animate-scale-up">
                <div className="flex justify-between items-start border-b border-slate-100 pb-3.5">
                    <div>
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-black text-white uppercase tracking-wider">
                            Catatan Kajian
                        </span>
                        <h3 className="font-display font-black text-xl text-slate-900 mt-2">{note.title}</h3>
                        <p className="text-xs font-mono text-slate-400 mt-0.5">{formatDateIndo(note.event_date)}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        <i className="ph-bold ph-x text-xl"></i>
                    </button>
                </div>
                <div className="text-slate-800 leading-relaxed text-xs sm:text-sm bg-slate-50 p-5 rounded-2xl border border-slate-200 font-sans whitespace-pre-line">
                    {note.notes}
                </div>
                <div className="border-t border-slate-100 pt-3.5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-mono font-bold rounded-xl transition-all cursor-pointer active:scale-95"
                    >
                        Tutup Catatan
                    </button>
                </div>
            </div>
        </div>
    );
}

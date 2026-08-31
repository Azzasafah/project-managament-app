import React from 'react';
import { formatDateIndo } from '@/Utils/dateHelpers';

export default function ReadNoteModal({
    isOpen,
    note,
    onClose,
}) {
    if (!isOpen || !note) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl space-y-4">
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                    <div>
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Catatan Kajian</span>
                        <h3 className="text-xl font-bold text-slate-800 mt-2">{note.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{formatDateIndo(note.event_date)}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                        <i className="ph-bold ph-x text-2xl"></i>
                    </button>
                </div>
                <div className="text-slate-700 leading-relaxed text-sm bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                    {note.notes}
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-end">
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

import React from 'react';
import { formatDateIndo } from '@/Utils/dateHelpers';

export default function SpiritualView({
    upcomingKajians = [],
    kajianNotes = [],
    onAddNewKajian,
    onDeleteKajian,
    onReadNote,
}) {
    return (
        <div className="space-y-6 max-w-5xl mx-auto font-sans">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                        <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">
                            SPIRITUAL // RUHIYAH_HUB
                        </span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                        Spiritual & Catatan Kajian
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
                        Jadwal majelis ilmu dan arsip catatan kajian untuk penguatan ruhiyah & pemahaman syar'i.
                    </p>
                </div>
                <button
                    onClick={onAddNewKajian}
                    className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-mono font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                    <i className="ph-bold ph-plus text-sm"></i> Tambah Kajian / Catatan
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Upcoming Schedule List */}
                <div className="lg:col-span-2 space-y-3.5">
                    <div className="flex items-center gap-2 mb-1">
                        <i className="ph-bold ph-calendar-check text-base text-neutral-800"></i>
                        <h3 className="font-display font-extrabold text-slate-900 text-base uppercase tracking-tight">
                            Jadwal Terdekat
                        </h3>
                    </div>

                    {upcomingKajians.map((jadwal) => (
                        <div
                            key={jadwal.id}
                            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs relative overflow-hidden group hover:border-slate-400 transition-all"
                        >
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-start">
                                    <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono font-bold rounded-md">
                                        {formatDateIndo(jadwal.event_date, true)}
                                    </span>
                                    <button
                                        onClick={() => onDeleteKajian(jadwal.id)}
                                        className="text-slate-300 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                                        title="Hapus"
                                    >
                                        <i className="ph-bold ph-trash text-sm"></i>
                                    </button>
                                </div>
                                <h4
                                    className={`font-display font-bold text-slate-900 text-base leading-snug ${
                                        jadwal.is_completed ? 'line-through text-slate-400' : ''
                                    }`}
                                >
                                    {jadwal.title}
                                </h4>
                                {jadwal.speaker && (
                                    <p className="text-xs font-mono font-semibold text-neutral-700">{jadwal.speaker}</p>
                                )}
                                <div className="space-y-1 border-t border-slate-100 pt-2.5 mt-1 text-[11px] font-mono text-slate-500">
                                    <p className="flex items-center gap-1.5">
                                        <i className="ph-bold ph-clock text-slate-400"></i> {jadwal.time_info}
                                    </p>
                                    <p className="flex items-center gap-1.5">
                                        <i className="ph-bold ph-map-pin text-slate-400"></i> {jadwal.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {upcomingKajians.length === 0 && (
                        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-xs font-mono text-slate-400">
                            Belum ada jadwal kajian.
                        </div>
                    )}
                </div>

                {/* Notes Bookmark Grid */}
                <div className="lg:col-span-3 space-y-3.5">
                    <div className="flex items-center gap-2 mb-1">
                        <i className="ph-bold ph-book-open text-base text-neutral-800"></i>
                        <h3 className="font-display font-extrabold text-slate-900 text-base uppercase tracking-tight">
                            Catatan Kajian Terbaru
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {kajianNotes.map((note) => (
                            <div
                                key={note.id}
                                onClick={() => onReadNote(note)}
                                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:border-slate-400 hover:shadow-md transition-all cursor-pointer relative group"
                            >
                                <i className="ph-bold ph-bookmark-simple absolute top-5 right-5 text-amber-500 text-lg"></i>
                                <div className="text-[10px] font-mono font-bold text-neutral-400 mb-1.5">
                                    {formatDateIndo(note.event_date, true)}
                                </div>
                                <h4 className="font-display font-bold text-slate-900 text-sm mb-2 leading-snug">{note.title}</h4>
                                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-sans">
                                    {note.notes}
                                </p>
                            </div>
                        ))}

                        <div
                            onClick={onAddNewKajian}
                            className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-100 transition-all cursor-pointer sm:col-span-2 flex flex-col justify-center items-center text-center active:scale-[0.98]"
                        >
                            <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center mb-2 shadow-xs">
                                <i className="ph-bold ph-pencil-simple text-base"></i>
                            </div>
                            <h4 className="font-display font-bold text-slate-900 text-sm">Tulis Catatan Kajian Baru</h4>
                            <p className="text-xs font-mono text-slate-500 mt-0.5">"Ikatlah ilmu dengan menuliskannya."</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

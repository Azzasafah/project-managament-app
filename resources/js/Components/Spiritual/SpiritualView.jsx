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
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Spiritual & Kajian</h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Jadwal majelis ilmu dan arsip catatan kajian untuk penguatan ruhiyah.
                    </p>
                </div>
                <button
                    onClick={onAddNewKajian}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                >
                    <i className="ph-bold ph-plus"></i> Tambah Kajian / Catatan
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Upcoming Schedule List */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                        <i className="ph-fill ph-calendar-check text-indigo-600 text-xl"></i> Jadwal Terdekat
                    </h3>

                    {upcomingKajians.map((jadwal) => (
                        <div
                            key={jadwal.id}
                            className="bg-white p-4 rounded-3xl border border-slate-100 shadow-soft relative overflow-hidden group hover:border-indigo-200 transition-colors"
                        >
                            <div
                                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                                    jadwal.is_completed ? 'bg-slate-300' : 'bg-indigo-600'
                                }`}
                            />
                            <div className="pl-3 flex flex-col gap-2.5">
                                <div className="flex justify-between items-start">
                                    <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg">
                                        {formatDateIndo(jadwal.event_date, true)}
                                    </span>
                                    <button
                                        onClick={() => onDeleteKajian(jadwal.id)}
                                        className="text-slate-300 hover:text-rose-500 text-sm cursor-pointer"
                                    >
                                        <i className="ph-bold ph-trash"></i>
                                    </button>
                                </div>
                                <h4
                                    className={`font-bold text-slate-800 text-base leading-snug ${
                                        jadwal.is_completed ? 'line-through text-slate-400' : ''
                                    }`}
                                >
                                    {jadwal.title}
                                </h4>
                                {jadwal.speaker && (
                                    <p className="text-xs text-indigo-600 font-semibold">{jadwal.speaker}</p>
                                )}
                                <div className="space-y-1 border-t border-slate-50 pt-2 mt-1">
                                    <p className="text-xs text-slate-500 flex items-center gap-2 font-medium">
                                        <i className="ph-fill ph-clock text-slate-400"></i> {jadwal.time_info}
                                    </p>
                                    <p className="text-xs text-slate-500 flex items-center gap-2 font-medium">
                                        <i className="ph-fill ph-map-pin text-slate-400"></i> {jadwal.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {upcomingKajians.length === 0 && (
                        <div className="p-8 text-center bg-white rounded-3xl border border-slate-100 text-xs text-slate-400">
                            Belum ada jadwal kajian.
                        </div>
                    )}
                </div>

                {/* Notes Bookmark Grid */}
                <div className="lg:col-span-3 space-y-4">
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                        <i className="ph-fill ph-book-open text-emerald-500 text-xl"></i> Catatan Kajian Terbaru
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {kajianNotes.map((note) => (
                            <div
                                key={note.id}
                                onClick={() => onReadNote(note)}
                                className="bg-amber-50/60 p-5 rounded-3xl border border-amber-100 shadow-sm hover:shadow-md transition-all cursor-pointer relative group"
                            >
                                <i className="ph-fill ph-bookmark absolute top-4 right-4 text-amber-200 text-2xl group-hover:text-amber-300"></i>
                                <div className="text-xs font-bold text-amber-600 mb-2 tracking-wider">
                                    {formatDateIndo(note.event_date, true)}
                                </div>
                                <h4 className="font-bold text-amber-900 text-sm mb-2 leading-tight">{note.title}</h4>
                                <p className="text-xs text-amber-800/70 line-clamp-3 leading-relaxed font-medium">
                                    {note.notes}
                                </p>
                            </div>
                        ))}

                        <div
                            onClick={onAddNewKajian}
                            className="bg-emerald-50/50 p-5 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer sm:col-span-2 flex flex-col justify-center items-center text-center border-dashed"
                        >
                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                                <i className="ph-bold ph-pencil-simple text-lg"></i>
                            </div>
                            <h4 className="font-bold text-emerald-900 text-sm">Buat Catatan Kajian Baru</h4>
                            <p className="text-xs text-emerald-700/70 mt-1 font-medium">Ikatlah ilmu dengan menuliskannya.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

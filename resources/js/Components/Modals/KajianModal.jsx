import React from 'react';

export default function KajianModal({
    isOpen,
    form,
    setForm,
    onClose,
    onSubmit,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in font-sans">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4 border border-slate-200 animate-scale-up">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3.5">
                    <div>
                        <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                            SPIRITUAL // AGENDA
                        </span>
                        <h3 className="font-display font-extrabold text-lg text-slate-900 leading-tight">
                            Tambah Jadwal / Catatan Kajian
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        <i className="ph-bold ph-x text-lg"></i>
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Tema / Judul Kajian
                        </label>
                        <input
                            type="text"
                            required
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Misal: Tafsir Surat Al-Kahfi & Fiqih Muamalah"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-xs"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Ustadz / Pembicara
                        </label>
                        <input
                            type="text"
                            value={form.speaker}
                            onChange={(e) => setForm({ ...form, speaker: e.target.value })}
                            placeholder="Misal: Ustadz Dr. Firanda Andirja"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-xs"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Tanggal
                            </label>
                            <input
                                type="date"
                                required
                                value={form.event_date}
                                onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-black focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Waktu
                            </label>
                            <input
                                type="text"
                                value={form.time_info}
                                onChange={(e) => setForm({ ...form, time_info: e.target.value })}
                                placeholder="Ba'da Maghrib / 09:00 WIB"
                                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-black focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Lokasi / Masjid
                        </label>
                        <input
                            type="text"
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                            placeholder="Masjid Al-Ikhlas / Live Zoom"
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-xs"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Catatan Materi / Hikmah
                        </label>
                        <textarea
                            rows="3"
                            value={form.notes}
                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                            placeholder="Tuliskan poin faedah dan kesimpulan materi..."
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-xs"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 text-xs font-mono font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer active:scale-95"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-xs font-mono font-bold bg-black hover:bg-neutral-800 text-white rounded-xl shadow-md transition-all cursor-pointer active:scale-[0.98]"
                        >
                            Simpan Kajian
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

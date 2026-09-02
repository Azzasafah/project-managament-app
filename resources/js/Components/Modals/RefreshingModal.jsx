import React from 'react';

export default function RefreshingModal({
    isOpen,
    form,
    setForm,
    onClose,
    onSubmit,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in font-sans">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4 border border-slate-200 animate-scale-up">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3.5">
                    <div>
                        <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                            WELLBEING // REFRESHING
                        </span>
                        <h3 className="font-display font-extrabold text-lg text-slate-900 leading-tight">
                            Tambah Kategori Refreshing
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
                            Nama Aktivitas
                        </label>
                        <input
                            type="text"
                            required
                            value={form.title}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    title: e.target.value,
                                })
                            }
                            placeholder="Contoh: Berenang / Lari Pagi / Gaming"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-xs"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Kategori
                        </label>
                        <select
                            value={form.category}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    category: e.target.value,
                                })
                            }
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-black focus:outline-none"
                        >
                            <option value="Gaming">Gaming</option>
                            <option value="Sport">Sport / Olahraga</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Relaxation">Relaxation</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Ikon Aktivitas
                        </label>
                        <select
                            value={form.icon}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    icon: e.target.value,
                                })
                            }
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-black focus:outline-none"
                        >
                            <option value="ph-game-controller">Game Controller</option>
                            <option value="ph-sneaker">Sneaker / Olahraga</option>
                            <option value="ph-film-strip">Film / Movie</option>
                            <option value="ph-coffee">Coffee</option>
                            <option value="ph-music-notes">Musik</option>
                        </select>
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
                            Simpan Aktivitas
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

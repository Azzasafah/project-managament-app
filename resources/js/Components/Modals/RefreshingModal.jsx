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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-lg text-slate-800">Tambah Kategori Refreshing</h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                        <i className="ph-bold ph-x text-xl"></i>
                    </button>
                </div>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Nama Aktivitas</label>
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
                            placeholder="Contoh: Renang / Main Musik"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Kategori</label>
                        <select
                            value={form.category}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    category: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                        >
                            <option value="Gaming">Gaming</option>
                            <option value="Sport">Sport / Olahraga</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Relaxation">Relaxation</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Ikon</label>
                        <select
                            value={form.icon}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    icon: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
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
                            className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm cursor-pointer"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

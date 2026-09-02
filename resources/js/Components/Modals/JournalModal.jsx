import React from 'react';

export default function JournalModal({
    isOpen,
    isEdit,
    form,
    setForm,
    onClose,
    onSubmit,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in font-sans">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-slate-200 animate-scale-up">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3.5">
                    <div>
                        <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                            LEARNING_JOURNAL // CMS
                        </span>
                        <h3 className="font-display font-extrabold text-lg text-slate-900 leading-tight">
                            {isEdit ? 'Edit Jurnal Belajar' : 'Tulis Jurnal Belajar Harian'}
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
                            Judul Topik yang Dipelajari
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
                            placeholder="Misal: Partisi Data & Shuffle Optimization di Apache Spark"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-xs"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:ring-2 focus:ring-black focus:outline-none"
                            >
                                <option value="Data Engineering">Data Engineering</option>
                                <option value="Cloud Computing">Cloud Computing</option>
                                <option value="DevOps">DevOps</option>
                                <option value="General Tech">General Tech</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Tanggal Belajar
                            </label>
                            <input
                                type="date"
                                required
                                value={form.study_date}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        study_date: e.target.value,
                                    })
                                }
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:ring-2 focus:ring-black focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Tags (Pisahkan koma)
                        </label>
                        <input
                            type="text"
                            value={form.tags}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    tags: e.target.value,
                                })
                            }
                            placeholder="Python, Spark, SQL, BigData"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-xs"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Isi Ringkasan Materi
                        </label>
                        <textarea
                            rows="6"
                            required
                            value={form.content}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    content: e.target.value,
                                })
                            }
                            placeholder="Tuliskan intisari konsep dan snippet kode penting yang dipelajari..."
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono leading-relaxed focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-xs"
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
                            Simpan Jurnal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

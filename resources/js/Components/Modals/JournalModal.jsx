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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-lg text-slate-800">
                        {isEdit ? 'Edit Jurnal Belajar' : 'Tulis Jurnal Belajar Harian'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                        <i className="ph-bold ph-x text-xl"></i>
                    </button>
                </div>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Judul Topik yang Dipelajari</label>
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
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
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
                                <option value="Data Engineering">Data Engineering</option>
                                <option value="Cloud Computing">Cloud Computing</option>
                                <option value="DevOps">DevOps</option>
                                <option value="General Tech">General Tech</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Tanggal Belajar</label>
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
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Tags (Pisahkan koma)</label>
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
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Isi Ringkasan Materi</label>
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
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium font-mono text-xs leading-relaxed"
                        />
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
                            className="px-5 py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm cursor-pointer"
                        >
                            Simpan Jurnal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

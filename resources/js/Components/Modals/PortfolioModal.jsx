import React from 'react';

export default function PortfolioModal({
    isOpen,
    form,
    setForm,
    onClose,
    onSubmit,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-lg text-slate-800">Ekspos ke Portofolio Publik</h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                        <i className="ph-bold ph-x text-xl"></i>
                    </button>
                </div>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-2xl border border-indigo-200">
                        <input
                            type="checkbox"
                            id="is_port_check"
                            checked={form.is_portfolio}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    is_portfolio: e.target.checked,
                                })
                            }
                            className="w-5 h-5 rounded text-indigo-600 cursor-pointer"
                        />
                        <label htmlFor="is_port_check" className="text-xs font-bold text-indigo-950 cursor-pointer">
                            Tampilkan proyek ini pada halaman portofolio publik
                        </label>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Ringkasan Portofolio</label>
                        <textarea
                            rows="3"
                            value={form.portfolio_summary}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    portfolio_summary: e.target.value,
                                })
                            }
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Tech Stack (Pisahkan koma)</label>
                        <input
                            type="text"
                            value={form.tech_stack}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    tech_stack: e.target.value,
                                })
                            }
                            placeholder="Python, Spark, AWS S3, Delta Lake"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">URL GitHub</label>
                            <input
                                type="url"
                                value={form.github_url}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        github_url: e.target.value,
                                    })
                                }
                                placeholder="https://github.com/..."
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">URL Live</label>
                            <input
                                type="url"
                                value={form.live_url}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        live_url: e.target.value,
                                    })
                                }
                                placeholder="https://demo.app..."
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                            />
                        </div>
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
                            className="px-5 py-2 text-sm font-bold bg-slate-900 hover:bg-indigo-600 text-white rounded-xl shadow-sm cursor-pointer"
                        >
                            Simpan Portofolio
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

import React from 'react';

export default function PortfolioModal({
    isOpen,
    form,
    setForm,
    onClose,
    onSubmit,
}) {
    if (!isOpen) return null;

    const buttonMode = form.button_display_mode || 'both';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in font-sans">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4 border border-slate-200 animate-scale-up">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3.5">
                    <div>
                        <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                            PORTFOLIO_EXPOSURE
                        </span>
                        <h3 className="font-display font-extrabold text-lg text-slate-900 leading-tight">
                            Ekspos ke Portofolio Publik
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
                    {/* Checkbox: Tampilkan di Portofolio */}
                    <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
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
                            className="w-4 h-4 rounded text-black border-slate-300 focus:ring-black cursor-pointer"
                        />
                        <label htmlFor="is_port_check" className="text-xs font-mono font-bold text-slate-900 cursor-pointer">
                            Tampilkan proyek ini pada halaman portofolio publik
                        </label>
                    </div>

                    {/* Ringkasan Portofolio */}
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Ringkasan Portofolio
                        </label>
                        <textarea
                            rows="3"
                            value={form.portfolio_summary}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    portfolio_summary: e.target.value,
                                })
                            }
                            placeholder="Deskripsi ringkas yang menarik bagi calon recruiter atau klien..."
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-xs"
                        />
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Tech Stack (Pisahkan koma)
                        </label>
                        <input
                            type="text"
                            value={form.tech_stack}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    tech_stack: e.target.value,
                                })
                            }
                            placeholder="Python, PySpark, Airflow, Delta Lake, PostgreSQL"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-xs"
                        />
                    </div>

                    {/* URLs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                URL GitHub / Code
                            </label>
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
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-xs"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                URL Live Demo / Web
                            </label>
                            <input
                                type="url"
                                value={form.live_url}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        live_url: e.target.value,
                                    })
                                }
                                placeholder="https://..."
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-xs"
                            />
                        </div>
                    </div>

                    {/* Opsi Tampilan Tombol Aksi di Portofolio */}
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                            Opsi Tombol Aksi yang Ditampilkan di Portofolio
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => setForm({ ...form, button_display_mode: 'both' })}
                                className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                                    buttonMode === 'both'
                                        ? 'bg-black text-white border-black shadow-xs'
                                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                }`}
                            >
                                <i className="ph-bold ph-arrows-out-line-horizontal text-base"></i>
                                <span>Keduanya</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setForm({ ...form, button_display_mode: 'live' })}
                                className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                                    buttonMode === 'live'
                                        ? 'bg-black text-white border-black shadow-xs'
                                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                }`}
                            >
                                <i className="ph-bold ph-arrow-square-out text-base text-indigo-400"></i>
                                <span>Hanya Live</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setForm({ ...form, button_display_mode: 'github' })}
                                className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                                    buttonMode === 'github'
                                        ? 'bg-black text-white border-black shadow-xs'
                                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                }`}
                            >
                                <i className="ph-bold ph-github-logo text-base"></i>
                                <span>Hanya Code</span>
                            </button>
                        </div>
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
                            Simpan Portofolio
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

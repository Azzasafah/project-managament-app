import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function MilestoneModal({ open, project, onClose, onToast }) {
    if (!open || !project) return null;

    const [form, setForm] = useState({
        week_number: 1,
        title: '',
        description: '',
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        router.post(`/safahflow/projects/${project.id}/milestones`, form, {
            onSuccess: () => {
                setSubmitting(false);
                if (onToast) onToast('Milestone berhasil ditambahkan!', 'success');
                onClose();
            },
            onError: (errs) => {
                setSubmitting(false);
                const first = Object.values(errs)[0];
                if (onToast) onToast(first || 'Gagal menambahkan milestone.', 'error');
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans">
            <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-display font-black text-base shadow-sm">
                            <i className="ph-bold ph-flag-banner"></i>
                        </div>
                        <div>
                            <h3 className="font-display font-extrabold text-slate-900 text-base leading-tight">
                                Tambah Milestone Proyek
                            </h3>
                            <p className="text-[11px] font-mono text-neutral-400">
                                {project.name}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                        <i className="ph-bold ph-x text-sm"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                            Target Pekan (Week Number)
                        </label>
                        <select
                            value={form.week_number}
                            onChange={(e) => setForm({ ...form, week_number: parseInt(e.target.value) })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all"
                        >
                            {Array.from({ length: 15 }, (_, i) => i + 1).map((w) => (
                                <option key={w} value={w}>
                                    Pekan ke-{w} (Week {w})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                            Judul Milestone / Deliverable
                        </label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all"
                            placeholder="Contoh: Ingestion Bronze & Deduplication DAG"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                            Deskripsi Detail (Opsional)
                        </label>
                        <textarea
                            rows={3}
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all resize-none"
                            placeholder="Catatan teknis, acceptance criteria, atau kriteria kelulusan..."
                        />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-5 py-2.5 rounded-2xl bg-black text-white text-xs font-bold shadow-sm hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
                        >
                            {submitting ? 'Menyimpan...' : 'Tambah Milestone'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

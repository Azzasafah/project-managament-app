import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function ProjectModal({ open, project, onClose, onToast }) {
    if (!open) return null;

    const isEdit = Boolean(project && project.id);

    const [form, setForm] = useState({
        name: '',
        slug: '',
        weight_percentage: 20,
        description: '',
        status: 'IN_PROGRESS',
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (project) {
            setForm({
                name: project.name || '',
                slug: project.slug || '',
                weight_percentage: project.weight_percentage ?? 20,
                description: project.description || '',
                status: project.status || 'IN_PROGRESS',
            });
        } else {
            setForm({
                name: '',
                slug: '',
                weight_percentage: 20,
                description: '',
                status: 'IN_PROGRESS',
            });
        }
    }, [project]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        const url = isEdit ? `/safahflow/projects/${project.id}` : '/safahflow/projects';
        const method = isEdit ? 'put' : 'post';

        router[method](url, form, {
            onSuccess: () => {
                setSubmitting(false);
                if (onToast) onToast(`Proyek '${form.name}' berhasil ${isEdit ? 'diperbarui' : 'ditambahkan'}!`, 'success');
                onClose();
            },
            onError: (errs) => {
                setSubmitting(false);
                const first = Object.values(errs)[0];
                if (onToast) onToast(first || 'Gagal menyimpan proyek.', 'error');
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans">
            <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-display font-black text-base shadow-sm">
                            <i className="ph-bold ph-stack"></i>
                        </div>
                        <div>
                            <h3 className="font-display font-extrabold text-slate-900 text-base leading-tight">
                                {isEdit ? 'Edit Proyek Portofolio' : 'Tambah Proyek Portofolio'}
                            </h3>
                            <p className="text-[11px] font-mono text-neutral-400">
                                Proyek Praktikum / Capstone
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        <i className="ph-bold ph-x text-sm"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                            Nama Proyek
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all"
                            placeholder="Contoh: Realtime Financial Lakehouse"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                Bobot (%)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={form.weight_percentage}
                                onChange={(e) => setForm({ ...form, weight_percentage: parseInt(e.target.value) || 0 })}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                Status Proyek
                            </label>
                            <select
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all"
                            >
                                <option value="PLANNING">PLANNING</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="FROZEN">FROZEN</option>
                                <option value="COMPLETED">COMPLETED</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                            Deskripsi Singkat Arsitektur
                        </label>
                        <textarea
                            rows={3}
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-black focus:outline-hidden transition-all resize-none"
                            placeholder="Deskripsi arsitektur, tech stack, dan target capaian pipeline..."
                        />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-5 py-2.5 rounded-2xl bg-black text-white text-xs font-bold shadow-sm hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
                        >
                            {submitting ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambah Proyek')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

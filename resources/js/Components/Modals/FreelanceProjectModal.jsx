import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function FreelanceProjectModal({ isOpen, onClose, project = null }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        client_name: '',
        role_scope: '',
        period: '',
        tech_stack: '',
        description: '',
        project_url: '',
        github_url: '',
        status: 'completed',
        order_index: 0,
        is_active: true,
    });

    useEffect(() => {
        if (project) {
            setData({
                title: project.title || '',
                client_name: project.client_name || '',
                role_scope: project.role_scope || '',
                period: project.period || '',
                tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : '',
                description: project.description || '',
                project_url: project.project_url || '',
                github_url: project.github_url || '',
                status: project.status || 'completed',
                order_index: project.order_index ?? 0,
                is_active: project.is_active ?? true,
            });
        } else {
            reset();
            setData({
                title: '',
                client_name: '',
                role_scope: '',
                period: '',
                tech_stack: '',
                description: '',
                project_url: '',
                github_url: '',
                status: 'completed',
                order_index: 0,
                is_active: true,
            });
        }
    }, [project, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedSkills = data.tech_stack
            ? data.tech_stack
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean)
            : [];

        const payload = {
            ...data,
            tech_stack: formattedSkills,
        };

        if (project) {
            put(`/freelance-projects/${project.id}`, {
                data: payload,
                onSuccess: () => onClose(),
            });
        } else {
            post('/freelance-projects', {
                data: payload,
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in font-sans">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
                {/* Modal Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center text-lg shadow-xs">
                            <i className="ph-bold ph-briefcase"></i>
                        </div>
                        <div>
                            <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                                CMS // FREELANCE_PROJECTS
                            </span>
                            <h3 className="font-display font-black text-slate-900 text-lg leading-tight">
                                {project ? 'Edit Proyek Freelance' : 'Tambah Proyek Freelance Baru'}
                            </h3>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        <i className="ph-bold ph-x text-lg"></i>
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 custom-scroll">
                    {/* Title */}
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Nama Proyek Freelance *
                        </label>
                        <input
                            type="text"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Misal: Sistem Informasi Manajemen Tugas Akhir"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
                        />
                        {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    {/* Client & Role */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Klien / Instansi *
                            </label>
                            <input
                                type="text"
                                required
                                value={data.client_name}
                                onChange={(e) => setData('client_name', e.target.value)}
                                placeholder="Misal: Fakultas Teknik / PT Inovasi"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
                            />
                            {errors.client_name && <p className="text-rose-500 text-xs mt-1">{errors.client_name}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Peran / Lingkup Kerja
                            </label>
                            <input
                                type="text"
                                value={data.role_scope}
                                onChange={(e) => setData('role_scope', e.target.value)}
                                placeholder="Misal: Fullstack Developer / QA Tester"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
                            />
                        </div>
                    </div>

                    {/* Period & Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Periode Pengerjaan
                            </label>
                            <input
                                type="text"
                                value={data.period}
                                onChange={(e) => setData('period', e.target.value)}
                                placeholder="Misal: Apr 2021 – Jul 2021"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Status Proyek
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
                            >
                                <option value="completed">Selesai (Completed)</option>
                                <option value="ongoing">Sedang Berjalan (Ongoing)</option>
                            </select>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Tech Stack (Pisahkan koma)
                        </label>
                        <input
                            type="text"
                            value={data.tech_stack}
                            onChange={(e) => setData('tech_stack', e.target.value)}
                            placeholder="CodeIgniter, PHP, MySQL, Bootstrap, UML"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
                        />
                    </div>

                    {/* URLs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Link Demo / Live URL
                            </label>
                            <input
                                type="url"
                                value={data.project_url}
                                onChange={(e) => setData('project_url', e.target.value)}
                                placeholder="https://..."
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Link GitHub Repository
                            </label>
                            <input
                                type="url"
                                value={data.github_url}
                                onChange={(e) => setData('github_url', e.target.value)}
                                placeholder="https://github.com/..."
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Deskripsi Proyek & Kontribusi
                        </label>
                        <textarea
                            rows={3}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Jelaskan ringkasan solusi, arsitektur, dan dampak proyek bagi klien..."
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
                        />
                    </div>

                    {/* Order & Active Status */}
                    <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                        <label className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="w-4 h-4 rounded text-black border-slate-300 focus:ring-black"
                            />
                            Tampilkan di Portofolio Publik
                        </label>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 font-mono">Urutan:</span>
                            <input
                                type="number"
                                min="0"
                                value={data.order_index}
                                onChange={(e) => setData('order_index', parseInt(e.target.value) || 0)}
                                className="w-16 px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono text-center font-bold"
                            />
                        </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 text-xs font-mono font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer active:scale-95"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-mono font-bold shadow-md flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
                        >
                            <i className="ph-bold ph-floppy-disk text-sm"></i>
                            {processing ? 'Menyimpan...' : 'Simpan Proyek'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

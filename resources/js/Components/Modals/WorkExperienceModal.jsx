import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import DynamicTagInput from '@/Components/Common/DynamicTagInput';

export default function WorkExperienceModal({
    isOpen,
    onClose,
    experience = null,
}) {
    const [form, setForm] = useState({
        title: '',
        company: '',
        period: '',
        badge: 'Internship',
        tech: [],
        project_url: '',
        github_url: '',
        pointsText: '',
        is_active: true,
        order_index: 0,
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (experience) {
            setForm({
                title: experience.title || '',
                company: experience.company || '',
                period: experience.period || '',
                badge: experience.badge || 'Internship',
                tech: Array.isArray(experience.tech)
                    ? experience.tech
                    : typeof experience.tech === 'string' && experience.tech.trim()
                    ? experience.tech.split(',').map((s) => s.trim()).filter(Boolean)
                    : [],
                project_url: experience.project_url || '',
                github_url: experience.github_url || '',
                pointsText: Array.isArray(experience.points)
                    ? experience.points.join('\n')
                    : experience.points || '',
                is_active: experience.is_active ?? true,
                order_index: experience.order_index ?? 0,
            });
        } else {
            setForm({
                title: '',
                company: '',
                period: '',
                badge: 'Internship',
                tech: [],
                project_url: '',
                github_url: '',
                pointsText: '',
                is_active: true,
                order_index: 0,
            });
        }
    }, [experience, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);

        const bulletPoints = form.pointsText
            .split('\n')
            .map((p) => p.trim())
            .filter(Boolean);

        const payload = {
            title: form.title,
            company: form.company,
            period: form.period,
            badge: form.badge,
            tech: form.tech,
            project_url: form.project_url || null,
            github_url: form.github_url || null,
            points: bulletPoints,
            is_active: form.is_active,
            order_index: Number(form.order_index) || 0,
        };

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                setIsSaving(false);
                onClose();
            },
            onError: () => {
                setIsSaving(false);
            },
        };

        if (experience?.id) {
            router.put(`/work-experiences/${experience.id}`, payload, options);
        } else {
            router.post('/work-experiences', payload, options);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in font-sans">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-lg shadow-xs">
                            <i className="ph-bold ph-identification-badge"></i>
                        </div>
                        <div>
                            <span className="text-[9px] font-mono font-bold text-amber-600 uppercase tracking-widest">
                                CMS // WORK_EXPERIENCES
                            </span>
                            <h3 className="font-display font-black text-slate-900 text-lg leading-tight">
                                {experience ? 'Edit Pengalaman Kerja & Magang' : 'Tambah Pengalaman Baru'}
                            </h3>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        <i className="ph-bold ph-x text-lg"></i>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
                    {/* Checkbox: Tampilkan di Web */}
                    <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                        <input
                            type="checkbox"
                            id="exp_is_active"
                            checked={form.is_active}
                            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                            className="w-4 h-4 rounded text-black border-slate-300 focus:ring-black cursor-pointer"
                        />
                        <label htmlFor="exp_is_active" className="text-xs font-mono font-bold text-slate-900 cursor-pointer">
                            Tampilkan pada bagian "Pengalaman Kerja & Magang" di portofolio
                        </label>
                    </div>

                    {/* Judul Posisi / Role & Perusahaan */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Posisi / Jabatan *
                            </label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                placeholder="Contoh: Backend Developer (Internship)"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-black"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Perusahaan / Institusi *
                            </label>
                            <input
                                type="text"
                                value={form.company}
                                onChange={(e) => setForm({ ...form, company: e.target.value })}
                                placeholder="Contoh: Evermos x Rakamin Academy"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-black"
                                required
                            />
                        </div>
                    </div>

                    {/* Periode & Tipe Badge */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Periode Waktu
                            </label>
                            <input
                                type="text"
                                value={form.period}
                                onChange={(e) => setForm({ ...form, period: e.target.value })}
                                placeholder="Contoh: Juli 2025 – Agust 2025"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Label / Badge
                            </label>
                            <input
                                type="text"
                                value={form.badge}
                                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                                placeholder="Internship / Virtual Internship / Full-time"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-black"
                            />
                        </div>
                    </div>

                    {/* Bullet Points Deskripsi / Poin-Poin Pekerjaan */}
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
                                Poin-Poin Pekerjaan / Pencapaian (1 baris per poin)
                            </label>
                            <span className="text-[10px] font-mono text-neutral-400">
                                Pisahkan dengan Enter
                            </span>
                        </div>
                        <textarea
                            rows={4}
                            value={form.pointsText}
                            onChange={(e) => setForm({ ...form, pointsText: e.target.value })}
                            placeholder="Tuliskan poin tanggung jawab atau kontribusi di sini:&#10;• Mengembangkan layanan API terdistribusi...&#10;• Mengoptimalkan query database SQL hingga 40% lebih cepat..."
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-black shadow-xs"
                        />
                    </div>

                    {/* Dynamic Tech Stack & Skills */}
                    <DynamicTagInput
                        tags={form.tech}
                        onChange={(newTags) => setForm({ ...form, tech: newTags })}
                        label="Skill & Tech Stack Terkait (Dinamis)"
                        placeholder="Ketik skill/tools lalu tekan Enter atau koma..."
                        suggestions={[
                            'Golang', 'SQL', 'Clean Code', 'Modular Query', 'API Services',
                            'Python', 'SOP Re-engineering', 'UML Modeling', 'ERD', 'DFD',
                            'Microsoft Excel', 'Pivot Table', 'BI Dashboard', 'Laravel',
                            'MySQL', 'PostgreSQL', 'CodeIgniter', 'Database Design', 'Mentoring'
                        ]}
                    />

                    {/* URLs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Link Bukti / Dokumen Proyek (Opsional)
                            </label>
                            <input
                                type="url"
                                value={form.project_url}
                                onChange={(e) => setForm({ ...form, project_url: e.target.value })}
                                placeholder="https://drive.google.com/..."
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Link Repository GitHub (Opsional)
                            </label>
                            <input
                                type="url"
                                value={form.github_url}
                                onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                                placeholder="https://github.com/..."
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-black"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-5 py-2.5 bg-black hover:bg-neutral-800 disabled:opacity-50 text-white rounded-xl text-xs font-mono font-bold shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
                        >
                            <i className="ph-bold ph-check"></i>
                            {isSaving ? 'Menyimpan...' : experience ? 'Perbarui Pengalaman' : 'Simpan Pengalaman'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

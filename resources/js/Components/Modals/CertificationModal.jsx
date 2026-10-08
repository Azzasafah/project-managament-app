import React, { useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';

export default function CertificationModal({ isOpen, onClose, certification = null }) {
    const { data, setData, processing, errors, reset } = useForm({
        title: '',
        issuer: '',
        type: 'official',
        issue_date: '',
        credential_id: '',
        credential_url: '',
        skills: '',
        description: '',
        order_index: 0,
        is_active: true,
    });

    useEffect(() => {
        if (certification) {
            setData({
                title: certification.title || '',
                issuer: certification.issuer || '',
                type: certification.type || 'official',
                issue_date: certification.issue_date || '',
                credential_id: certification.credential_id || '',
                credential_url: certification.credential_url || '',
                skills: Array.isArray(certification.skills) ? certification.skills.join(', ') : '',
                description: certification.description || '',
                order_index: certification.order_index ?? 0,
                is_active: certification.is_active ?? true,
            });
        } else {
            reset();
            setData({
                title: '',
                issuer: '',
                type: 'official',
                issue_date: '',
                credential_id: '',
                credential_url: '',
                skills: '',
                description: '',
                order_index: 0,
                is_active: true,
            });
        }
    }, [certification, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedSkills = data.skills
            ? (Array.isArray(data.skills)
                ? data.skills
                : data.skills.split(',').map((s) => s.trim()).filter(Boolean))
            : [];

        const payload = {
            title: data.title,
            issuer: data.issuer,
            type: data.type,
            issue_date: data.issue_date || null,
            credential_id: data.credential_id || null,
            credential_url: data.credential_url ? data.credential_url.trim() : null,
            skills: formattedSkills,
            description: data.description || null,
            order_index: Number(data.order_index) || 0,
            is_active: Boolean(data.is_active),
        };

        if (certification) {
            router.put(`/certifications/${certification.id}`, payload, {
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        } else {
            router.post('/certifications', payload, {
                preserveScroll: true,
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
                            <i className="ph-bold ph-certificate"></i>
                        </div>
                        <div>
                            <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                                CMS // CREDENTIALS
                            </span>
                            <h3 className="font-display font-black text-slate-900 text-lg leading-tight">
                                {certification ? 'Edit Sertifikasi / Magang' : 'Tambah Kredensial Baru'}
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
                    {/* Type Selector (Resmi vs Magang) */}
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                            Kategori Kredensial
                        </label>
                        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
                            <button
                                type="button"
                                onClick={() => setData('type', 'official')}
                                className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                    data.type === 'official'
                                        ? 'bg-black text-white shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <i className="ph-bold ph-seal-check text-sm"></i>
                                Sertifikasi Resmi
                            </button>
                            <button
                                type="button"
                                onClick={() => setData('type', 'internship')}
                                className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                    data.type === 'internship'
                                        ? 'bg-black text-white shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <i className="ph-bold ph-briefcase text-sm"></i>
                                Magang / Program
                            </button>
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Nama Sertifikasi / Posisi Magang *
                        </label>
                        <input
                            type="text"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Contoh: AWS Certified Cloud Practitioner / Data Engineer Intern"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
                        />
                        {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    {/* Issuer & Issue Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Penerbit / Perusahaan *
                            </label>
                            <input
                                type="text"
                                required
                                value={data.issuer}
                                onChange={(e) => setData('issuer', e.target.value)}
                                placeholder="Contoh: AWS / Telkom Indonesia"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
                            />
                            {errors.issuer && <p className="text-rose-500 text-xs mt-1">{errors.issuer}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Tanggal / Periode
                            </label>
                            <input
                                type="text"
                                value={data.issue_date}
                                onChange={(e) => setData('issue_date', e.target.value)}
                                placeholder="Contoh: Jan 2026 / Jul - Des 2025"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
                            />
                        </div>
                    </div>

                    {/* Credential ID & URL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                ID Kredensial
                            </label>
                            <input
                                type="text"
                                value={data.credential_id}
                                onChange={(e) => setData('credential_id', e.target.value)}
                                placeholder="Contoh: AWS-CCP-982147"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Link Verifikasi Kredensial
                            </label>
                            <input
                                type="url"
                                value={data.credential_url}
                                onChange={(e) => setData('credential_url', e.target.value)}
                                placeholder="https://..."
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
                            />
                            {errors.credential_url && (
                                <p className="text-rose-500 text-xs mt-1">{errors.credential_url}</p>
                            )}
                        </div>
                    </div>

                    {/* Skills Tagging */}
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Skill Terkait (Pisahkan dengan koma)
                        </label>
                        <input
                            type="text"
                            value={data.skills}
                            onChange={(e) => setData('skills', e.target.value)}
                            placeholder="Contoh: PySpark, Airflow, Delta Lake, AWS"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all shadow-xs"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            Deskripsi Ringkas
                        </label>
                        <textarea
                            rows={3}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Jelaskan ringkasan kompetensi atau pencapaian..."
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
                            {processing ? 'Menyimpan...' : 'Simpan Kredensial'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

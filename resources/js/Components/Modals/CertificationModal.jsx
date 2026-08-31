import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function CertificationModal({ isOpen, onClose, certification = null }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
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
            ? data.skills
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean)
            : [];

        const payload = {
            ...data,
            skills: formattedSkills,
        };

        if (certification) {
            put(`/certifications/${certification.id}`, {
                data: payload,
                onSuccess: () => onClose(),
            });
        } else {
            post('/certifications', {
                data: payload,
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
                {/* Modal Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-md shadow-indigo-600/30">
                            <i className="ph-bold ph-certificate"></i>
                        </div>
                        <div>
                            <h3 className="font-extrabold text-slate-900 text-lg">
                                {certification ? 'Edit Sertifikasi / Magang' : 'Tambah Kredensial Baru'}
                            </h3>
                            <p className="text-xs text-slate-500">
                                Ditampilkan langsung pada section sertifikasi portofolio
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <i className="ph-bold ph-x"></i>
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
                    {/* Type Selector (Resmi vs Magang) */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                            Kategori Kredensial
                        </label>
                        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
                            <button
                                type="button"
                                onClick={() => setData('type', 'official')}
                                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                    data.type === 'official'
                                        ? 'bg-white text-indigo-700 shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <i className="ph-bold ph-seal-check text-base text-indigo-600"></i>
                                Sertifikasi Resmi
                            </button>
                            <button
                                type="button"
                                onClick={() => setData('type', 'internship')}
                                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                    data.type === 'internship'
                                        ? 'bg-white text-cyan-700 shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <i className="ph-bold ph-briefcase text-base text-cyan-600"></i>
                                Magang / Program
                            </button>
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                            Nama Sertifikasi / Posisi Magang *
                        </label>
                        <input
                            type="text"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Contoh: AWS Certified Cloud Practitioner / Data Engineer Intern"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                        />
                        {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    {/* Issuer & Issue Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Penerbit / Perusahaan *
                            </label>
                            <input
                                type="text"
                                required
                                value={data.issuer}
                                onChange={(e) => setData('issuer', e.target.value)}
                                placeholder="Contoh: AWS / PT Telkom / Dicoding"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                            />
                            {errors.issuer && <p className="text-rose-500 text-xs mt-1">{errors.issuer}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Tanggal / Periode
                            </label>
                            <input
                                type="text"
                                value={data.issue_date}
                                onChange={(e) => setData('issue_date', e.target.value)}
                                placeholder="Contoh: Jan 2026 / Jul 2025 - Des 2025"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* Credential ID & URL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                ID Kredensial
                            </label>
                            <input
                                type="text"
                                value={data.credential_id}
                                onChange={(e) => setData('credential_id', e.target.value)}
                                placeholder="Contoh: AWS-CCP-982147"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Link Verifikasi Kredensial
                            </label>
                            <input
                                type="url"
                                value={data.credential_url}
                                onChange={(e) => setData('credential_url', e.target.value)}
                                placeholder="https://..."
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                            />
                            {errors.credential_url && (
                                <p className="text-rose-500 text-xs mt-1">{errors.credential_url}</p>
                            )}
                        </div>
                    </div>

                    {/* Skills Tagging */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                            Skill Terkait (Pisahkan dengan koma)
                        </label>
                        <input
                            type="text"
                            value={data.skills}
                            onChange={(e) => setData('skills', e.target.value)}
                            placeholder="Contoh: PySpark, Airflow, Delta Lake, AWS"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                            Deskripsi Ringkas
                        </label>
                        <textarea
                            rows={3}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Jelaskan ringkasan kompetensi atau pencapaian..."
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                        />
                    </div>

                    {/* Order & Active Status */}
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
                            />
                            Tampilkan di Portofolio Publik
                        </label>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 font-medium">Urutan:</span>
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
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                        >
                            <i className="ph-bold ph-floppy-disk text-base"></i>
                            {processing ? 'Menyimpan...' : 'Simpan Kredensial'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

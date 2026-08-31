import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function PortfolioManagerView({
    certifications = [],
    faqs = [],
    onAddCert,
    onEditCert,
    onDeleteCert,
    onAddFaq,
    onEditFaq,
    onDeleteFaq,
}) {
    const [subTab, setSubTab] = useState('certifications'); // 'certifications' | 'faqs'

    const handleToggleFaq = (faqId) => {
        router.post(`/faqs/${faqId}/toggle`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <div className="space-y-6">
            {/* Header with Switcher Tabs & Actions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
                        <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest">
                            PORTFOLIO CONTENT CMS
                        </span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        Manajemen Konten Portofolio
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Kelola data sertifikasi resmi, magang, dan pertanyaan FAQ yang tampil di etalase publik.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <a
                        href="/portfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-all shadow-xs"
                    >
                        <i className="ph-bold ph-globe text-base text-indigo-600"></i>
                        Lihat Portofolio Live
                    </a>

                    {subTab === 'certifications' ? (
                        <button
                            onClick={onAddCert}
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                        >
                            <i className="ph-bold ph-plus-circle text-base"></i>
                            Tambah Sertifikasi / Magang
                        </button>
                    ) : (
                        <button
                            onClick={onAddFaq}
                            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-cyan-600/30 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                        >
                            <i className="ph-bold ph-plus-circle text-base"></i>
                            Tambah FAQ Baru
                        </button>
                    )}
                </div>
            </div>

            {/* Sub Tabs Selector */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl max-w-md">
                <button
                    onClick={() => setSubTab('certifications')}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        subTab === 'certifications'
                            ? 'bg-white text-indigo-700 shadow-sm font-extrabold'
                            : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                    <i className="ph-bold ph-certificate text-base"></i>
                    Sertifikasi & Magang ({certifications.length})
                </button>
                <button
                    onClick={() => setSubTab('faqs')}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        subTab === 'faqs'
                            ? 'bg-white text-cyan-700 shadow-sm font-extrabold'
                            : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                    <i className="ph-bold ph-question text-base"></i>
                    Pertanyaan FAQ ({faqs.length})
                </button>
            </div>

            {/* ========================================================================= */}
            {/* SUB TAB 1: CERTIFICATIONS LIST */}
            {/* ========================================================================= */}
            {subTab === 'certifications' && (
                <div className="space-y-4">
                    {certifications.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl mx-auto mb-3">
                                <i className="ph-bold ph-certificate"></i>
                            </div>
                            <h3 className="font-bold text-slate-800 text-base">Belum Ada Kredensial</h3>
                            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
                                Tambahkan sertifikasi resmi atau sertifikat pengalaman magang Anda untuk memperkuat portofolio.
                            </p>
                            <button
                                onClick={onAddCert}
                                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30"
                            >
                                + Tambah Kredensial Pertama
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {certifications.map((cert) => (
                                <div
                                    key={cert.id}
                                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between gap-2">
                                            <span
                                                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase border flex items-center gap-1.5 ${
                                                    cert.type === 'official'
                                                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                                        : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                                                }`}
                                            >
                                                <i
                                                    className={`ph-bold ${
                                                        cert.type === 'official' ? 'ph-seal-check' : 'ph-briefcase'
                                                    }`}
                                                ></i>
                                                {cert.type === 'official' ? 'SERTIFIKASI RESMI' : 'MAGANG / PROGRAM'}
                                            </span>

                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`w-2 h-2 rounded-full ${
                                                        cert.is_active ? 'bg-emerald-500' : 'bg-slate-300'
                                                    }`}
                                                    title={cert.is_active ? 'Aktif di Portofolio' : 'Disembunyikan'}
                                                />
                                                <span className="text-[11px] font-mono font-bold text-slate-400">
                                                    {cert.issue_date || '-'}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                                                {cert.title}
                                            </h3>
                                            <p className="text-xs text-slate-600 font-medium mt-0.5">
                                                {cert.issuer}
                                            </p>
                                        </div>

                                        {cert.description && (
                                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                                {cert.description}
                                            </p>
                                        )}

                                        {Array.isArray(cert.skills) && cert.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {cert.skills.map((skill, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Bar */}
                                    <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-slate-100">
                                        <div className="text-[10px] font-mono text-slate-400 truncate max-w-[150px]">
                                            {cert.credential_id ? `ID: ${cert.credential_id}` : 'Tanpa ID'}
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            {cert.credential_url && (
                                                <a
                                                    href={cert.credential_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors text-sm"
                                                    title="Buka Link Verifikasi"
                                                >
                                                    <i className="ph-bold ph-arrow-square-out"></i>
                                                </a>
                                            )}
                                            <button
                                                onClick={() => onEditCert(cert)}
                                                className="w-8 h-8 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 flex items-center justify-center transition-colors text-sm cursor-pointer"
                                                title="Edit Kredensial"
                                            >
                                                <i className="ph-bold ph-pencil-simple"></i>
                                            </button>
                                            <button
                                                onClick={() => onDeleteCert(cert)}
                                                className="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors text-sm cursor-pointer"
                                                title="Hapus Kredensial"
                                            >
                                                <i className="ph-bold ph-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ========================================================================= */}
            {/* SUB TAB 2: FAQS LIST */}
            {/* ========================================================================= */}
            {subTab === 'faqs' && (
                <div className="space-y-4">
                    {faqs.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                            <div className="w-16 h-16 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-3xl mx-auto mb-3">
                                <i className="ph-bold ph-question"></i>
                            </div>
                            <h3 className="font-bold text-slate-800 text-base">Belum Ada Pertanyaan FAQ</h3>
                            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
                                Tambahkan daftar tanya jawab untuk membantu calon klien atau recruiter mengenal Anda.
                            </p>
                            <button
                                onClick={onAddFaq}
                                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-600/30"
                            >
                                + Tambah FAQ Pertama
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {faqs.map((faq, idx) => (
                                <div
                                    key={faq.id}
                                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
                                >
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-lg bg-cyan-100 text-cyan-800 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                                                Q{idx + 1}
                                            </span>
                                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 text-slate-600 uppercase">
                                                {faq.category}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleToggleFaq(faq.id)}
                                                className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold cursor-pointer transition-colors ${
                                                    faq.is_active
                                                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                                }`}
                                            >
                                                {faq.is_active ? '● Tampil di Web' : '○ Disembunyikan'}
                                            </button>
                                        </div>

                                        <h3 className="font-extrabold text-slate-900 text-base">
                                            {faq.question}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                                            {faq.answer}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2 shrink-0 self-end md:self-start">
                                        <button
                                            onClick={() => onEditFaq(faq)}
                                            className="px-3 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                                        >
                                            <i className="ph-bold ph-pencil-simple"></i> Edit
                                        </button>
                                        <button
                                            onClick={() => onDeleteFaq(faq)}
                                            className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                                        >
                                            <i className="ph-bold ph-trash"></i> Hapus
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

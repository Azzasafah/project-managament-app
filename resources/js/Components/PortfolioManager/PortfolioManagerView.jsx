import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function PortfolioManagerView({
    certifications = [],
    freelanceProjects = [],
    faqs = [],
    onAddCert,
    onEditCert,
    onDeleteCert,
    onAddFreelance,
    onEditFreelance,
    onDeleteFreelance,
    onAddFaq,
    onEditFaq,
    onDeleteFaq,
}) {
    const [subTab, setSubTab] = useState('certifications'); // 'certifications' | 'freelance' | 'faqs'

    const handleToggleFaq = (faqId) => {
        router.post(`/faqs/${faqId}/toggle`, {}, {
            preserveScroll: true,
        });
    };

    const handleToggleFreelance = (projectId) => {
        router.post(`/freelance-projects/${projectId}/toggle`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <div className="space-y-6 font-sans">
            {/* Header with Switcher Tabs & Actions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
                        <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">
                            PORTFOLIO CONTENT CMS
                        </span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                        Manajemen Konten Portofolio
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
                        Kelola data sertifikasi resmi, proyek freelance dinamis, dan pertanyaan FAQ yang tampil di etalase publik.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <a
                        href="/portfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800 hover:bg-slate-50 flex items-center gap-2 transition-all shadow-xs active:scale-[0.98]"
                    >
                        <i className="ph-bold ph-globe text-sm"></i>
                        Lihat Portofolio Live
                    </a>

                    {subTab === 'certifications' && (
                        <button
                            onClick={onAddCert}
                            className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-mono font-bold shadow-md flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                        >
                            <i className="ph-bold ph-plus-circle text-base"></i>
                            Tambah Sertifikasi / Magang
                        </button>
                    )}

                    {subTab === 'freelance' && (
                        <button
                            onClick={onAddFreelance}
                            className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-mono font-bold shadow-md flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                        >
                            <i className="ph-bold ph-plus-circle text-base"></i>
                            Tambah Proyek Freelance
                        </button>
                    )}

                    {subTab === 'faqs' && (
                        <button
                            onClick={onAddFaq}
                            className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-mono font-bold shadow-md flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                        >
                            <i className="ph-bold ph-plus-circle text-base"></i>
                            Tambah FAQ Baru
                        </button>
                    )}
                </div>
            </div>

            {/* Sub Tabs Selector */}
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-2xl max-w-lg overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setSubTab('certifications')}
                    className={`flex-1 min-w-[130px] py-2 px-3.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        subTab === 'certifications'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                    <i className="ph-bold ph-certificate text-sm"></i>
                    Sertifikasi ({certifications.length})
                </button>
                <button
                    onClick={() => setSubTab('freelance')}
                    className={`flex-1 min-w-[140px] py-2 px-3.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        subTab === 'freelance'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                    <i className="ph-bold ph-briefcase text-sm"></i>
                    Freelance ({freelanceProjects.length})
                </button>
                <button
                    onClick={() => setSubTab('faqs')}
                    className={`flex-1 min-w-[110px] py-2 px-3.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        subTab === 'faqs'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                    <i className="ph-bold ph-question text-sm"></i>
                    FAQ ({faqs.length})
                </button>
            </div>

            {/* ========================================================================= */}
            {/* SUB TAB 1: CERTIFICATIONS LIST */}
            {/* ========================================================================= */}
            {subTab === 'certifications' && (
                <div className="space-y-4">
                    {certifications.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center text-2xl mx-auto mb-3">
                                <i className="ph-bold ph-certificate"></i>
                            </div>
                            <h3 className="font-display font-bold text-slate-900 text-base">Belum Ada Kredensial</h3>
                            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5 font-sans">
                                Tambahkan sertifikasi resmi atau sertifikat pengalaman magang Anda untuk memperkuat portofolio.
                            </p>
                            <button
                                onClick={onAddCert}
                                className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-mono font-bold shadow-md cursor-pointer active:scale-[0.98]"
                            >
                                + Tambah Kredensial Pertama
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {certifications.map((cert) => (
                                <div
                                    key={cert.id}
                                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-slate-400 transition-all flex flex-col justify-between"
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
                                            <h3 className="font-display font-extrabold text-slate-900 text-base leading-snug">
                                                {cert.title}
                                            </h3>
                                            <p className="text-xs font-mono text-slate-600 font-semibold mt-1">
                                                {cert.issuer}
                                            </p>
                                        </div>

                                        {cert.description && (
                                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-sans">
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
                                                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-black hover:text-white text-slate-700 flex items-center justify-center transition-colors text-sm cursor-pointer active:scale-95"
                                                title="Edit Kredensial"
                                            >
                                                <i className="ph-bold ph-pencil-simple"></i>
                                            </button>
                                            <button
                                                onClick={() => onDeleteCert(cert)}
                                                className="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors text-sm cursor-pointer active:scale-95"
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
            {/* SUB TAB 2: FREELANCE PROJECTS */}
            {/* ========================================================================= */}
            {subTab === 'freelance' && (
                <div className="space-y-4">
                    {freelanceProjects.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center text-2xl mx-auto mb-3">
                                <i className="ph-bold ph-briefcase"></i>
                            </div>
                            <h3 className="font-display font-bold text-slate-900 text-base">Belum Ada Proyek Freelance</h3>
                            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5 font-sans">
                                Tambahkan riwayat proyek freelance dan kontrak klien Anda untuk memperkuat portofolio dinamis.
                            </p>
                            <button
                                onClick={onAddFreelance}
                                className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-mono font-bold shadow-md cursor-pointer active:scale-[0.98]"
                            >
                                + Tambah Proyek Freelance Pertama
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {freelanceProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-slate-400 transition-all flex flex-col justify-between"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1.5">
                                                <i className="ph-bold ph-buildings"></i>
                                                {project.client_name}
                                            </span>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleToggleFreelance(project.id)}
                                                    className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold cursor-pointer transition-colors ${
                                                        project.is_active
                                                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                                    }`}
                                                >
                                                    {project.is_active ? '● Tampil di Web' : '○ Disembunyikan'}
                                                </button>
                                                <span className="text-[11px] font-mono font-bold text-slate-400">
                                                    {project.period || '-'}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-display font-extrabold text-slate-900 text-base leading-snug">
                                                {project.title}
                                            </h3>
                                            {project.role_scope && (
                                                <p className="text-xs font-mono text-neutral-600 font-semibold mt-1">
                                                    {project.role_scope}
                                                </p>
                                            )}
                                        </div>

                                        {project.description && (
                                            <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-sans">
                                                {project.description}
                                            </p>
                                        )}

                                        {Array.isArray(project.tech_stack) && project.tech_stack.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {project.tech_stack.map((tech, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Bar */}
                                    <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-slate-100">
                                        <div className="flex items-center gap-2">
                                            {project.github_url && (
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors text-sm"
                                                    title="Buka Repository GitHub"
                                                >
                                                    <i className="ph-bold ph-github-logo"></i>
                                                </a>
                                            )}
                                            {project.project_url && (
                                                <a
                                                    href={project.project_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors text-sm"
                                                    title="Buka Live Link"
                                                >
                                                    <i className="ph-bold ph-arrow-square-out"></i>
                                                </a>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            <button
                                                onClick={() => onEditFreelance(project)}
                                                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-black hover:text-white text-slate-700 flex items-center justify-center transition-colors text-sm cursor-pointer active:scale-95"
                                                title="Edit Proyek Freelance"
                                            >
                                                <i className="ph-bold ph-pencil-simple"></i>
                                            </button>
                                            <button
                                                onClick={() => onDeleteFreelance(project)}
                                                className="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors text-sm cursor-pointer active:scale-95"
                                                title="Hapus Proyek Freelance"
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
            {/* SUB TAB 3: FAQS LIST */}
            {/* ========================================================================= */}
            {subTab === 'faqs' && (
                <div className="space-y-4">
                    {faqs.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center text-2xl mx-auto mb-3">
                                <i className="ph-bold ph-question"></i>
                            </div>
                            <h3 className="font-display font-bold text-slate-900 text-base">Belum Ada Pertanyaan FAQ</h3>
                            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5 font-sans">
                                Tambahkan daftar tanya jawab untuk membantu calon klien atau recruiter mengenal Anda.
                            </p>
                            <button
                                onClick={onAddFaq}
                                className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-mono font-bold shadow-md cursor-pointer active:scale-[0.98]"
                            >
                                + Tambah FAQ Pertama
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {faqs.map((faq, idx) => (
                                <div
                                    key={faq.id}
                                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:border-slate-400 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
                                >
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 font-mono font-bold text-xs flex items-center justify-center shrink-0">
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
                                                {faq.is_active ? '● Tampil di Portofolio' : '○ Disembunyikan'}
                                            </button>
                                        </div>

                                        <h3 className="font-display font-extrabold text-slate-900 text-base">
                                            {faq.question}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-3.5 rounded-2xl border border-slate-100 font-sans">
                                            {faq.answer}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2 shrink-0 self-end md:self-start">
                                        <button
                                            onClick={() => onEditFaq(faq)}
                                            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-black hover:text-white text-slate-700 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                                        >
                                            <i className="ph-bold ph-pencil-simple"></i> Edit
                                        </button>
                                        <button
                                            onClick={() => onDeleteFaq(faq)}
                                            className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
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

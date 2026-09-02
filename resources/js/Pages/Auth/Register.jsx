import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#09090b] font-sans selection:bg-neutral-900 selection:text-white">
            <Head title="Daftar Akun - Safah Workspace" />

            {/* LEFT SIDE: Techwear Cyber HUD Banner */}
            <div className="relative hidden lg:flex lg:w-7/12 flex-col justify-between p-12 lg:p-14 bg-gradient-to-br from-[#09090b] via-[#0f0f14] to-[#12121c] text-white overflow-hidden border-r border-white/[0.08]">
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                    }}
                />
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3.5 group">
                        <div className="w-11 h-11 rounded-xl bg-white text-black flex items-center justify-center font-display font-black text-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_20px_rgba(255,255,255,0.12)] transition-transform group-hover:scale-105">
                            <span>S</span>
                        </div>
                        <div>
                            <h1 className="font-display font-extrabold text-lg tracking-tight leading-none text-white">
                                Safah<span className="text-neutral-400">Workspace</span>
                            </h1>
                            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-400 mt-1">
                                REGISTRATION &bull; USER_SETUP
                            </p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs font-mono shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-neutral-300 font-semibold">USER_REGISTRATION</span>
                    </div>
                </div>

                <div className="relative z-10 my-auto py-8 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.04] border border-white/10 rounded-full text-neutral-300 text-xs font-mono font-bold tracking-wider mb-6">
                        <i className="ph-bold ph-user-plus text-cyan-400"></i>
                        <span>NEW_ACCOUNT_SETUP // INITIALIZATION</span>
                    </div>

                    <h2
                        className="font-display text-4xl xl:text-5xl font-black text-white leading-[1.12] tracking-tight mb-4 uppercase"
                        style={{ textWrap: 'balance' }}
                    >
                        Bangun Ruang Kerja <br />
                        <span className="relative inline-block">
                            <span className="relative z-10 text-neutral-200">Pribadi yang Terstruktur.</span>
                            <span className="absolute bottom-1 left-0 right-0 h-3 bg-white/10 -z-0 rounded-sm" />
                        </span>
                    </h2>

                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-8 font-sans">
                        Daftarkan profil pemilik workspace untuk mulai memetakan target karir Data Engineering & Cloud, mencatat materi kajian, dan memantau keseimbangan hidup.
                    </p>

                    {/* Cyber Chisa Card Box */}
                    <div className="p-5 rounded-3xl bg-[#111116]/90 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-md group hover:border-white/25 transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/15 shrink-0 bg-black shadow-md">
                                <img
                                    src="/chisa.png"
                                    alt="Chisa Assistant"
                                    className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=300&auto=format&fit=crop';
                                    }}
                                />
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-cyan-400 border-2 border-black rounded-full"></div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono text-white uppercase tracking-widest font-bold">
                                        CHISA // ONBOARDING
                                    </span>
                                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                                        READY
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-300 italic leading-relaxed font-sans">
                                    "Lengkapi form pendaftaran untuk mengaktifkan database mandiri dan seluruh modul produktivitas Anda."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-white/[0.08] pt-6 text-xs font-mono text-neutral-400">
                    <span>© 2026 Safah Workspace &bull; Laravel 12 & Inertia.js</span>
                    <Link href="/login" className="text-neutral-200 hover:text-white font-bold flex items-center gap-1.5 transition-colors">
                        Sudah punya akun? Masuk <i className="ph-bold ph-arrow-right"></i>
                    </Link>
                </div>
            </div>

            {/* RIGHT SIDE: Register Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16 bg-[#fafafa] min-h-screen">
                <div className="w-full max-w-md space-y-6">
                    
                    {/* Mobile Brand */}
                    <div className="lg:hidden text-center mb-2">
                        <Link href="/" className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-black text-white text-2xl shadow-lg mb-2">
                            <span>S</span>
                        </Link>
                        <h1 className="font-display text-2xl font-black text-black">
                            Safah<span className="text-neutral-500">Workspace</span>
                        </h1>
                        <p className="text-xs font-mono text-neutral-500 mt-0.5">Operating Hub & Management</p>
                    </div>

                    {/* Mobile Chisa Mini Avatar Badge */}
                    <div className="lg:hidden flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-black/10 shadow-xs">
                        <div className="relative w-12 h-12 rounded-xl bg-black border border-black/20 overflow-hidden shrink-0">
                            <img
                                src="/chisa.png"
                                alt="Chisa Mini Avatar"
                                className="w-full h-full object-cover object-top"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=200&auto=format&fit=crop';
                                }}
                            />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-cyan-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs font-mono font-bold text-black">CHISA.SYS</span>
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-800 font-bold">SETUP</span>
                            </div>
                            <p className="text-xs text-neutral-500 mt-0.5">Lengkapi data akun baru Anda</p>
                        </div>
                    </div>

                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-neutral-800 text-[11px] font-mono font-bold mb-2">
                            <i className="ph-bold ph-user-plus text-neutral-900"></i> REGISTRATION
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                            Buat Akun Baru
                        </h2>
                        <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-sans">
                            Lengkapi form berikut untuk mendaftarkan akun pemilik workspace.
                        </p>
                    </div>

                    {Object.keys(errors).length > 0 && (
                        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium space-y-1">
                            {Object.values(errors).map((err, idx) => (
                                <p key={idx} className="flex items-center gap-2">
                                    <i className="ph-fill ph-warning-circle text-base text-rose-500 shrink-0"></i> {err}
                                </p>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                required
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Muhammad Hafizh Azzasafah"
                                className="w-full px-4 py-2.5 bg-white border border-black/15 rounded-2xl text-xs sm:text-sm text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all shadow-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Alamat Email
                            </label>
                            <input
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="nama@domain.com"
                                className="w-full px-4 py-2.5 bg-white border border-black/15 rounded-2xl text-xs sm:text-sm text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all shadow-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Kata Sandi
                            </label>
                            <input
                                type="password"
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••••••"
                                className="w-full px-4 py-2.5 bg-white border border-black/15 rounded-2xl text-xs sm:text-sm text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all shadow-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1">
                                Konfirmasi Kata Sandi
                            </label>
                            <input
                                type="password"
                                required
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="••••••••••••"
                                className="w-full px-4 py-2.5 bg-white border border-black/15 rounded-2xl text-xs sm:text-sm text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all shadow-xs"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full mt-2 py-3 px-6 bg-black hover:bg-neutral-800 disabled:opacity-50 text-white rounded-2xl text-xs sm:text-sm font-mono font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                        >
                            {processing ? (
                                <>
                                    <i className="ph-bold ph-spinner animate-spin text-base"></i>
                                    <span>Mendaftarkan...</span>
                                </>
                            ) : (
                                <>
                                    <span>Daftar Akun Baru</span>
                                    <i className="ph-bold ph-arrow-right text-base"></i>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center pt-1">
                        <Link href="/login" className="text-xs font-mono font-bold text-neutral-600 hover:text-black transition-colors">
                            Sudah punya akun? Masuk di sini &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

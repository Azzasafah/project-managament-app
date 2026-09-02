import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const [currentTime, setCurrentTime] = useState('00:00:00');
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('id-ID', { hour12: false }));
        };
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#09090b] font-sans selection:bg-neutral-900 selection:text-white">
            <Head title="Masuk - Safah Workspace" />

            {/* LEFT SIDE: Techwear Cyber HUD Banner */}
            <div className="relative hidden lg:flex lg:w-7/12 flex-col justify-between p-12 lg:p-14 bg-gradient-to-br from-[#09090b] via-[#0f0f14] to-[#12121c] text-white overflow-hidden border-r border-white/[0.08]">
                {/* Visual Glows & Dot Screen */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                    }}
                />
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

                {/* Top HUD Status */}
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
                                OPERATING HUB &bull; SYSTEM_V2
                            </p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs font-mono shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-neutral-300 font-semibold">GATEWAY_ONLINE</span>
                        <span className="text-neutral-600">|</span>
                        <span className="text-neutral-200 font-bold">{currentTime}</span>
                    </div>
                </div>

                {/* Middle Value Props & Chisa Assistant Dialogue */}
                <div className="relative z-10 my-auto py-8 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.04] border border-white/10 rounded-full text-neutral-300 text-xs font-mono font-bold tracking-wider mb-6">
                        <i className="ph-bold ph-terminal-window text-indigo-400"></i>
                        <span>ACCESS_GATEWAY // PRIVATE_WORKSPACE</span>
                    </div>

                    <h2
                        className="font-display text-4xl xl:text-5xl font-black text-white leading-[1.12] tracking-tight mb-4 uppercase"
                        style={{ textWrap: 'balance' }}
                    >
                        Pusat Kendali Proyek & <br />
                        <span className="relative inline-block">
                            <span className="relative z-10 text-neutral-200">Keseimbangan Hidup.</span>
                            <span className="absolute bottom-1 left-0 right-0 h-3 bg-white/10 -z-0 rounded-sm" />
                        </span>
                    </h2>

                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-8 font-sans">
                        Akses modul manajemen papan Kanban, dokumentasi daily learning journal Data Engineering & Cloud, agenda kajian spiritual, serta sleep log tracker pribadi Anda.
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
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-black rounded-full"></div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono text-white uppercase tracking-widest font-bold">
                                        CHISA // COMPANION
                                    </span>
                                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                        STANDBY
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-300 italic leading-relaxed font-sans">
                                    "Workspace operasional telah siap. Silakan lakukan otentikasi untuk melanjutkan pemantauan modul produktivitas Anda."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Feature Badges */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-xs font-mono text-neutral-300">
                            <i className="ph-bold ph-kanban text-indigo-400 text-base"></i> Kanban & Portfolio Gen
                        </div>
                        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-xs font-mono text-neutral-300">
                            <i className="ph-bold ph-notebook text-emerald-400 text-base"></i> Daily Learning Journal
                        </div>
                        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-xs font-mono text-neutral-300">
                            <i className="ph-bold ph-mosque text-amber-400 text-base"></i> Spiritual & Catatan Kajian
                        </div>
                        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-xs font-mono text-neutral-300">
                            <i className="ph-bold ph-heartbeat text-purple-400 text-base"></i> Sleep & Wellbeing Tracker
                        </div>
                    </div>
                </div>

                {/* Bottom Link */}
                <div className="relative z-10 flex items-center justify-between border-t border-white/[0.08] pt-6 text-xs font-mono text-neutral-400">
                    <span>© 2026 Safah Workspace &bull; Laravel 12 & Inertia.js</span>
                    <Link href="/" className="text-neutral-200 hover:text-white font-bold flex items-center gap-1.5 transition-colors">
                        Lihat Portofolio Publik <i className="ph-bold ph-arrow-up-right"></i>
                    </Link>
                </div>
            </div>

            {/* RIGHT SIDE: Split Login Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16 bg-[#fafafa] min-h-screen">
                <div className="w-full max-w-md space-y-7">
                    
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
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs font-mono font-bold text-black">CHISA.SYS</span>
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">ONLINE</span>
                            </div>
                            <p className="text-xs text-neutral-500 mt-0.5">Silakan masuk ke akun workspace Anda</p>
                        </div>
                    </div>

                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-neutral-800 text-[11px] font-mono font-bold mb-2">
                            <i className="ph-bold ph-shield-check text-neutral-900"></i> SECURITY_LOGIN
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                            Selamat Datang Kembali
                        </h2>
                        <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-sans">
                            Masukkan email dan kata sandi Anda untuk mengakses workspace.
                        </p>
                    </div>

                    {/* Global Error Banner */}
                    {Object.keys(errors).length > 0 && (
                        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium space-y-1">
                            {Object.values(errors).map((err, idx) => (
                                <p key={idx} className="flex items-center gap-2">
                                    <i className="ph-fill ph-warning-circle text-base text-rose-500 shrink-0"></i> {err}
                                </p>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                                Alamat Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                                    <i className="ph-bold ph-envelope text-lg"></i>
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="nama@domain.com"
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-black/15 rounded-2xl text-xs sm:text-sm text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all shadow-xs"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
                                    Kata Sandi
                                </label>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                                    <i className="ph-bold ph-lock-key text-lg"></i>
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full pl-10 pr-11 py-3 bg-white border border-black/15 rounded-2xl text-xs sm:text-sm text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all shadow-xs"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                                >
                                    <i className={`ph-bold ${showPassword ? 'ph-eye-slash' : 'ph-eye'} text-lg`}></i>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded text-black border-black/20 focus:ring-black cursor-pointer"
                                />
                                <span className="text-xs font-medium text-neutral-600">Ingat Saya</span>
                            </label>

                            <Link href="/register" className="text-xs font-mono font-bold text-neutral-700 hover:text-black transition-colors">
                                Belum ada akun? Daftar
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 px-6 bg-black hover:bg-neutral-800 disabled:opacity-50 text-white rounded-2xl text-xs sm:text-sm font-mono font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                        >
                            {processing ? (
                                <>
                                    <i className="ph-bold ph-spinner animate-spin text-base"></i>
                                    <span>Memverifikasi...</span>
                                </>
                            ) : (
                                <>
                                    <span>Masuk ke Workspace</span>
                                    <i className="ph-bold ph-arrow-right text-base"></i>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center pt-2">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-500 hover:text-black transition-colors"
                        >
                            <i className="ph-bold ph-arrow-left"></i> Kembali ke Beranda Portofolio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

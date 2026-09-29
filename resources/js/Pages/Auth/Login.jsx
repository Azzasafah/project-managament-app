import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const [currentTime, setCurrentTime] = useState('00:00:00');
    const [showPassword, setShowPassword] = useState(false);
    const [isPlayingSound, setIsPlayingSound] = useState(false);
    const [showCredentialHelper, setShowCredentialHelper] = useState(false);
    const audioRef = useRef(null);

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

    const playChisaVoice = () => {
        const soundFiles = [
            '/sounds/001_No7 Morning.wav',
            '/sounds/002_No.7 Night.wav',
            '/sounds/003_No.7 Date.wav',
        ];
        const randomSound = soundFiles[Math.floor(Math.random() * soundFiles.length)];

        if (audioRef.current) {
            audioRef.current.pause();
        }

        const audio = new Audio(randomSound);
        audioRef.current = audio;
        setIsPlayingSound(true);
        audio.play().catch(() => {});
        audio.onended = () => setIsPlayingSound(false);
    };

    const handleAutoFillDefault = () => {
        setData({
            email: 'admin_***@example.internal',
            password: 'Kredensial_Disamarkan_2026!',
            remember: true,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-[100dvh] w-full grid grid-cols-1 lg:grid-cols-2 font-sans overflow-x-hidden selection:bg-black selection:text-white">
            <Head title="Otentikasi Akses // Safah Workspace" />

            {/* ========================================================================= */}
            {/* LEFT HALF: DARK / TECHWEAR WIBU CHISA COMPANION (BLACK #08080c) */}
            {/* ========================================================================= */}
            <div className="relative bg-[#08080c] text-white p-6 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
                {/* Ambient Cyber Grid & Subtle Glow */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.035]"
                    style={{
                        backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                    }}
                />
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-white/[0.04] rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

                {/* Top Header on Left */}
                <div className="relative z-10 flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-display font-black text-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_20px_rgba(255,255,255,0.12)] transition-transform group-hover:scale-105 shrink-0">
                            <span>S</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-display font-extrabold text-base tracking-tight text-white">
                                    Safah<span className="text-neutral-400">Workspace</span>
                                </span>
                                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300 border border-white/15 font-bold">
                                    SYSTEM_OS
                                </span>
                            </div>
                            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                                MANAGEMENT &bull; CENTRAL_GATEWAY
                            </p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-neutral-300 font-bold hidden sm:inline">SYS_ONLINE</span>
                        <span className="text-neutral-600 hidden sm:inline">|</span>
                        <span className="text-neutral-400">{currentTime}</span>
                    </div>
                </div>

                {/* Middle Stage Content */}
                <div className="relative z-10 py-10 lg:py-12 space-y-6">
                    {/* Access Tag */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/10 rounded-lg text-neutral-300 text-[11px] font-mono font-bold tracking-widest uppercase">
                        <i className="ph-bold ph-terminal-window text-neutral-400"></i>
                        <span>ACCESS_GATEWAY // PRIVATE_WORKSPACE</span>
                    </div>

                    {/* Headline */}
                    <div className="space-y-3">
                        <h1 className="font-display text-2xl sm:text-4xl xl:text-5xl font-black text-white leading-[1.12] tracking-tight uppercase">
                            Pusat Kendali <br />
                            <span className="text-neutral-400">Operasional Portofolio.</span>
                        </h1>
                        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-lg font-sans">
                            Otentikasi identitas master untuk mengelola portofolio proyek, rekam jejak magang, kredensial sertifikasi resmi, dan modul produktivitas Anda.
                        </p>
                    </div>

                    {/* Chisa Companion Interactive Card */}
                    <div className="p-5 sm:p-6 rounded-[2rem] bg-[#0f0f16] border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                        <div
                            className="absolute inset-0 opacity-[0.025] pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}
                        />

                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 relative z-10">
                            {/* Avatar with Scanline */}
                            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/15 bg-black shrink-0 shadow-xl">
                                <img
                                    src="/chisa.webp"
                                    alt="Chisa Companion"
                                    className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.src = '/chisa.png';
                                    }}
                                />
                                {/* Scanline overlay */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-30"
                                    style={{
                                        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 255, 255, 0.04), rgba(0, 0, 0, 0.02), rgba(255, 255, 255, 0.04))',
                                        backgroundSize: '100% 3px, 6px 100%',
                                    }}
                                />
                                <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-black rounded-full"></div>

                                {/* Voice Trigger */}
                                <button
                                    type="button"
                                    onClick={playChisaVoice}
                                    className="absolute top-1.5 right-1.5 w-7 h-7 rounded-lg bg-black/80 hover:bg-white hover:text-black border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
                                    title="Dengarkan Suara Chisa"
                                >
                                    <i className={`ph-bold ${isPlayingSound ? 'ph-speaker-high animate-bounce text-emerald-400' : 'ph-play'} text-xs`}></i>
                                </button>
                            </div>

                            {/* Dialogue */}
                            <div className="flex-1 space-y-2 text-center sm:text-left">
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                                        CHISA // COMPANION
                                    </span>
                                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                                        STANDBY
                                    </span>
                                    <span className="text-[10px] font-mono text-neutral-500">
                                        おかえりなさい、サファー様
                                    </span>
                                </div>

                                <p className="text-xs text-neutral-300 leading-relaxed font-sans italic border-l-0 sm:border-l-2 sm:border-white/15 sm:pl-3">
                                    "Workspace operasional telah terhubung. Silakan lakukan otentikasi di sebelah kanan untuk membuka dasbor manajemen portofolio dan jadwal produktivitas Anda."
                                </p>

                                <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-[10px] font-mono text-neutral-500">
                                    <span className="flex items-center gap-1.5">
                                        <i className="ph-bold ph-shield-check text-neutral-400"></i> TLS_ENCRYPTED
                                    </span>
                                    <span>&bull;</span>
                                    <span className="flex items-center gap-1.5">
                                        <i className="ph-bold ph-cpu text-neutral-400"></i> LARAVEL_12 &bull; PHP_8.4
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Capabilities */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-[11px] font-mono text-neutral-400 flex items-center gap-2">
                            <i className="ph-bold ph-kanban text-neutral-300"></i> Kanban CMS
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-[11px] font-mono text-neutral-400 flex items-center gap-2">
                            <i className="ph-bold ph-certificate text-neutral-300"></i> Sertifikasi
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-[11px] font-mono text-neutral-400 flex items-center gap-2">
                            <i className="ph-bold ph-briefcase text-neutral-300"></i> Magang & Kerja
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-[11px] font-mono text-neutral-400 flex items-center gap-2">
                            <i className="ph-bold ph-user-gear text-neutral-300"></i> Profil & Auth
                        </div>
                    </div>
                </div>

                {/* Bottom Left Footer */}
                <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-neutral-500 border-t border-white/[0.07]">
                    <span>&copy; 2026 Muhammad Hafizh Azzasafah</span>
                    <span>NEO_TOKYO // DESIGN_ENGINEERING_V1</span>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* RIGHT HALF: CRISP CLEAN WHITE / OFF-WHITE (#ffffff / #fafafa) */}
            {/* ========================================================================= */}
            <div className="relative bg-[#ffffff] text-slate-900 p-6 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-between">
                {/* Top Navigation on Right */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-slate-400 flex items-center gap-1.5">
                        <i className="ph-bold ph-lock-key text-slate-600"></i> SECURE_GATEWAY: 443
                    </span>

                    <Link
                        href="/"
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-black hover:text-white border border-slate-200 text-xs font-mono font-bold text-slate-700 flex items-center gap-1.5 transition-all active:scale-[0.98]"
                    >
                        <i className="ph-bold ph-arrow-square-out text-sm"></i>
                        <span>Lihat Portofolio</span>
                    </Link>
                </div>

                {/* Form Stage Container */}
                <div className="py-8 sm:py-12 max-w-md w-full mx-auto space-y-6">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-black"></span>
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                                AUTHENTICATION GATEWAY
                            </span>
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                            Masuk Akun
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 font-sans">
                            Masukkan email dan kata sandi akses master Anda untuk membuka kontrol panel.
                        </p>
                    </div>

                    {/* Inline Error Notice */}
                    {Object.keys(errors).length > 0 && (
                        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono space-y-1">
                            <div className="flex items-center gap-1.5 font-bold text-rose-700">
                                <i className="ph-bold ph-warning-circle text-base"></i>
                                <span>OTENTIKASI GAGAL</span>
                            </div>
                            {Object.values(errors).map((err, idx) => (
                                <p key={idx} className="pl-4 text-[11px] text-rose-600">&bull; {err}</p>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
                                ALAMAT EMAIL
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <i className="ph-bold ph-envelope text-base"></i>
                                </span>
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="admin@example.internal"
                                    className="w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 font-mono transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-mono font-bold text-slate-700">
                                    KATA SANDI
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-[11px] font-mono font-semibold text-slate-500 hover:text-black flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                    <i className={`ph-bold ${showPassword ? 'ph-eye-slash' : 'ph-eye'}`}></i>
                                    <span>{showPassword ? 'Sembunyikan' : 'Lihat'}</span>
                                </button>
                            </div>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <i className="ph-bold ph-lock-key text-base"></i>
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl pl-10 pr-10 py-3 text-sm text-slate-900 placeholder-slate-400 font-mono transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Remember Me & Help Toggle */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-mono text-slate-600 hover:text-slate-900">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 text-black focus:ring-black cursor-pointer"
                                />
                                <span>Ingat Sesi</span>
                            </label>

                            <button
                                type="button"
                                onClick={() => setShowCredentialHelper(!showCredentialHelper)}
                                className="text-xs font-mono font-semibold text-slate-500 hover:text-black flex items-center gap-1 cursor-pointer transition-colors"
                            >
                                <i className="ph-bold ph-question text-sm"></i>
                                <span>{showCredentialHelper ? 'Tutup Bantuan' : 'Info Kredensial'}</span>
                            </button>
                        </div>

                        {/* Credential Helper Box */}
                        {showCredentialHelper && (
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-2.5">
                                <div className="flex items-center justify-between text-slate-700">
                                    <span className="font-bold flex items-center gap-1.5">
                                        <i className="ph-bold ph-database"></i> Kredensial Seeder:
                                    </span>
                                    <span className="text-[9px] px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-bold">
                                        DEFAULT
                                    </span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Email:</span>
                                        <span className="text-slate-800 font-mono select-all font-semibold">admin_***@example.internal</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Sandi:</span>
                                        <span className="text-slate-800 font-mono select-all font-semibold">Kredensial_Disamarkan_2026!</span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAutoFillDefault}
                                    className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-black text-white font-mono text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                                >
                                    <i className="ph-bold ph-arrow-down-right"></i>
                                    <span>Gunakan Kredensial Ini</span>
                                </button>
                            </div>
                        )}

                        {/* Solid High-Contrast Techwear Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full mt-4 py-3.5 px-5 rounded-xl bg-black hover:bg-neutral-800 text-white font-mono font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <>
                                    <i className="ph-bold ph-spinner animate-spin text-sm"></i>
                                    <span>MEMVERIFIKASI...</span>
                                </>
                            ) : (
                                <>
                                    <span>MASUK KE WORKSPACE</span>
                                    <i className="ph-bold ph-arrow-right text-sm"></i>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Bottom Right Helper Info */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>SECURITY // SESSION_VERIFIED</span>
                    <a
                        href="https://github.com/Azzasafah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-slate-900 transition-colors flex items-center gap-1"
                    >
                        <span>GitHub Azzasafah</span>
                        <i className="ph-bold ph-arrow-up-right"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}


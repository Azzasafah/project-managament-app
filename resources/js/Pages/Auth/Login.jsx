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
        <div className="min-h-[100dvh] w-full flex flex-col justify-between bg-[#0a0a0f] text-white font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
            <Head title="Otentikasi Akses // Safah Workspace" />

            {/* Ambient Background Grid & Noise Texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                }}
            />
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />

            {/* Top Navigation Bar */}
            <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/[0.06]">
                <Link href="/" className="flex items-center gap-3.5 group">
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

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-neutral-300 font-bold">SYS_ONLINE</span>
                        <span className="text-neutral-600">|</span>
                        <span className="text-neutral-400">{currentTime}</span>
                    </div>

                    <Link
                        href="/"
                        className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-xs font-mono font-bold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-all active:scale-[0.98]"
                    >
                        <i className="ph-bold ph-globe text-sm"></i>
                        <span>Portofolio</span>
                    </Link>
                </div>
            </header>

            {/* Main Interactive Stage */}
            <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 sm:py-12 flex-1 flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* LEFT: Wibu Chisa Companion & Workspace Terminal Banner (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col space-y-6">
                        
                        {/* Status Label */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/[0.08] rounded-lg text-neutral-300 text-[11px] font-mono font-bold tracking-widest uppercase w-fit">
                            <i className="ph-bold ph-terminal-window text-neutral-400"></i>
                            <span>ACCESS_GATEWAY // PRIVATE_WORKSPACE</span>
                        </div>

                        {/* Asymmetric Typography Headline */}
                        <div className="space-y-3">
                            <h1 className="font-display text-3xl sm:text-4xl xl:text-5xl font-black text-white leading-[1.12] tracking-tight uppercase">
                                Pusat Kendali <br />
                                <span className="text-neutral-400">Operasional Portofolio.</span>
                            </h1>
                            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xl font-sans">
                                Otentikasi identitas untuk mengelola katalog proyek, rekam jejak magang, kredensial sertifikasi, jurnal pembelajaran harian, dan modul produktivitas Anda.
                            </p>
                        </div>

                        {/* Chisa Assistant Card — Harmonious with WaifuBanner */}
                        <div className="p-5 sm:p-6 rounded-[2rem] bg-[#0e0e14] border border-white/10 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                            <div
                                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}
                            />

                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10">
                                
                                {/* Chisa Avatar Container with Scanline */}
                                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-white/15 bg-black shrink-0 shadow-xl">
                                    <img
                                        src="/chisa.webp"
                                        alt="Chisa Assistant"
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
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-black rounded-full"></div>

                                    {/* Playable SFX trigger */}
                                    <button
                                        type="button"
                                        onClick={playChisaVoice}
                                        className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/80 hover:bg-white hover:text-black border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
                                        title="Putar Suara Chisa"
                                    >
                                        <i className={`ph-bold ${isPlayingSound ? 'ph-speaker-high animate-bounce text-emerald-400' : 'ph-play'} text-xs`}></i>
                                    </button>
                                </div>

                                {/* Dialogue & Subtext */}
                                <div className="flex-1 space-y-2.5 text-center sm:text-left">
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
                                        "Workspace operasional telah terhubung. Silakan lakukan otentikasi untuk membuka dasbor manajemen portofolio dan jadwal produktivitas Anda."
                                    </p>

                                    <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[10px] font-mono text-neutral-500">
                                        <span className="flex items-center gap-1.5">
                                            <i className="ph-bold ph-shield-check text-neutral-400"></i> TLS_ENCRYPTED
                                        </span>
                                        <span>&bull;</span>
                                        <span className="flex items-center gap-1.5">
                                            <i className="ph-bold ph-cpu text-neutral-400"></i> PHP_8.4 &bull; LARAVEL_12
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Capabilities Pills */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-neutral-400 flex items-center gap-2">
                                <i className="ph-bold ph-kanban text-neutral-300"></i> Kanban CMS
                            </div>
                            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-neutral-400 flex items-center gap-2">
                                <i className="ph-bold ph-certificate text-neutral-300"></i> Sertifikasi
                            </div>
                            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-neutral-400 flex items-center gap-2">
                                <i className="ph-bold ph-notebook text-neutral-300"></i> Jurnal ADE
                            </div>
                            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-neutral-400 flex items-center gap-2">
                                <i className="ph-bold ph-user-gear text-neutral-300"></i> Profil & Auth
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: High-Agency Authentication Terminal (5 cols) */}
                    <div className="lg:col-span-5 p-7 sm:p-9 rounded-[2rem] bg-[#0e0e14] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative backdrop-blur-xl">
                        
                        <div className="mb-6 space-y-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-neutral-400 flex items-center gap-1.5">
                                    <i className="ph-bold ph-key text-neutral-300"></i> SYSTEM_LOGIN
                                </span>
                                <span className="text-[10px] font-mono text-neutral-500">
                                    SECURE_PORT: 443
                                </span>
                            </div>
                            <h2 className="font-display text-2xl font-black text-white tracking-tight uppercase">
                                Masuk Akun
                            </h2>
                            <p className="text-xs text-neutral-400 font-sans">
                                Masukkan email dan kata sandi akses master Anda.
                            </p>
                        </div>

                        {/* Inline Error Reporting */}
                        {Object.keys(errors).length > 0 && (
                            <div className="mb-5 p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs font-mono space-y-1">
                                <div className="flex items-center gap-1.5 font-bold text-rose-400">
                                    <i className="ph-bold ph-warning-circle"></i>
                                    <span>AUTH_FAILED</span>
                                </div>
                                {Object.values(errors).map((err, idx) => (
                                    <p key={idx} className="pl-4 text-[11px]">&bull; {err}</p>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="block text-xs font-mono font-bold text-neutral-300 mb-1.5">
                                    ALAMAT EMAIL
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                                        <i className="ph-bold ph-envelope text-sm"></i>
                                    </span>
                                    <input
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="admin@example.internal"
                                        className="w-full bg-[#07070a] border border-white/15 focus:border-white/50 focus:ring-0 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-600 font-mono transition-all outline-none"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-xs font-mono font-bold text-neutral-300">
                                        KATA SANDI
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-[11px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                                    >
                                        <i className={`ph-bold ${showPassword ? 'ph-eye-slash' : 'ph-eye'}`}></i>
                                        <span>{showPassword ? 'Sembunyikan' : 'Lihat'}</span>
                                    </button>
                                </div>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                                        <i className="ph-bold ph-lock-key text-sm"></i>
                                    </span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full bg-[#07070a] border border-white/15 focus:border-white/50 focus:ring-0 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-neutral-600 font-mono transition-all outline-none"
                                    />
                                </div>
                            </div>

                            {/* Remember & Credential Help Toggle */}
                            <div className="flex items-center justify-between pt-1">
                                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-mono text-neutral-400 hover:text-neutral-300">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 rounded border-white/20 bg-black text-white focus:ring-0 cursor-pointer"
                                    />
                                    <span>Ingat Sesi</span>
                                </label>

                                <button
                                    type="button"
                                    onClick={() => setShowCredentialHelper(!showCredentialHelper)}
                                    className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                    <i className="ph-bold ph-question"></i>
                                    <span>{showCredentialHelper ? 'Tutup Bantuan' : 'Info Kredensial'}</span>
                                </button>
                            </div>

                            {/* Credential Helper Box */}
                            {showCredentialHelper && (
                                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono space-y-2 animate-fade-in">
                                    <div className="flex items-center justify-between text-neutral-400">
                                        <span className="font-bold flex items-center gap-1.5">
                                            <i className="ph-bold ph-database"></i> Kredensial Seeder:
                                        </span>
                                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white font-bold">
                                            DEFAULT
                                        </span>
                                    </div>
                                    <div className="p-2 rounded-lg bg-black/60 border border-white/[0.06] text-[11px] space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Email:</span>
                                            <span className="text-neutral-300 font-mono select-all">admin_***@example.internal</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Sandi:</span>
                                            <span className="text-neutral-300 font-mono select-all">Kredensial_Disamarkan_2026!</span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAutoFillDefault}
                                        className="w-full py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                                    >
                                        <i className="ph-bold ph-arrow-down-right"></i>
                                        <span>Gunakan Kredensial Ini</span>
                                    </button>
                                </div>
                            )}

                            {/* Submit Button (Solid High-Contrast Techwear) */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full mt-3 py-3.5 px-5 rounded-xl bg-white hover:bg-neutral-200 text-black font-mono font-black text-xs uppercase tracking-wider shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
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

                        {/* Footer Link */}
                        <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-500">
                            <span>SESSION // SECURE_AUTH</span>
                            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                                <span>Lihat Portofolio</span>
                                <i className="ph-bold ph-arrow-up-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Footer */}
            <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-neutral-500 border-t border-white/[0.06]">
                <span>&copy; 2026 Muhammad Hafizh Azzasafah &bull; Safah Workspace</span>
                <span>NEO_TOKYO // DESIGN_ENGINEERING_V1</span>
            </footer>
        </div>
    );
}

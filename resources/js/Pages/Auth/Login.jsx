import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const [currentTime, setCurrentTime] = useState('00:00:00');
    const [showPassword, setShowPassword] = useState(false);
    const [activeField, setActiveField] = useState('default');
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
        setActiveField('default');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setActiveField('submitting');
        post('/login', {
            onError: () => setActiveField('error'),
            onFinish: () => {
                if (Object.keys(errors).length === 0) {
                    setActiveField('default');
                }
            },
        });
    };

    // Dynamic Chisa Dialogue based on user interaction
    const getChisaMessage = () => {
        if (processing || activeField === 'submitting') {
            return {
                jp: 'ちょっと待ってください...',
                romaji: 'Chotto matte kudasai! ⏳',
                id: 'Sedang memvalidasi tanda tangan neural matriks ke server...',
                mood: 'busy',
            };
        }
        if (Object.keys(errors).length > 0 || activeField === 'error') {
            return {
                jp: 'ごめんなさい、認証に失敗しました！',
                romaji: 'Gomen ne! (＞﹏＜)',
                id: 'Kredensial akses tidak cocok. Gunakan tombol bantuan di bawah jika lupa password ya!',
                mood: 'error',
            };
        }
        if (activeField === 'email') {
            return {
                jp: 'メールアドレスを入力してください',
                romaji: 'Email wo kudasai~ 📧',
                id: 'Pastikan emailmu sudah terdaftar di database sistem ya, Master!',
                mood: 'email',
            };
        }
        if (activeField === 'password') {
            return {
                jp: '秘密のパスワードですね！',
                romaji: 'Himitsu no pasuwaado da! 🤫',
                id: 'Ssst, rahasia! Tenang saja, Chisa jaga sandi ini tetap aman terkunci.',
                mood: 'password',
            };
        }
        return {
            jp: 'おかえりなさい、サファー様！',
            romaji: 'Okaerinasai, Safah-sama! ✨',
            id: 'Selamat datang kembali di pusat kendali workspace. Silakan otentikasi untuk masuk!',
            mood: 'idle',
        };
    };

    const chisaDialog = getChisaMessage();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 lg:p-10 bg-[#09090b] text-white font-sans selection:bg-cyan-500 selection:text-black relative overflow-hidden">
            <Head title="Masuk Gateway // Chisa Companion — Safah Workspace" />

            {/* Ambient Background Cyber Elements */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-500/15 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[180px] pointer-events-none" />

            {/* Top Bar Floating Status */}
            <div className="w-full max-w-5xl flex items-center justify-between py-4 mb-4 z-20">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-display font-black text-xl shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-transform group-hover:scale-105">
                        <span>S</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-display font-extrabold text-base tracking-tight text-white">
                                Safah<span className="text-cyan-400">Workspace</span>
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-bold hidden sm:inline-block">
                                v2.6 AUTH
                            </span>
                        </div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                            NEO_TOKYO // GATEWAY_SYSTEM
                        </p>
                    </div>
                </Link>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-neutral-300 font-bold">ONLINE</span>
                        <span className="text-neutral-600">|</span>
                        <span className="text-neutral-200">{currentTime}</span>
                    </div>

                    <Link
                        href="/"
                        className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1.5 transition-all shadow-xs"
                    >
                        <i className="ph-bold ph-arrow-left"></i>
                        <span>Portofolio</span>
                    </Link>
                </div>
            </div>

            {/* Main Interactive Login Container */}
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 z-20 items-center">
                
                {/* LEFT / TOP: Wibu Chisa Anime Companion Card */}
                <div className="lg:col-span-5 flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-[#111116]/80 border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
                    
                    {/* Glowing Top Line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-75" />

                    {/* Badge Mode */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-bold tracking-wider mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        <span>AI_ASSISTANT // CHISA</span>
                    </div>

                    {/* Hologram Chisa Frame with Scanline Effect */}
                    <div className="relative w-44 sm:w-48 aspect-square rounded-3xl overflow-hidden border-2 border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.25)] bg-[#09090b] mb-5">
                        <img
                            src="/chisa.webp"
                            alt="Chisa AI Mascot"
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                                e.target.src = '/chisa.png';
                            }}
                        />
                        {/* Animated Scanline Overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-40"
                            style={{
                                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.04))',
                                backgroundSize: '100% 3px, 6px 100%',
                            }}
                        />
                        <div className="absolute inset-x-0 top-0 h-6 bg-cyan-400/20 blur-xs animate-pulse pointer-events-none" />

                        {/* Interactive Sound Trigger */}
                        <button
                            type="button"
                            onClick={playChisaVoice}
                            className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-black/80 hover:bg-cyan-500 hover:text-black border border-white/20 text-white text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-90 cursor-pointer"
                            title="Klik untuk mendengarkan suara anime Chisa!"
                        >
                            <i className={`ph-bold ${isPlayingSound ? 'ph-speaker-high animate-bounce text-yellow-300' : 'ph-play'}`}></i>
                            <span>VOICE</span>
                        </button>
                    </div>

                    {/* Anime Speech Bubble (吹き出し) */}
                    <div className="w-full relative p-4 rounded-2xl bg-[#181820]/90 border border-white/15 text-left shadow-lg">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#181820] border-t border-l border-white/15 rotate-45" />
                        
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono font-extrabold text-cyan-400 uppercase tracking-widest">
                                CHISA // VOICE_FEED
                            </span>
                            <span className="text-[10px] font-mono text-neutral-400">
                                {chisaDialog.jp}
                            </span>
                        </div>
                        
                        <p className="text-xs font-mono font-bold text-white mb-1">
                            {chisaDialog.romaji}
                        </p>
                        <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                            {chisaDialog.id}
                        </p>
                    </div>

                    {/* Quick Stats / Subtext */}
                    <div className="mt-4 flex items-center justify-center gap-4 text-[11px] font-mono text-neutral-400">
                        <span className="flex items-center gap-1">
                            <i className="ph-bold ph-shield-check text-emerald-400"></i> SSL_SECURED
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                            <i className="ph-bold ph-cpu text-cyan-400"></i> LARAVEL_12
                        </span>
                    </div>
                </div>

                {/* RIGHT: Login Form Container */}
                <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-[#111116]/90 border border-white/15 shadow-2xl backdrop-blur-xl relative">
                    
                    <div className="mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono font-bold mb-2.5">
                            <i className="ph-bold ph-key text-yellow-400"></i>
                            <span>SYSTEM_AUTHENTICATION</span>
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                            Masuk Workspace
                        </h2>
                        <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-sans">
                            Akses dashboard manajemen portofolio, Kanban, dan modul analitik Anda.
                        </p>
                    </div>

                    {/* Error Banner */}
                    {Object.keys(errors).length > 0 && (
                        <div className="mb-5 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs space-y-1 font-mono">
                            <div className="flex items-center gap-2 font-bold text-rose-400">
                                <i className="ph-bold ph-warning-circle text-base"></i>
                                <span>AUTHENTICATION_FAILED:</span>
                            </div>
                            {Object.values(errors).map((err, idx) => (
                                <p key={idx} className="pl-6">&bull; {err}</p>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Field */}
                        <div>
                            <label className="block text-xs font-mono font-bold text-neutral-300 mb-1.5 flex items-center justify-between">
                                <span>ALAMAT EMAIL</span>
                                <span className="text-[10px] text-neutral-500">FORMAT: user@domain.com</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                                    <i className="ph-bold ph-envelope text-base"></i>
                                </span>
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onFocus={() => setActiveField('email')}
                                    onBlur={() => setActiveField('default')}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="admin@example.internal"
                                    className="w-full bg-[#09090b] border border-white/15 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-600 font-mono transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-mono font-bold text-neutral-300">
                                    KATA SANDI
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                    <i className={`ph-bold ${showPassword ? 'ph-eye-slash' : 'ph-eye'}`}></i>
                                    <span>{showPassword ? 'Sembunyikan' : 'Perlihatkan'}</span>
                                </button>
                            </div>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                                    <i className="ph-bold ph-lock-key text-base"></i>
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={data.password}
                                    onFocus={() => setActiveField('password')}
                                    onBlur={() => setActiveField('default')}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full bg-[#09090b] border border-white/15 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-neutral-600 font-mono transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-mono text-neutral-300">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded-md border-white/20 bg-[#09090b] text-cyan-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                                />
                                <span>Ingat Sesi Saya</span>
                            </label>

                            <button
                                type="button"
                                onClick={() => setShowCredentialHelper(!showCredentialHelper)}
                                className="text-xs font-mono text-yellow-400 hover:text-yellow-300 flex items-center gap-1 cursor-pointer transition-colors"
                            >
                                <i className="ph-bold ph-key"></i>
                                <span>{showCredentialHelper ? 'Tutup Bantuan' : 'Lupa Kredensial?'}</span>
                            </button>
                        </div>

                        {/* Collapsible Default Credential Helper Box */}
                        {showCredentialHelper && (
                            <div className="p-4 rounded-2xl bg-yellow-950/30 border border-yellow-500/30 text-xs text-yellow-200/90 space-y-2.5 animate-fade-in">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <i className="ph-bold ph-info"></i> Kredensial Bawaan Database
                                    </span>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300">
                                        SEEDER
                                    </span>
                                </div>
                                <p className="text-[11px] leading-relaxed text-neutral-300 font-sans">
                                    Saat deployment fresh di DOM Cloud, akun superadmin awal dibuat otomatis dengan data berikut:
                                </p>
                                <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-400">Email:</span>
                                        <code className="text-cyan-300 select-all font-bold">admin_***@example.internal</code>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-400">Password:</span>
                                        <code className="text-pink-300 select-all font-bold">Kredensial_Disamarkan_2026!</code>
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-1">
                                    <button
                                        type="button"
                                        onClick={handleAutoFillDefault}
                                        className="flex-1 py-2 px-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-mono font-extrabold text-[11px] shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                                    >
                                        <i className="ph-bold ph-magic-wand"></i> Pakai Kredensial Bawaan
                                    </button>
                                </div>
                                <p className="text-[10px] text-neutral-400 italic">
                                    *Setelah masuk ke Dashboard, Anda bisa langsung mengubah email dan password melalui menu "Pengaturan Akun" di pojok atas / sidebar.
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full mt-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 hover:from-cyan-400 hover:via-indigo-400 hover:to-pink-400 text-black font-display font-black text-sm tracking-wide uppercase shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 group"
                        >
                            {processing ? (
                                <>
                                    <i className="ph-bold ph-spinner animate-spin text-base"></i>
                                    <span>MEMVERIFIKASI...</span>
                                </>
                            ) : (
                                <>
                                    <span>MASUK KE WORKSPACE</span>
                                    <i className="ph-bold ph-arrow-right text-base group-hover:translate-x-1 transition-transform"></i>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer Notice */}
                    <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                        <span>Terminal Login &bull; Portofolio Manager</span>
                        <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                            <span>Web Publik</span>
                            <i className="ph-bold ph-arrow-up-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

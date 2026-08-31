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
        <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950 font-sans">
            <Head title="Masuk - Safah Workspace" />

            {/* LEFT SIDE: Techwear Cyber HUD Banner */}
            <div className="relative hidden lg:flex lg:w-7/12 flex-col justify-between p-12 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden border-r border-slate-800">
                {/* Visual Glows & Grid */}
                <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* Top HUD Status */}
                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/40 text-2xl">
                            <i className="ph-bold ph-hexagon"></i>
                        </div>
                        <div>
                            <h1 className="font-extrabold text-xl tracking-tight leading-none">
                                Safah<span className="text-indigo-400">Workspace</span>
                            </h1>
                            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mt-1">
                                Operating Hub & Management
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-slate-300">SYSTEM_ONLINE</span>
                        <span className="text-slate-600">|</span>
                        <span className="text-indigo-400 font-bold">{currentTime}</span>
                    </div>
                </div>

                {/* Middle Value Props & Chisa Assistant Dialogue */}
                <div className="relative z-10 my-auto py-8 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-400 text-xs font-mono font-bold tracking-wider mb-6">
                        <i className="ph-bold ph-terminal-window"></i> ACCESS_GATEWAY // PRIVATE_WORKSPACE
                    </div>

                    <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight mb-4">
                        Pusat Kendali Proyek, <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-200 to-cyan-300">
                            Jurnal & Keseimbangan Hidup.
                        </span>
                    </h2>

                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                        Kelola papan Kanban proyek, arsip catatan harian Data Engineering & Cloud, agenda kajian spiritual, serta pemantauan waktu istirahat dan tidur.
                    </p>

                    {/* Cyber Chisa Card Box */}
                    <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-700/60 shadow-2xl relative overflow-hidden backdrop-blur-md group hover:border-indigo-500/50 transition-all duration-300">
                        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-400 to-cyan-400" />
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-indigo-500/40 shrink-0 bg-slate-950 shadow-md">
                                <img
                                    src="/chisa.png"
                                    alt="Chisa Assistant"
                                    className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=300&auto=format&fit=crop';
                                    }}
                                />
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 rounded-full"></div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                                        CHISA // ASSISTANT
                                    </span>
                                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                        ONLINE
                                    </span>
                                </div>
                                <p className="text-xs text-slate-200 italic leading-relaxed">
                                    "Workspace operasional telah siap. Silakan lakukan otentikasi untuk melanjutkan pemantauan modul produktivitas Anda."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Feature Badges */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-medium text-slate-300">
                            <i className="ph-bold ph-kanban text-indigo-400 text-base"></i> Kanban & Portfolio Gen
                        </div>
                        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-medium text-slate-300">
                            <i className="ph-bold ph-notebook text-emerald-400 text-base"></i> Daily Learning Journal
                        </div>
                        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-medium text-slate-300">
                            <i className="ph-bold ph-mosque text-amber-400 text-base"></i> Spiritual & Catatan Kajian
                        </div>
                        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-medium text-slate-300">
                            <i className="ph-bold ph-heartbeat text-purple-400 text-base"></i> Sleep & Refreshing Logger
                        </div>
                    </div>
                </div>

                {/* Bottom Link */}
                <div className="relative z-10 flex items-center justify-between border-t border-slate-800/80 pt-6 text-xs text-slate-400">
                    <span>© 2026 Safah Workspace. Powered by Laravel 12 & Inertia React.</span>
                    <Link href="/portfolio" className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors">
                        Lihat Portofolio Publik <i className="ph-bold ph-arrow-up-right"></i>
                    </Link>
                </div>
            </div>

            {/* RIGHT SIDE: Split Login Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16 bg-white min-h-screen">
                <div className="w-full max-w-md space-y-7">
                    
                    {/* Mobile Brand */}
                    <div className="lg:hidden text-center mb-4">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white text-3xl shadow-lg shadow-indigo-600/30 mb-2">
                            <i className="ph-bold ph-hexagon"></i>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Safah<span className="text-indigo-600">Workspace</span>
                        </h1>
                        <p className="text-xs text-slate-500">Operating Hub & Management</p>
                    </div>

                    {/* Chisa Mini Avatar Badge */}
                    <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                        <div className="relative w-12 h-12 rounded-xl bg-slate-900 border border-slate-300 overflow-hidden shrink-0 shadow-sm">
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
                                <span className="text-xs font-mono font-bold text-indigo-950">CHISA.SYS</span>
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 font-bold">ONLINE</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">Silakan masuk ke akun Anda</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Selamat Datang</h2>
                        <p className="text-sm text-slate-500 mt-1.5">
                            Masuk ke workspace untuk mengelola tugas, jurnal, dan analitik Anda.
                        </p>
                    </div>

                    {/* Error Messages */}
                    {Object.keys(errors).length > 0 && (
                        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium space-y-1">
                            {Object.values(errors).map((err, idx) => (
                                <p key={idx} className="flex items-center gap-2">
                                    <i className="ph-fill ph-warning-circle text-base text-rose-500"></i> {err}
                                </p>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Alamat Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-lg">
                                    <i className="ph-bold ph-envelope"></i>
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm"
                                    placeholder="nama@email.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-lg">
                                    <i className="ph-bold ph-lock-key"></i>
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors text-lg cursor-pointer"
                                >
                                    <i className={showPassword ? 'ph-bold ph-eye-slash' : 'ph-bold ph-eye'}></i>
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between text-xs">
                            <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
                                />
                                <span className="font-medium">Ingat saya</span>
                            </label>
                            <Link href="/portfolio" className="font-semibold text-indigo-600 hover:text-indigo-700">
                                Mode Publik →
                            </Link>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 px-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-sm font-bold tracking-wide transition-all duration-200 shadow-floating flex items-center justify-center gap-2 group active:scale-[0.99] cursor-pointer disabled:opacity-50 mt-1"
                        >
                            <span>{processing ? 'Memproses...' : 'Masuk ke Workspace'}</span>
                            <i className="ph-bold ph-arrow-right text-base group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </form>

                    <div className="text-center pt-1">
                        <p className="text-xs text-slate-500">
                            Belum memiliki akun?{' '}
                            <Link href="/register" className="font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-4">
                                Daftar akun baru
                            </Link>
                        </p>
                    </div>

                    <div className="lg:hidden text-center border-t border-slate-100 pt-5">
                        <Link href="/portfolio" className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center justify-center gap-1.5">
                            <i className="ph-bold ph-globe"></i> Lihat Halaman Portofolio Publik
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

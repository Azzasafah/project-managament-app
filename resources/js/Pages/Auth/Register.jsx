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
        <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950 font-sans">
            <Head title="Daftar Akun - Safah Workspace" />

            {/* LEFT SIDE: Techwear Cyber HUD Banner */}
            <div className="relative hidden lg:flex lg:w-7/12 flex-col justify-between p-12 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden border-r border-slate-800">
                <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

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
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-slate-300">USER_REGISTRATION</span>
                    </div>
                </div>

                <div className="relative z-10 my-auto py-8 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 text-xs font-mono font-bold tracking-wider mb-6">
                        <i className="ph-bold ph-user-plus"></i> NEW_ACCOUNT_SETUP
                    </div>

                    <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight mb-4">
                        Bangun Ruang Kerja <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-cyan-200 to-indigo-300">
                            Pribadi yang Terstruktur.
                        </span>
                    </h2>

                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                        Daftarkan profil pemilik workspace untuk mulai memetakan target karir Data Engineering & Cloud, mencatat materi kajian, dan memantau keseimbangan hidup.
                    </p>

                    {/* Cyber Chisa Card Box */}
                    <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-700/60 shadow-2xl relative overflow-hidden backdrop-blur-md group hover:border-cyan-500/50 transition-all duration-300">
                        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 to-indigo-400" />
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-cyan-500/40 shrink-0 bg-slate-950 shadow-md">
                                <img
                                    src="/chisa.png"
                                    alt="Chisa Assistant"
                                    className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=300&auto=format&fit=crop';
                                    }}
                                />
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-cyan-400 border-2 border-slate-900 rounded-full"></div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                                        CHISA // ONBOARDING
                                    </span>
                                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                                        READY
                                    </span>
                                </div>
                                <p className="text-xs text-slate-200 italic leading-relaxed">
                                    "Lengkapi profil baru untuk mengaktifkan database mandiri dan seluruh modul produktivitas Anda."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-slate-800/80 pt-6 text-xs text-slate-400">
                    <span>© 2026 Safah Workspace. Powered by Laravel 12 & Inertia React.</span>
                    <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors">
                        Sudah punya akun? Masuk <i className="ph-bold ph-arrow-right"></i>
                    </Link>
                </div>
            </div>

            {/* RIGHT SIDE: Register Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16 bg-white min-h-screen">
                <div className="w-full max-w-md space-y-6">
                    
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
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-cyan-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs font-mono font-bold text-slate-900">CHISA.SYS</span>
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-800 font-bold">SETUP</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">Lengkapi data akun baru Anda</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Buat Akun Baru</h2>
                        <p className="text-sm text-slate-500 mt-1">
                            Lengkapi form berikut untuk mendaftarkan akun pemilik workspace.
                        </p>
                    </div>

                    {Object.keys(errors).length > 0 && (
                        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium space-y-1">
                            {Object.values(errors).map((err, idx) => (
                                <p key={idx} className="flex items-center gap-2">
                                    <i className="ph-fill ph-warning-circle text-base text-rose-500"></i> {err}
                                </p>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                required
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                                placeholder="Nama Lengkap Anda"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Alamat Email
                            </label>
                            <input
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                                placeholder="nama@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Password (Min. 6 Karakter)
                            </label>
                            <input
                                type="password"
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Konfirmasi Password
                            </label>
                            <input
                                type="password"
                                required
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 px-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-sm font-bold tracking-wide transition-all duration-200 shadow-floating flex items-center justify-center gap-2 group active:scale-[0.99] mt-2 cursor-pointer disabled:opacity-50"
                        >
                            <span>{processing ? 'Mendaftarkan...' : 'Daftar & Masuk'}</span>
                            <i className="ph-bold ph-arrow-right text-base group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </form>

                    <div className="text-center pt-1">
                        <p className="text-xs text-slate-500">
                            Sudah memiliki akun?{' '}
                            <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-4">
                                Masuk di sini
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

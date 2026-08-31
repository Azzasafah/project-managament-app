import React, { useState, useEffect } from 'react';

export default function SplashScreenModal({
    isOpen,
    userName = 'Safah',
    onClose,
}) {
    const [animeImage, setAnimeImage] = useState(
        'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=700&auto=format&fit=crop'
    );
    const [isLoadingImage, setIsLoadingImage] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isOpen) return;

        // Fetch Anime Greeting Visual
        setIsLoadingImage(true);
        fetch('https://nekos.best/api/v2/waifu')
            .then((res) => res.json())
            .then((data) => {
                if (data?.results?.length > 0) {
                    const img = new Image();
                    img.onload = () => {
                        setAnimeImage(data.results[0].url);
                        setIsLoadingImage(false);
                    };
                    img.src = data.results[0].url;
                } else {
                    setIsLoadingImage(false);
                }
            })
            .catch(() => {
                setIsLoadingImage(false);
            });

        // Progress bar simulation
        setProgress(0);
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 60);

        return () => clearInterval(interval);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-xl animate-fade-in">
            {/* Cyber Background Glow Elements */}
            <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] animate-scale-up max-h-[95vh] flex flex-col">
                
                {/* Top Cyber Window Bar */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-950/80 border-b border-slate-800 text-xs font-mono text-slate-400 shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-slate-200 font-bold tracking-widest text-[11px] uppercase truncate max-w-[220px] sm:max-w-none">
                            SYS_INIT://SAFAH_WORKSPACE
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
                        title="Tutup Splash"
                    >
                        <i className="ph-bold ph-x text-base"></i>
                    </button>
                </div>

                <div className="flex flex-col md:flex-row overflow-y-auto custom-scroll">
                    {/* Left: Anime Visual */}
                    <div className="relative w-full md:w-1/2 h-48 sm:h-64 md:h-auto md:min-h-[360px] bg-slate-950 overflow-hidden group shrink-0">
                        {isLoadingImage && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-20">
                                <i className="ph ph-circle-notch animate-spin text-indigo-400 text-3xl mb-2"></i>
                                <span className="text-[9px] font-mono text-cyan-400 tracking-widest animate-pulse uppercase">
                                    CONNECTING NEURAL LINK...
                                </span>
                            </div>
                        )}
                        <img
                            src={animeImage}
                            alt="Welcome Anime Assistant"
                            className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 ${isLoadingImage ? 'opacity-0' : 'opacity-90'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent md:via-slate-900/40 to-slate-900 pointer-events-none" />
                        <div className="absolute bottom-2 left-2 z-20 px-2 py-0.5 bg-slate-950/80 border border-slate-700/60 rounded text-[8px] font-mono text-cyan-400 tracking-wider">
                            AI_ASSISTANT://ONLINE
                        </div>
                    </div>

                    {/* Right: Greeting & Details */}
                    <div className="w-full md:w-1/2 p-5 sm:p-6 md:p-8 flex flex-col justify-between space-y-5">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400 text-[11px] font-semibold mb-2.5">
                                <span>✨ Selamat Datang Kembali!</span>
                            </div>
                            
                            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2 tracking-tight">
                                Halo, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">{userName || 'Safah'}</span>!
                            </h2>

                            <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                Sistem **Safah Workspace** telah siap digunakan. Seluruh modul produktivitas, jurnal belajar, dan kesehatan telah tersinkronisasi.
                            </p>

                            <div className="mt-3.5 space-y-1.5 border-l-2 border-indigo-500 pl-3">
                                <div className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-2 font-mono">
                                    <i className="ph-fill ph-check-circle text-emerald-400 text-xs sm:text-sm"></i>
                                    <span>Kanban & Portofolio Ready</span>
                                </div>
                                <div className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-2 font-mono">
                                    <i className="ph-fill ph-check-circle text-emerald-400 text-xs sm:text-sm"></i>
                                    <span>Jurnal Data Eng & Cloud Standby</span>
                                </div>
                                <div className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-2 font-mono">
                                    <i className="ph-fill ph-check-circle text-emerald-400 text-xs sm:text-sm"></i>
                                    <span>Sleep & Wellbeing Tracker Aktif</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2 border-t border-slate-800">
                            {/* Loading Bar */}
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-100 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-2xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95 group"
                            >
                                <span>Masuk ke Workspace</span>
                                <i className="ph-bold ph-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

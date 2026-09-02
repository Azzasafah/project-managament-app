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
        }, 50);

        return () => clearInterval(interval);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fade-in font-sans">
            <div className="relative w-full max-w-2xl bg-[#0e0e12] border border-white/15 rounded-3xl overflow-hidden shadow-[0_24px_70px_-15px_rgba(0,0,0,0.9)] animate-scale-up max-h-[95vh] flex flex-col">
                
                {/* Top Cyber Window Bar */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-black/80 border-b border-white/10 text-xs font-mono text-neutral-400 shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-white font-bold tracking-widest text-[11px] uppercase truncate">
                            SYS_INIT://SAFAH_WORKSPACE
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
                        title="Tutup Splash"
                    >
                        <i className="ph-bold ph-x text-base"></i>
                    </button>
                </div>

                <div className="flex flex-col md:flex-row overflow-y-auto custom-scroll">
                    {/* Left: Anime Visual */}
                    <div className="relative w-full md:w-1/2 h-48 sm:h-64 md:h-auto md:min-h-[360px] bg-black overflow-hidden group shrink-0">
                        {isLoadingImage && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20">
                                <i className="ph ph-circle-notch animate-spin text-white text-3xl mb-2"></i>
                                <span className="text-[9px] font-mono text-neutral-400 tracking-widest animate-pulse uppercase">
                                    CONNECTING NEURAL LINK...
                                </span>
                            </div>
                        )}
                        <img
                            src={animeImage}
                            alt="Welcome Anime Assistant"
                            className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0 ${isLoadingImage ? 'opacity-0' : 'opacity-85'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0e0e12] via-transparent to-[#0e0e12] pointer-events-none" />
                        <div className="absolute bottom-2.5 left-2.5 z-20 px-2.5 py-0.5 bg-black/80 border border-white/20 rounded text-[8px] font-mono text-neutral-300 tracking-wider">
                            AI_ASSISTANT://ONLINE
                        </div>
                    </div>

                    {/* Right: Greeting & Details */}
                    <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-neutral-300 text-[10px] font-mono font-bold uppercase mb-3">
                                <span>INITIALIZATION READY</span>
                            </div>
                            
                            <h2 className="font-display text-xl sm:text-2xl font-black text-white leading-tight mb-2 tracking-tight uppercase">
                                Halo, <span className="text-neutral-200">{userName || 'Safah'}</span>!
                            </h2>

                            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                                Sistem **Safah Workspace** telah siap digunakan. Seluruh modul produktivitas, jurnal belajar, dan kesehatan telah tersinkronisasi.
                            </p>

                            <div className="mt-4 space-y-1.5 border-l-2 border-white/20 pl-3">
                                <div className="text-[10px] sm:text-[11px] text-neutral-300 flex items-center gap-2 font-mono">
                                    <i className="ph-bold ph-check text-emerald-400"></i>
                                    <span>Kanban & Portofolio Ready</span>
                                </div>
                                <div className="text-[10px] sm:text-[11px] text-neutral-300 flex items-center gap-2 font-mono">
                                    <i className="ph-bold ph-check text-emerald-400"></i>
                                    <span>Jurnal Data Eng & Cloud Standby</span>
                                </div>
                                <div className="text-[10px] sm:text-[11px] text-neutral-300 flex items-center gap-2 font-mono">
                                    <i className="ph-bold ph-check text-emerald-400"></i>
                                    <span>Sleep & Wellbeing Tracker Aktif</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-3 border-t border-white/10">
                            {/* Loading Bar */}
                            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                <div
                                    className="bg-white h-full transition-all duration-100 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-white hover:bg-neutral-200 text-black rounded-xl text-xs font-mono font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] group"
                            >
                                <span>Buka Workspace Sekarang</span>
                                <i className="ph-bold ph-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

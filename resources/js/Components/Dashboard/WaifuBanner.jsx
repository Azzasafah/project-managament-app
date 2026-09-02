import React from 'react';

export default function WaifuBanner({
    currentTime,
    projectsCount,
    waifuImage,
    isFetchingImage,
    feedId,
    onFetchWaifu,
    onOpenTerminal,
}) {
    const getWaifuGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 11) return 'Sistem Aktif. Selamat Pagi.';
        if (hour < 15) return 'Performa Optimal. Selamat Siang.';
        if (hour < 19) return 'Siklus Sore. Evaluasi Progres.';
        return 'Mode Malam. Prioritaskan Istirahat.';
    };

    return (
        <div className="relative overflow-hidden bg-[#0e0e12] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col md:flex-row border border-white/10 rounded-3xl group font-sans">
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}
            />

            {/* Left Content */}
            <div className="relative z-10 w-full md:w-3/5 p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.04] border border-white/10 rounded-lg text-neutral-300 text-[10px] font-mono font-bold tracking-widest uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> SYS_ONLINE
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400 tracking-wider flex items-center gap-1.5 bg-white/[0.02] px-2.5 py-1 border border-white/[0.08] rounded-lg">
                        <i className="ph-bold ph-clock"></i> <span>{currentTime}</span>
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase bg-white/[0.02] px-2.5 py-1 border border-white/[0.08] rounded-lg">
                        SAFAH_OS
                    </div>
                </div>

                <div className="mb-6 relative">
                    <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 tracking-tight leading-tight uppercase">
                        {getWaifuGreeting()}
                    </h2>
                    <div className="border-l-2 border-white/20 pl-3.5 mt-2.5">
                        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-lg font-sans">
                            Pemindaian log harian selesai. Terdapat{' '}
                            <strong className="text-white bg-white/10 px-2 py-0.5 rounded text-[11px] font-mono tracking-wider border border-white/15">
                                {projectsCount} tasks
                            </strong>{' '}
                            di antrean prioritas. Workspace operasional telah disiapkan.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onOpenTerminal}
                        className="flex-1 sm:flex-none px-5 py-2.5 bg-white hover:bg-neutral-200 text-black font-mono font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                    >
                        <i className="ph-bold ph-kanban text-base"></i> Kelola Kanban
                    </button>
                    <button
                        onClick={onFetchWaifu}
                        title="Ganti Visual Karakter"
                        className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/15 text-neutral-300 rounded-xl border border-white/10 transition-colors cursor-pointer active:scale-[0.98]"
                    >
                        <i className={`ph-bold ph-arrows-clockwise text-base ${isFetchingImage ? 'animate-spin' : ''}`}></i>
                    </button>
                </div>
            </div>

            {/* Right Visual Image */}
            <div className="relative w-full md:w-2/5 h-52 sm:h-64 md:h-auto min-h-[200px] md:min-h-[260px] bg-black border-t md:border-t-0 md:border-l border-white/10 overflow-hidden">
                {isFetchingImage && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/85 backdrop-blur-xs">
                        <i className="ph ph-circle-notch animate-spin text-white text-3xl mb-2"></i>
                        <span className="text-[9px] font-mono text-neutral-300 tracking-widest animate-pulse">
                            CONNECTING NEURAL FEED...
                        </span>
                    </div>
                )}

                <div className={`absolute inset-0 w-full h-full z-10 transition-opacity duration-500 ${isFetchingImage ? 'opacity-0' : 'opacity-100'}`}>
                    <img
                        src={waifuImage}
                        alt="Assistant Link"
                        className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-transparent opacity-80 z-10 pointer-events-none" />
                    <div className="absolute top-3 right-3 z-20 text-[8px] font-mono text-white/80 bg-black/70 px-2 py-0.5 rounded border border-white/20 text-right tracking-widest uppercase">
                        FEED_ID: {feedId}
                    </div>
                </div>
            </div>
        </div>
    );
}

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
        <div className="relative overflow-hidden bg-slate-900 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col md:flex-row border border-slate-700/60 rounded-2xl md:rounded-3xl group">
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}
            />

            {/* Left Content */}
            <div className="relative z-10 w-full md:w-3/5 p-5 sm:p-6 md:p-8 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-400 text-[10px] font-mono font-bold tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> SYS_ONLINE
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 tracking-wider flex items-center gap-1.5 bg-slate-800/60 px-2 py-1 border border-slate-700 rounded-lg">
                        <i className="ph-bold ph-clock"></i> <span>{currentTime}</span>
                    </div>
                    <div className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase bg-cyan-950/40 px-2 py-1 border border-cyan-800/40 rounded-lg">
                        SAFAH_OS
                    </div>
                </div>

                <div className="mb-5 sm:mb-7 relative">
                    <h2 className="relative z-10 text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 tracking-tight leading-tight">
                        {getWaifuGreeting()}
                    </h2>
                    <div className="relative z-10 border-l-2 border-indigo-500 pl-3 sm:pl-4 mt-2.5 sm:mt-3">
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
                            Pemindaian log harian selesai. Terdapat{' '}
                            <strong className="text-indigo-300 bg-indigo-900/40 px-1.5 py-0.5 rounded uppercase text-[11px] font-mono tracking-wider border border-indigo-800/50">
                                {projectsCount} tasks
                            </strong>{' '}
                            di antrean prioritas. Workspace operasional telah disiapkan.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                    <button
                        onClick={onOpenTerminal}
                        className="flex-1 sm:flex-none px-5 py-2.5 bg-white hover:bg-indigo-600 hover:text-white text-slate-900 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                        <i className="ph-bold ph-kanban"></i> Kelola Kanban
                    </button>
                    <button
                        onClick={onFetchWaifu}
                        title="Ganti Visual Karakter"
                        className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-400 rounded-xl border border-slate-700 transition-colors cursor-pointer active:scale-95"
                    >
                        <i className={`ph-bold ph-arrows-clockwise text-lg ${isFetchingImage ? 'animate-spin' : ''}`}></i>
                    </button>
                </div>
            </div>

            {/* Right Visual Image */}
            <div className="relative w-full md:w-2/5 h-52 sm:h-64 md:h-auto min-h-[200px] md:min-h-[260px] bg-slate-800 border-t md:border-t-0 md:border-l border-indigo-500/30 overflow-hidden">
                {isFetchingImage && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-900/85 backdrop-blur-xs">
                        <i className="ph ph-circle-notch animate-spin text-cyan-400 text-3xl mb-2"></i>
                        <span className="text-[9px] font-mono text-cyan-400 tracking-widest animate-pulse">
                            CONNECTING NEURAL FEED...
                        </span>
                    </div>
                )}

                <div className={`absolute inset-0 w-full h-full z-10 transition-opacity duration-500 ${isFetchingImage ? 'opacity-0' : 'opacity-100'}`}>
                    <div
                        className="hidden md:block absolute top-0 bottom-0 -left-16 w-32 bg-slate-900 z-20"
                        style={{ clipPath: 'polygon(50% 0, 100% 0, 50% 100%, 0% 100%)' }}
                    />
                    <img
                        src={waifuImage}
                        alt="Assistant Link"
                        className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90 z-10 pointer-events-none" />
                    <div className="absolute top-3 right-3 z-20 text-[8px] font-mono text-white/60 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-700 text-right tracking-widest uppercase">
                        FEED_ID: {feedId}
                    </div>
                </div>
            </div>
        </div>
    );
}

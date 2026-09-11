import React, { useState, useEffect, useRef } from 'react';

export default function SplashScreenModal({
    isOpen,
    userName = 'Safah',
    onClose,
}) {
    const [progress, setProgress] = useState(0);
    const [loadingStage, setLoadingStage] = useState('Memulai Sistem...');
    const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [dontShowToday, setDontShowToday] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const audioRef = useRef(null);

    // Inspiring welcome quotes
    const welcomeQuotes = [
        {
            jp: 'お帰りなさいませ、ご主人様！',
            romaji: 'Okaerinasaimase, Goshujin-sama!',
            text: 'Selamat datang kembali di Safah Workspace! Siap menaklukkan target Data Engineering hari ini?',
            badge: 'DAILY BOOST',
        },
        {
            jp: '継続は力なり。',
            romaji: 'Keizoku wa chikara nari.',
            text: 'Konsistensi adalah kunci kekuatan. Satu query presisi dan satu commit hari ini mendekatkanmu ke impian besar.',
            badge: 'FOCUS & DISCIPLINE',
        },
        {
            jp: 'データこそが未来を動かす力。',
            romaji: 'Data koso ga mirai o ugokasu chikara.',
            text: 'Pipeline data, arsitektur lakehouse, dan sistem realtime Anda siap dieksekusi dengan standar enterprise.',
            badge: 'SYSTEM ARCHITECT',
        },
        {
            jp: '心身の調和を大切に。',
            romaji: 'Shinshin no chouwa o taisetsu ni.',
            text: 'Fokus pada proses belajar, jaga sholat 5 waktu di awal waktu, dan terapkan Aturan Emas Anti-Burnout.',
            badge: 'SPIRITUAL & BALANCE',
        },
    ];

    // Play greeting sound once opened if soundEnabled
    useEffect(() => {
        if (isOpen && soundEnabled) {
            try {
                const hour = new Date().getHours();
                let soundUrl = '/sounds/001_No7%20Morning.wav';
                if (hour >= 20 || hour < 5) {
                    soundUrl = '/sounds/002_No.7%20Night.wav';
                } else if (hour >= 12) {
                    soundUrl = '/sounds/003_No.7%20Date.wav';
                }
                const audio = new Audio(soundUrl);
                audio.volume = 0.5;
                audio.play().catch(() => {});
            } catch (e) {}
        }
    }, [isOpen]);

    // Quote rotation
    useEffect(() => {
        if (!isOpen) return;
        const quoteInterval = setInterval(() => {
            setActiveQuoteIndex((prev) => (prev + 1) % welcomeQuotes.length);
        }, 4000);
        return () => clearInterval(quoteInterval);
    }, [isOpen]);

    // Progress bar and status messages
    useEffect(() => {
        if (!isOpen) return;

        setProgress(0);
        setLoadingStage('Menginisialisasi PWA Shell & Service Worker...');

        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + 3;
                if (next < 30) {
                    setLoadingStage('Menginisialisasi PWA Shell & Cache Offline...');
                } else if (next < 65) {
                    setLoadingStage('Sinkronisasi Kurikulum 36 Sesi & Portofolio...');
                } else if (next < 90) {
                    setLoadingStage('Menghubungkan Jadwal Sholat & Anti-Burnout Engine...');
                } else if (next < 100) {
                    setLoadingStage('Chisa Neural Link: Online & Siap Digunakan!');
                } else {
                    clearInterval(interval);
                    setLoadingStage('Sistem 100% Siap. Selamat Berkarya!');
                    return 100;
                }
                return next;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [isOpen]);

    const handleCloseModal = () => {
        if (dontShowToday && typeof window !== 'undefined') {
            const todayKey = new Date().toISOString().split('T')[0];
            localStorage.setItem('safah_splash_dont_show_' + todayKey, 'true');
        }
        onClose();
    };

    if (!isOpen) return null;

    const currentQuote = welcomeQuotes[activeQuoteIndex];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl animate-fade-in font-sans select-none overflow-y-auto">
            {/* Ambient Lighting Orbs */}
            <div className="fixed -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />

            <div
                className="relative w-full max-w-2xl bg-[#0d0d12] border border-white/20 rounded-3xl overflow-hidden shadow-[0_30px_90px_-15px_rgba(0,0,0,0.95)] animate-scale-up text-white my-auto flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Cyber Header Bar */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-black/70 border-b border-white/10 text-xs font-mono text-neutral-400 shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-white font-bold tracking-widest text-[11px] uppercase truncate">
                            SAFAH_WORKSPACE_OS://PWA_V2.5
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className="text-neutral-400 hover:text-white transition-colors p-1 text-sm rounded hover:bg-white/10 cursor-pointer"
                            title={soundEnabled ? 'Suara Aktif' : 'Suara Mati'}
                        >
                            <i className={`ph-bold ${soundEnabled ? 'ph-speaker-high text-emerald-400' : 'ph-speaker-slash text-neutral-500'}`}></i>
                        </button>
                        <button
                            onClick={handleCloseModal}
                            className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
                            title="Tutup Splash"
                        >
                            <i className="ph-bold ph-x text-base"></i>
                        </button>
                    </div>
                </div>

                {/* Main Content: Split Grid on Desktop, Stack on Mobile */}
                <div className="flex flex-col md:flex-row overflow-hidden">
                    {/* Left Column: Chisa Hero Presentation */}
                    <div className="relative w-full md:w-5/12 bg-gradient-to-b from-[#151520] to-[#0d0d12] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 overflow-hidden group shrink-0">
                        {/* Scanning Line Cyber Animation */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                            <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scanline" />
                        </div>

                        {/* Subtle Grid Background */}
                        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

                        {/* Chisa Avatar Frame */}
                        <div className="relative z-10 w-44 h-48 sm:w-48 sm:h-52 md:w-52 md:h-56 flex items-center justify-center">
                            {/* Ambient Halo behind Chisa */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-emerald-400/30 rounded-full blur-2xl animate-pulse-glow" />

                            <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/30 shadow-2xl bg-black/60 backdrop-blur-md p-1 group-hover:border-white/50 transition-all">
                                <picture>
                                    <source srcSet="/chisa.webp" type="image/webp" />
                                    <img
                                        src="/chisa.png"
                                        alt="Chisa Assistant"
                                        onLoad={() => setImageLoaded(true)}
                                        className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700 animate-float-soft"
                                    />
                                </picture>

                                {/* Corner Tech Marks */}
                                <span className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
                                <span className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
                                <span className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
                                <span className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Assistant Tag */}
                        <div className="relative z-10 mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 border border-white/20 text-[10px] font-mono tracking-wider text-neutral-300 shadow-md">
                            <i className="ph-fill ph-sparkle text-amber-400"></i>
                            <span>CHISA • AI ASSISTANT</span>
                        </div>
                    </div>

                    {/* Right Column: Greetings, Quotes & Progress */}
                    <div className="w-full md:w-7/12 p-6 sm:p-7 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                            {/* PWA Badge & Greeting */}
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[9px] font-mono font-bold uppercase tracking-wider">
                                    ANDROID PWA READY
                                </span>
                                <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[9px] font-mono font-bold uppercase tracking-wider">
                                    {currentQuote.badge}
                                </span>
                            </div>

                            <div>
                                <p className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                                    <span>{currentQuote.jp}</span>
                                    <span className="text-[10px] text-neutral-500">({currentQuote.romaji})</span>
                                </p>
                                <h2 className="font-display font-black text-xl sm:text-2xl text-white leading-tight mt-0.5 tracking-tight uppercase">
                                    Halo, <span className="bg-gradient-to-r from-white via-indigo-200 to-emerald-300 bg-clip-text text-transparent">{userName || 'Safah'}</span>! 👋
                                </h2>
                            </div>

                            {/* Quote Box with Smooth Fade */}
                            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 relative overflow-hidden transition-all duration-500">
                                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                                    {currentQuote.text}
                                </p>
                            </div>

                            {/* Feature Readiness Checklist */}
                            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px] text-neutral-300">
                                <div className="flex items-center gap-1.5 bg-white/[0.02] p-1.5 rounded-lg border border-white/5">
                                    <i className="ph-bold ph-check-circle text-emerald-400 text-xs"></i>
                                    <span className="truncate">Kurikulum Sesi 11 Standby</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/[0.02] p-1.5 rounded-lg border border-white/5">
                                    <i className="ph-bold ph-check-circle text-emerald-400 text-xs"></i>
                                    <span className="truncate">5 Portofolio Milestones</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/[0.02] p-1.5 rounded-lg border border-white/5">
                                    <i className="ph-bold ph-check-circle text-emerald-400 text-xs"></i>
                                    <span className="truncate">Jadwal Sholat Kemenag</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/[0.02] p-1.5 rounded-lg border border-white/5">
                                    <i className="ph-bold ph-check-circle text-emerald-400 text-xs"></i>
                                    <span className="truncate">Offline Cache ServiceWorker</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Actions & Loading Progress */}
                        <div className="space-y-3 pt-2 border-t border-white/10">
                            {/* Loading Bar & Status */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-[10px] font-mono">
                                    <span className="text-neutral-400 truncate max-w-[80%]">
                                        {loadingStage}
                                    </span>
                                    <span className="text-white font-bold">{progress}%</span>
                                </div>
                                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden p-0.5">
                                    <div
                                        className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400 rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Launch Button */}
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-white via-neutral-100 to-neutral-200 hover:from-neutral-200 hover:to-neutral-300 text-black rounded-2xl text-xs font-mono font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] group"
                                >
                                    <span>Buka Workspace Sekarang</span>
                                    <i className="ph-bold ph-arrow-right text-sm transform group-hover:translate-x-1 transition-transform"></i>
                                </button>
                            </div>

                            {/* Don't show again toggle */}
                            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-0.5">
                                <label className="flex items-center gap-1.5 cursor-pointer hover:text-neutral-200 select-none">
                                    <input
                                        type="checkbox"
                                        checked={dontShowToday}
                                        onChange={(e) => setDontShowToday(e.target.checked)}
                                        className="rounded border-white/20 bg-white/10 text-emerald-500 focus:ring-0 cursor-pointer w-3 h-3"
                                    />
                                    <span>Jangan tampilkan lagi hari ini</span>
                                </label>
                                <span className="text-[9px] text-neutral-500">
                                    Tekan ESC / Silang untuk tutup
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

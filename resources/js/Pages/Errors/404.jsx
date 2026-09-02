import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function NotFound() {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('portfolio_theme') || 'light';
        }
        return 'light';
    });

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        if (typeof window !== 'undefined') {
            localStorage.setItem('portfolio_theme', nextTheme);
        }
    };

    // Typewriter Phrases Loop (404 Lost in Space / Manga Cyber Theme)
    const phrases = [
        '404: Sinyal Terputus // Halaman Tidak Ditemukan',
        'Terjebak di Dimensi Hampa? Jalur Utama Masih Terbuka',
        'Query Executed: 0 Rows Returned at This Coordinates',
        'Sistem Tetap Stabil: Silakan Kembali ke Pangkalan',
    ];

    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(60);

    useEffect(() => {
        const fullText = phrases[currentPhraseIndex];

        const timer = setTimeout(() => {
            if (!isDeleting) {
                const nextText = fullText.substring(0, currentText.length + 1);
                setCurrentText(nextText);
                setTypingSpeed(45);

                if (nextText === fullText) {
                    setTypingSpeed(2500);
                    setIsDeleting(true);
                }
            } else {
                const nextText = fullText.substring(0, currentText.length - 1);
                setCurrentText(nextText);
                setTypingSpeed(20);

                if (nextText === '') {
                    setIsDeleting(false);
                    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
                    setTypingSpeed(350);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentPhraseIndex, typingSpeed]);

    const isDark = theme === 'dark';

    return (
        <div
            className={`min-h-screen font-sans relative overflow-x-hidden flex flex-col justify-between transition-colors duration-500 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black ${
                isDark
                    ? 'bg-[#09090b] text-[#f4f4f5]'
                    : 'bg-[#fafafa] text-[#18181b]'
            }`}
        >
            <Head title="404 — Halaman Tidak Ditemukan | Safah" />

            {/* Subtle Manga Dot Screen Matrix Background */}
            <div
                className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${
                    isDark ? 'opacity-[0.03]' : 'opacity-[0.035]'
                }`}
                style={{
                    backgroundImage: isDark
                        ? 'radial-gradient(#ffffff 1px, transparent 1px)'
                        : 'radial-gradient(#000000 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                }}
            />

            {/* Ambient Lighting */}
            <div
                className={`fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[160px] pointer-events-none z-0 transition-colors duration-700 ${
                    isDark ? 'bg-white/[0.015]' : 'bg-black/[0.015]'
                }`}
            />

            {/* Top Navigation Bar */}
            <header
                className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 sm:px-8 lg:px-16 h-20 flex items-center justify-between transition-colors duration-300 ${
                    isDark
                        ? 'bg-[#09090b]/85 border-white/[0.08]'
                        : 'bg-[#fafafa]/85 border-black/[0.08]'
                }`}
            >
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-xl transition-all duration-300 ${
                                isDark
                                    ? 'bg-white text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_20px_rgba(255,255,255,0.15)]'
                                    : 'bg-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_14px_rgba(0,0,0,0.12)]'
                            }`}
                        >
                            <span>S</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`font-display font-extrabold text-sm tracking-tight uppercase ${
                                        isDark ? 'text-white' : 'text-black'
                                    }`}
                                >
                                    M. Hafizh Azzasafah
                                </span>
                                <span
                                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                                        isDark
                                            ? 'bg-white/10 text-white/90 border-white/20'
                                            : 'bg-black/5 text-black/90 border-black/20'
                                    }`}
                                >
                                    “Safah”
                                </span>
                            </div>
                            <p
                                className={`text-[10px] font-mono tracking-[0.18em] uppercase ${
                                    isDark ? 'text-neutral-400' : 'text-neutral-500'
                                }`}
                            >
                                SYSTEM // 404_PAGE
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    {/* Theme Mode Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                            isDark
                                ? 'bg-white/5 hover:bg-white/10 text-neutral-200 border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                                : 'bg-black/5 hover:bg-black/10 text-neutral-800 border-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]'
                        }`}
                        title={isDark ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
                    >
                        {isDark ? (
                            <>
                                <i className="ph-bold ph-sun text-amber-300 text-sm"></i>
                                <span className="hidden sm:inline text-[11px]">Light</span>
                            </>
                        ) : (
                            <>
                                <i className="ph-bold ph-moon-stars text-indigo-600 text-sm"></i>
                                <span className="hidden sm:inline text-[11px]">Dark</span>
                            </>
                        )}
                    </button>

                    <Link
                        href="/"
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-md flex items-center gap-1.5 active:scale-95 ${
                            isDark
                                ? 'bg-white text-black hover:bg-neutral-200'
                                : 'bg-black text-white hover:bg-neutral-800'
                        }`}
                    >
                        <i className="ph-bold ph-arrow-left"></i> Portofolio
                    </Link>
                </div>
            </header>

            {/* Main 404 Content Section */}
            <main className="relative z-10 py-12 md:py-20 px-4 sm:px-8 lg:px-16 max-w-5xl mx-auto flex-1 flex flex-col justify-center">
                <div className="space-y-8">
                    
                    {/* Top Status & Kanji Badge */}
                    <div
                        className={`flex flex-wrap items-center justify-between gap-4 border-b pb-5 transition-colors duration-500 ${
                            isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                        }`}
                    >
                        <div
                            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono ${
                                isDark
                                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                                    : 'bg-rose-50 border-rose-200 text-rose-700 shadow-xs'
                            }`}
                        >
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                            <span className="tracking-wide font-bold">STATUS://404_PAGE_NOT_FOUND</span>
                        </div>
                        <div
                            className={`text-right text-[11px] font-mono tracking-[0.2em] font-medium ${
                                isDark ? 'text-neutral-400' : 'text-neutral-500'
                            }`}
                        >
                            未検出 &bull; 迷子 &bull; リルート
                        </div>
                    </div>

                    {/* Split Grid: Left Text + Right Love Artwork Frame */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        
                        {/* Left Content (7 cols on desktop) */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="space-y-3">
                                <div className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none font-display opacity-90">
                                    404
                                </div>
                                <h1
                                    className={`font-display text-2xl sm:text-4xl font-black tracking-tight uppercase leading-tight ${
                                        isDark ? 'text-white' : 'text-black'
                                    }`}
                                    style={{ textWrap: 'balance' }}
                                >
                                    Sinyal Tersesat di Luar Radar
                                </h1>

                                {/* Dynamic Typing Effect 404 Headline */}
                                <div
                                    className={`text-xs sm:text-base font-mono font-medium min-h-[2.2rem] flex items-center ${
                                        isDark ? 'text-neutral-300' : 'text-neutral-700'
                                    }`}
                                >
                                    <span className={`mr-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>[</span>
                                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                                        {currentText}
                                    </span>
                                    <span
                                        className={`w-2 sm:w-2.5 h-4 sm:h-5 ml-1 inline-block animate-pulse ${
                                            isDark
                                                ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                                                : 'bg-black shadow-[0_0_8px_rgba(0,0,0,0.4)]'
                                        }`}
                                    />
                                    <span className={`ml-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>]</span>
                                </div>
                            </div>

                            {/* Free Thought / Thoughtful Custom Paragraphs */}
                            <div
                                className={`p-6 sm:p-7 rounded-2xl border relative overflow-hidden backdrop-blur-md transition-all duration-300 space-y-3 ${
                                    isDark
                                        ? 'bg-[#111115]/70 border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
                                        : 'bg-white/80 border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.03)]'
                                }`}
                            >
                                <div
                                    className={`absolute -right-6 -bottom-6 font-black text-8xl select-none pointer-events-none ${
                                        isDark ? 'text-white/[0.02]' : 'text-black/[0.02]'
                                    }`}
                                >
                                    愛
                                </div>
                                <p
                                    className={`text-xs sm:text-sm leading-relaxed font-sans ${
                                        isDark ? 'text-neutral-300' : 'text-neutral-700'
                                    }`}
                                >
                                    “Kadang kita gak sengaja melangkah ke rute yang belum dibangun atau tautan yang sudah bertransformasi. Tapi dalam rekayasa data ataupun kehidupan, jalan buntu hanyalah pengingat untuk mengarahkan kembali kompas ke tujuan utama.”
                                </p>
                                <p
                                    className={`text-xs sm:text-[13px] leading-relaxed font-mono ${
                                        isDark ? 'text-neutral-400' : 'text-neutral-600'
                                    }`}
                                >
                                    Tenang aja bro, seluruh data pipeline, karya portofolio, dan ruang kerja privat tetap beroperasi secara optimal. Silakan kembali ke beranda portofolio atau login ke workspace!
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-3 pt-1">
                                <Link
                                    href="/"
                                    className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-md flex items-center gap-2 active:scale-[0.98] ${
                                        isDark
                                            ? 'bg-white text-black hover:bg-neutral-200'
                                            : 'bg-black text-white hover:bg-neutral-800'
                                    }`}
                                >
                                    <i className="ph-bold ph-house text-sm"></i>
                                    <span>Kembali ke Portofolio</span>
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className={`px-5 py-2.5 border rounded-xl text-xs font-mono font-bold transition-colors flex items-center gap-2 active:scale-[0.98] ${
                                        isDark
                                            ? 'bg-white/5 hover:bg-white/15 text-white border-white/15'
                                            : 'bg-black/5 hover:bg-black/15 text-black border-black/15'
                                    }`}
                                >
                                    <i className="ph-bold ph-terminal-window text-base"></i>
                                    <span>Akses Workspace</span>
                                </Link>
                            </div>
                        </div>

                        {/* Right Love Artwork Character Frame (5 cols on desktop) */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div
                                className={`relative w-full max-w-[280px] sm:max-w-[310px] rounded-3xl border p-3.5 shadow-2xl group transition-all duration-500 overflow-hidden ${
                                    isDark
                                        ? 'bg-[#0e0e12] border-white/15 hover:border-white/35 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
                                        : 'bg-white border-black/15 hover:border-black/35 shadow-[0_12px_36px_rgba(0,0,0,0.08)]'
                                }`}
                            >
                                {/* Top Tech Bar */}
                                <div
                                    className={`flex items-center justify-between px-2.5 py-1.5 mb-2.5 rounded-xl border text-[9px] font-mono ${
                                        isDark
                                            ? 'bg-white/5 border-white/10 text-neutral-400'
                                            : 'bg-black/5 border-black/10 text-neutral-600'
                                    }`}
                                >
                                    <span
                                        className={`flex items-center gap-1.5 font-bold ${
                                            isDark ? 'text-white' : 'text-black'
                                        }`}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span> LOVE.SYS
                                    </span>
                                    <span className="font-semibold tracking-wider">愛 // COMPANION</span>
                                </div>

                                {/* Love.png Image Frame with Grayscale-to-Color Aesthetic */}
                                <div
                                    className={`relative rounded-2xl overflow-hidden aspect-[4/5] border ${
                                        isDark ? 'bg-[#050507] border-white/10' : 'bg-[#f0f0f2] border-black/10'
                                    }`}
                                >
                                    <picture>
                                        <source srcSet="/love.webp" type="image/webp" />
                                        <img
                                            src="/love.png"
                                            alt="Love Character Art"
                                            width="300"
                                            height="375"
                                            loading="eager"
                                            decoding="async"
                                            className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                            onError={(e) => {
                                                e.target.src = '/chisa.png';
                                            }}
                                        />
                                    </picture>
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-70 pointer-events-none ${
                                            isDark ? 'from-[#0e0e12]' : 'from-white'
                                        }`}
                                    />

                                    {/* Cyber Badges Overlay */}
                                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                                        <span
                                            className={`text-[8px] font-mono px-2 py-0.5 rounded border backdrop-blur-xs ${
                                                isDark
                                                    ? 'text-neutral-300 bg-black/70 border-white/20'
                                                    : 'text-neutral-800 bg-white/85 border-black/20 font-bold'
                                            }`}
                                        >
                                            RE_ROUTING_AI
                                        </span>
                                        <span
                                            className={`text-[8px] font-mono px-2 py-0.5 rounded border ${
                                                isDark
                                                    ? 'text-rose-400 bg-black/70 border-rose-500/30'
                                                    : 'text-rose-700 bg-rose-50 border-rose-300 font-bold'
                                            }`}
                                        >
                                            HEARTBEAT 100%
                                        </span>
                                    </div>
                                </div>

                                {/* Bottom Tech Caption */}
                                <div
                                    className={`mt-2.5 px-1 flex items-center justify-between text-[8px] font-mono uppercase tracking-[0.15em] ${
                                        isDark ? 'text-neutral-400' : 'text-neutral-500'
                                    }`}
                                >
                                    <span>LOST // RESCUE_SYS</span>
                                    <span>V2.6.4</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer
                className={`border-t py-8 px-4 sm:px-8 lg:px-16 text-xs font-mono transition-colors duration-500 ${
                    isDark
                        ? 'border-white/10 bg-[#070709] text-neutral-400'
                        : 'border-black/10 bg-[#f4f4f6] text-neutral-600'
                }`}
            >
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <p className={`font-display font-bold tracking-wide ${isDark ? 'text-white' : 'text-black'}`}>
                            MUHAMMAD HAFIZH AZZASAFAH (SAFAH) &copy; 2026
                        </p>
                    </div>

                    <div className={`flex items-center gap-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        <Link
                            href="/"
                            className={`hover:underline font-bold ${
                                isDark ? 'text-white' : 'text-black'
                            }`}
                        >
                            &larr; Beranda Portofolio
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function PortfolioIndex({ projects = [], user }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('portfolio_theme') || 'light';
        }
        return 'light';
    });

    const [activeFilter, setActiveFilter] = useState('ALL');
    const [copiedEmail, setCopiedEmail] = useState(false);

    const email = 'muhammad.hafizh2016@gmail.com';

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        if (typeof window !== 'undefined') {
            localStorage.setItem('portfolio_theme', nextTheme);
        }
    };

    const copyEmailToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2500);
    };

    // Typewriter Phrases Loop (Data Engineer Enthusiast & Learner)
    const phrases = [
        'Data Engineering Enthusiast',
        'Exploring Pipelines, Cloud & Modern Web',
        'Continuous Learner & Problem Solver',
        'Building Projects & Documenting the Journey',
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
                setTypingSpeed(50);

                if (nextText === fullText) {
                    setTypingSpeed(2500); // Pause before backspacing
                    setIsDeleting(true);
                }
            } else {
                const nextText = fullText.substring(0, currentText.length - 1);
                setCurrentText(nextText);
                setTypingSpeed(22);

                if (nextText === '') {
                    setIsDeleting(false);
                    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
                    setTypingSpeed(400); // Pause before typing next phrase
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentPhraseIndex, typingSpeed]);

    // Dynamically derive unique tags from the Kanban projects
    const availableTags = [
        'ALL',
        ...Array.from(new Set(projects.map((p) => p.tag).filter(Boolean))),
    ];

    // Filter projects dynamically based on selected tag
    const filteredProjects = projects.filter((proj) => {
        if (activeFilter === 'ALL') return true;
        return proj.tag === activeFilter;
    });

    const isDark = theme === 'dark';

    return (
        <div
            className={`min-h-screen font-sans relative overflow-x-hidden transition-colors duration-500 ${isDark
                ? 'bg-[#08080a] text-[#ededed] selection:bg-white selection:text-black'
                : 'bg-[#f8f9fa] text-[#18181b] selection:bg-black selection:text-white'
                }`}
        >
            <Head>
                <title>Safah — Portfolio | Data Engineering & Cloud</title>
                <meta
                    name="description"
                    content="Portofolio resmi Muhammad Hafizh Azzasafah (Safah) - Data Engineering, Cloud Infrastructure, ETL Pipelines, dan Modern Web Development."
                />
                <meta
                    name="keywords"
                    content="Muhammad Hafizh Azzasafah, Safah, Data Engineer Indonesia, Cloud Infrastructure, PySpark, Airflow, Delta Lake, Terraform, AWS, Laravel, React"
                />
                <meta name="author" content="Muhammad Hafizh Azzasafah" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph / Facebook / WhatsApp */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Safah — Portfolio | Data Engineering & Cloud" />
                <meta
                    property="og:description"
                    content="Eksplorasi portofolio data pipeline, cloud automation, dan sistem backend oleh Muhammad Hafizh Azzasafah (Safah)."
                />
                <meta property="og:image" content="/chisa.png" />

                {/* Twitter / X */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Safah — Portfolio | Data Engineering & Cloud" />
                <meta
                    name="twitter:description"
                    content="Eksplorasi portofolio data pipeline, cloud automation, dan sistem backend oleh Muhammad Hafizh Azzasafah (Safah)."
                />
                <meta name="twitter:image" content="/chisa.png" />

                {/* Structured Data (Schema.org JSON-LD) */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Person',
                        name: 'Muhammad Hafizh Azzasafah',
                        alternateName: 'Safah',
                        url: 'https://github.com/Azzasafah',
                        jobTitle: 'Data Engineering & Cloud Enthusiast',
                        sameAs: [
                            'https://github.com/Azzasafah',
                            'mailto:muhammad.hafizh2016@gmail.com',
                        ],
                        knowsAbout: [
                            'Data Engineering',
                            'Apache Airflow',
                            'PySpark',
                            'Delta Lake',
                            'AWS',
                            'Terraform',
                            'Laravel',
                            'React',
                        ],
                    })}
                </script>
            </Head>

            {/* Subtle Manga Dot Screen Matrix Background */}
            <div
                className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${isDark ? 'opacity-[0.035]' : 'opacity-[0.04]'
                    }`}
                style={{
                    backgroundImage: isDark
                        ? 'radial-gradient(#ffffff 1px, transparent 1px)'
                        : 'radial-gradient(#000000 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />

            {/* Background Ambient Monochrome Gradients */}
            <div
                className={`fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none z-0 transition-colors duration-700 ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
                    }`}
            />
            <div
                className={`fixed bottom-0 right-0 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none z-0 transition-colors duration-700 ${isDark ? 'bg-white/[0.015]' : 'bg-black/[0.015]'
                    }`}
            />

            {/* Top Navigation Bar */}
            <header
                className={`sticky top-0 z-40 backdrop-blur-xl border-b px-4 sm:px-8 lg:px-16 h-20 flex items-center justify-between transition-colors duration-500 ${isDark
                    ? 'bg-[#08080a]/90 border-white/[0.08]'
                    : 'bg-[#f8f9fa]/90 border-black/[0.08]'
                    }`}
            >
                <div className="flex items-center gap-3">
                    <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl transition-all duration-300 ${isDark
                            ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                            : 'bg-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]'
                            }`}
                    >
                        <span>S</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span
                                className={`font-extrabold text-sm tracking-tight uppercase ${isDark ? 'text-white' : 'text-black'
                                    }`}
                            >
                                M. Hafizh Azzasafah
                            </span>
                            <span
                                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${isDark
                                    ? 'bg-white/10 text-white/90 border-white/20'
                                    : 'bg-black/5 text-black/90 border-black/20'
                                    }`}
                            >
                                “Safah”
                            </span>
                        </div>
                        <p
                            className={`text-[10px] font-mono tracking-widest uppercase ${isDark ? 'text-neutral-400' : 'text-neutral-500'
                                }`}
                        >
                            PORTFOLIO // LEARNING_LOG
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                    {/* Theme Mode Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${isDark
                            ? 'bg-white/5 hover:bg-white/10 text-neutral-200 border-white/10'
                            : 'bg-black/5 hover:bg-black/10 text-neutral-800 border-black/10'
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

                    <button
                        onClick={copyEmailToClipboard}
                        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-colors cursor-pointer ${isDark
                            ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                            : 'bg-black/5 hover:bg-black/10 text-neutral-700 border-black/10'
                            }`}
                    >
                        <i className="ph-bold ph-envelope"></i>
                        <span>{copiedEmail ? 'Email Copied!' : 'Contact'}</span>
                    </button>

                    <Link
                        href="/dashboard"
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-md flex items-center gap-1.5 active:scale-95 ${isDark
                            ? 'bg-white text-black hover:bg-neutral-200'
                            : 'bg-black text-white hover:bg-neutral-800'
                            }`}
                    >
                        <i className="ph-bold ph-terminal-window"></i> Workspace
                    </Link>
                </div>
            </header>

            {/* Hero Section with Split Layout & Chisa Artwork Frame */}
            <section className="relative z-10 pt-12 md:pt-20 pb-12 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto">
                <div className="space-y-8">

                    {/* Top Status & Kanji Badge */}
                    <div
                        className={`flex flex-wrap items-center justify-between gap-4 border-b pb-5 transition-colors duration-500 ${isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                            }`}
                    >
                        <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono ${isDark
                                ? 'bg-white/5 border-white/10 text-white'
                                : 'bg-black/5 border-black/10 text-black'
                                }`}
                        >
                            <span
                                className={`w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-white' : 'bg-black'
                                    }`}
                            />
                            <span className="tracking-wider">SYS://CONTINUOUS_LEARNING</span>
                        </div>
                        <div
                            className={`text-right text-[11px] font-mono tracking-widest ${isDark ? 'text-neutral-400' : 'text-neutral-600'
                                }`}
                        >
                            学び &bull; 成長 &bull; 実践
                        </div>
                    </div>

                    {/* Split Grid: Left Text + Right Chisa Anime Card */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                        {/* Left Content (8 cols on desktop) */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="space-y-3">
                                <h1
                                    className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[1.05] ${isDark ? 'text-white' : 'text-black'
                                        }`}
                                >
                                    Muhammad Hafizh <br />
                                    <span
                                        className={`text-transparent bg-clip-text ${isDark
                                            ? 'bg-gradient-to-r from-white via-neutral-300 to-neutral-400'
                                            : 'bg-gradient-to-r from-black via-neutral-800 to-neutral-600'
                                            }`}
                                    >
                                        Azzasafah
                                    </span>
                                    <span
                                        className={`inline-block ml-3 text-lg sm:text-2xl lg:text-3xl font-mono font-normal lowercase tracking-normal align-middle ${isDark ? 'text-neutral-400' : 'text-neutral-500'
                                            }`}
                                    >
                                        (~safah)
                                    </span>
                                </h1>

                                {/* Dynamic Typing Effect Headline */}
                                <div
                                    className={`text-sm sm:text-lg font-mono font-medium min-h-[2.5rem] flex items-center ${isDark ? 'text-neutral-300' : 'text-neutral-700'
                                        }`}
                                >
                                    <span
                                        className={`mr-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'
                                            }`}
                                    >
                                        [
                                    </span>
                                    <span
                                        className={`font-semibold ${isDark ? 'text-white' : 'text-black'
                                            }`}
                                    >
                                        {currentText}
                                    </span>
                                    <span
                                        className={`w-2 sm:w-2.5 h-4 sm:h-5 ml-1 inline-block animate-pulse ${isDark
                                            ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                                            : 'bg-black shadow-[0_0_8px_rgba(0,0,0,0.4)]'
                                            }`}
                                    />
                                    <span
                                        className={`ml-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'
                                            }`}
                                    >
                                        ]
                                    </span>
                                </div>
                            </div>

                            {/* Manifesto / Kata-kata Personal & Filosofi */}
                            <div
                                className={`p-6 sm:p-7 rounded-3xl border relative overflow-hidden backdrop-blur-md transition-all duration-500 ${isDark
                                    ? 'bg-white/[0.03] border-white/10'
                                    : 'bg-black/[0.03] border-black/10 shadow-xs'
                                    }`}
                            >
                                <div
                                    className={`absolute -right-6 -bottom-6 font-black text-8xl select-none pointer-events-none ${isDark ? 'text-white/[0.02]' : 'text-black/[0.02]'
                                        }`}
                                >
                                    極
                                </div>
                                <div className="relative z-10">
                                    <p
                                        className={`text-xs sm:text-sm leading-relaxed max-w-2xl font-sans ${isDark ? 'text-neutral-200' : 'text-neutral-800'
                                            }`}
                                    >
                                        “Setiap baris kode dan pipeline data adalah proses belajar yang terus berkembang. Fokus pada pemahaman fundamental, konsistensi membangun proyek nyata, dan rasa ingin tahu yang tak pernah padam.”
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-3 pt-1">
                                <button
                                    onClick={copyEmailToClipboard}
                                    className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95 ${isDark
                                        ? 'bg-white text-black hover:bg-neutral-200'
                                        : 'bg-black text-white hover:bg-neutral-800'
                                        }`}
                                >
                                    <i className="ph-bold ph-envelope-simple text-sm"></i>
                                    <span>{copiedEmail ? 'Email Berhasil Disalin!' : 'Hubungi Saya'}</span>
                                </button>
                                <a
                                    href="https://github.com/Azzasafah"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-5 py-2.5 border rounded-xl text-xs font-mono font-bold transition-colors flex items-center gap-2 ${isDark
                                        ? 'bg-white/5 hover:bg-white/15 text-white border-white/15'
                                        : 'bg-black/5 hover:bg-black/15 text-black border-black/15'
                                        }`}
                                >
                                    <i className="ph-bold ph-github-logo text-base"></i>
                                    <span>GitHub Profile</span>
                                </a>
                            </div>
                        </div>

                        {/* Right Chisa Character Frame (4 cols on desktop) */}
                        <div className="lg:col-span-4 flex justify-center lg:justify-end">
                            <div
                                className={`relative w-full max-w-[280px] sm:max-w-[320px] rounded-3xl border p-3 shadow-2xl group transition-all duration-500 overflow-hidden ${isDark
                                    ? 'bg-[#0e0e12] border-white/15 hover:border-white/40'
                                    : 'bg-white border-black/15 hover:border-black/40 shadow-xl'
                                    }`}
                            >
                                {/* Top Tech Bar */}
                                <div
                                    className={`flex items-center justify-between px-2.5 py-1.5 mb-2 rounded-xl border text-[9px] font-mono ${isDark
                                        ? 'bg-white/5 border-white/10 text-neutral-400'
                                        : 'bg-black/5 border-black/10 text-neutral-600'
                                        }`}
                                >
                                    <span
                                        className={`flex items-center gap-1 font-bold tracking-wider ${isDark ? 'text-white' : 'text-black'
                                            }`}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> CHISA.SYS
                                    </span>
                                    <span>知紗 // ASSISTANT</span>
                                </div>

                                {/* Chisa Image Frame with Grayscale Aesthetic */}
                                <div
                                    className={`relative rounded-2xl overflow-hidden aspect-[4/5] border ${isDark
                                        ? 'bg-[#050507] border-white/10'
                                        : 'bg-[#f0f0f2] border-black/10'
                                        }`}
                                >
                                    <img
                                        src="/chisa.png"
                                        alt="Chisa Character Art"
                                        className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop';
                                        }}
                                    />
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-80 pointer-events-none ${isDark ? 'from-[#0e0e12]' : 'from-white'
                                            }`}
                                    />

                                    {/* Cyber Badges Overlay */}
                                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                                        <span
                                            className={`text-[8px] font-mono px-2 py-0.5 rounded border backdrop-blur-xs ${isDark
                                                ? 'text-neutral-300 bg-black/70 border-white/20'
                                                : 'text-neutral-800 bg-white/85 border-black/20 font-bold'
                                                }`}
                                        >
                                            NEURAL_COMPANION
                                        </span>
                                        <span
                                            className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${isDark
                                                ? 'text-emerald-400 bg-black/70 border-emerald-500/30'
                                                : 'text-emerald-700 bg-emerald-50 border-emerald-300 font-bold'
                                                }`}
                                        >
                                            SYNC 100%
                                        </span>
                                    </div>
                                </div>

                                {/* Bottom Tech Caption */}
                                <div
                                    className={`mt-2.5 px-2 flex items-center justify-between text-[8px] font-mono uppercase tracking-widest ${isDark ? 'text-neutral-400' : 'text-neutral-500'
                                        }`}
                                >
                                    <span>MONOCHROME // MANGA</span>
                                    <span>V2.6.4</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Dynamic Filter Navigation Bar */}
            <section className="relative z-10 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto">
                <div
                    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 transition-colors duration-500 ${isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <span
                            className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-white' : 'bg-black'
                                }`}
                        />
                        <h2
                            className={`text-lg sm:text-xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-black'
                                }`}
                        >
                            Selected Works
                        </h2>
                        <span
                            className={`text-xs font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-500'
                                }`}
                        >
                            ({filteredProjects.length} / {projects.length})
                        </span>
                    </div>

                    {/* Dynamic Tag Filter Pills from Kanban */}
                    <div
                        className={`flex flex-wrap items-center gap-1.5 p-1 border rounded-2xl ${isDark
                            ? 'bg-white/5 border-white/10'
                            : 'bg-black/5 border-black/10'
                            }`}
                    >
                        {availableTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setActiveFilter(tag)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${activeFilter === tag
                                    ? isDark
                                        ? 'bg-white text-black shadow-xs'
                                        : 'bg-black text-white shadow-xs'
                                    : isDark
                                        ? 'text-neutral-400 hover:text-white'
                                        : 'text-neutral-600 hover:text-black'
                                    }`}
                            >
                                {tag === 'ALL' ? 'Semua Proyek' : tag}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Showcase Grid */}
            <main className="relative z-10 py-10 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto pb-28">
                {filteredProjects.length === 0 ? (
                    <div
                        className={`p-16 text-center rounded-3xl border border-dashed ${isDark
                            ? 'bg-white/[0.02] border-white/10'
                            : 'bg-black/[0.02] border-black/10'
                            }`}
                    >
                        <i
                            className={`ph-bold ph-folder-dashed text-4xl mb-3 ${isDark ? 'text-neutral-400' : 'text-neutral-500'
                                }`}
                        ></i>
                        <h3
                            className={`text-base font-bold uppercase font-mono ${isDark ? 'text-white' : 'text-black'
                                }`}
                        >
                            Tidak Ada Proyek untuk Tag Ini
                        </h3>
                        <p
                            className={`text-xs mt-1 max-w-md mx-auto ${isDark ? 'text-neutral-400' : 'text-neutral-500'
                                }`}
                        >
                            Pilih tag lain atau publikasikan proyek baru dari Kanban.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((proj, idx) => (
                            <article
                                key={proj.id}
                                className={`border rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden ${isDark
                                    ? 'bg-[#0e0e12] border-white/10 hover:border-white/40 shadow-xl'
                                    : 'bg-white border-black/10 hover:border-black/30 shadow-md hover:shadow-xl'
                                    }`}
                            >
                                {/* Top Cyber Notch / Corner Marker */}
                                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden pointer-events-none">
                                    <div
                                        className={`w-12 h-1.5 transform rotate-45 translate-x-3 -translate-y-1 ${isDark ? 'bg-white/20' : 'bg-black/20'
                                            }`}
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span
                                            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border ${isDark
                                                ? 'bg-white/10 text-white border-white/15'
                                                : 'bg-black/5 text-black border-black/15'
                                                }`}
                                        >
                                            {proj.tag}
                                        </span>
                                        <span
                                            className={`text-[10px] font-mono font-bold tracking-widest ${isDark ? 'text-neutral-400' : 'text-neutral-500'
                                                }`}
                                        >
                                            0{idx + 1} // PROJ
                                        </span>
                                    </div>

                                    <h3
                                        className={`text-lg sm:text-xl font-bold transition-colors leading-snug mb-3 tracking-tight ${isDark
                                            ? 'text-white group-hover:text-neutral-100'
                                            : 'text-black group-hover:text-neutral-800'
                                            }`}
                                    >
                                        {proj.title}
                                    </h3>

                                    <p
                                        className={`text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 ${isDark ? 'text-neutral-400' : 'text-neutral-600'
                                            }`}
                                    >
                                        {proj.portfolio_summary || proj.description || 'Arsitektur implementasi teruji dengan standardisasi enterprise.'}
                                    </p>

                                    {Array.isArray(proj.tech_stack) && proj.tech_stack.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {proj.tech_stack.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${isDark
                                                        ? 'bg-white/5 text-neutral-300 border-white/10'
                                                        : 'bg-black/5 text-neutral-700 border-black/10'
                                                        }`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`flex items-center gap-2 pt-4 border-t ${isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                                        }`}
                                >
                                    {proj.live_url && (
                                        <a
                                            href={proj.live_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold font-mono transition-colors flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${isDark
                                                ? 'bg-white text-black hover:bg-neutral-200'
                                                : 'bg-black text-white hover:bg-neutral-800'
                                                }`}
                                        >
                                            <i className="ph-bold ph-arrow-square-out text-sm"></i> Live Demo
                                        </a>
                                    )}
                                    {proj.github_url && (
                                        <a
                                            href={proj.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`py-2.5 px-3 border rounded-xl text-xs font-bold font-mono transition-colors flex items-center justify-center gap-1.5 active:scale-95 ${isDark
                                                ? 'bg-white/5 hover:bg-white/15 text-white border-white/15'
                                                : 'bg-black/5 hover:bg-black/15 text-black border-black/15'
                                                }`}
                                        >
                                            <i className="ph-bold ph-github-logo text-base"></i> Code
                                        </a>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer
                className={`border-t py-12 px-4 sm:px-8 lg:px-16 text-xs font-mono transition-colors duration-500 ${isDark
                    ? 'border-white/10 bg-[#060608] text-neutral-400'
                    : 'border-black/10 bg-[#f0f0f2] text-neutral-600'
                    }`}
            >
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <p
                            className={`font-bold tracking-wide ${isDark ? 'text-white' : 'text-black'
                                }`}
                        >
                            MUHAMMAD HAFIZH AZZASAFAH (SAFAH) &copy; 2026
                        </p>
                        <p
                            className={`text-[11px] mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'
                                }`}
                        >
                            Designed with Monochrome Manga & Cyber Aesthetics. Powered by Laravel 12 & Inertia.js.
                        </p>
                    </div>

                    <div
                        className={`flex items-center gap-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'
                            }`}
                    >
                        <button
                            onClick={copyEmailToClipboard}
                            className={`transition-colors cursor-pointer ${isDark ? 'hover:text-white' : 'hover:text-black'
                                }`}
                        >
                            Email
                        </button>
                        <span>&bull;</span>
                        <a
                            href="https://github.com/Azzasafah"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'
                                }`}
                        >
                            GitHub
                        </a>
                        <span>&bull;</span>
                        <Link
                            href="/dashboard"
                            className={`hover:underline font-bold ${isDark ? 'text-white' : 'text-black'
                                }`}
                        >
                            Admin Workspace &rarr;
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

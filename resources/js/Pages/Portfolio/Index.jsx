import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function PortfolioIndex({ projects = [], certifications = [], faqs = [], user }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('portfolio_theme') || 'light';
        }
        return 'light';
    });

    const [activeProjectFilter, setActiveProjectFilter] = useState('ALL');
    const [activeCertFilter, setActiveCertFilter] = useState('ALL'); // 'ALL' | 'official' | 'internship'
    const [openFaqId, setOpenFaqId] = useState(null);
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

    const toggleFaq = (id) => {
        setOpenFaqId(openFaqId === id ? null : id);
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
        if (activeProjectFilter === 'ALL') return true;
        return proj.tag === activeProjectFilter;
    });

    // Filter certifications dynamically based on type (Official vs Internship)
    const filteredCertifications = certifications.filter((cert) => {
        if (activeCertFilter === 'ALL') return true;
        return cert.type === activeCertFilter;
    });

    const officialCount = certifications.filter((c) => c.type === 'official').length;
    const internshipCount = certifications.filter((c) => c.type === 'internship').length;

    const isDark = theme === 'dark';

    return (
        <div
            className={`min-h-screen font-sans relative overflow-x-hidden transition-colors duration-500 ${
                isDark
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
                className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${
                    isDark ? 'opacity-[0.035]' : 'opacity-[0.04]'
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
                className={`fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none z-0 transition-colors duration-700 ${
                    isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
                }`}
            />
            <div
                className={`fixed bottom-0 right-0 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none z-0 transition-colors duration-700 ${
                    isDark ? 'bg-white/[0.015]' : 'bg-black/[0.015]'
                }`}
            />

            {/* Top Navigation Bar */}
            <header
                className={`sticky top-0 z-40 backdrop-blur-xl border-b px-4 sm:px-8 lg:px-16 h-20 flex items-center justify-between transition-colors duration-500 ${
                    isDark
                        ? 'bg-[#08080a]/90 border-white/[0.08]'
                        : 'bg-[#f8f9fa]/90 border-black/[0.08]'
                }`}
            >
                <div className="flex items-center gap-3">
                    <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl transition-all duration-300 ${
                            isDark
                                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                                : 'bg-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]'
                        }`}
                    >
                        <span>S</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span
                                className={`font-extrabold text-sm tracking-tight uppercase ${
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
                            className={`text-[10px] font-mono tracking-widest uppercase ${
                                isDark ? 'text-neutral-400' : 'text-neutral-500'
                            }`}
                        >
                            DATA &bull; CLOUD &bull; ARCHITECTURE
                        </p>
                    </div>
                </div>

                {/* Center Quick Navigation Links (Desktop) */}
                <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-bold">
                    <a
                        href="#projects"
                        className={`transition-colors hover:underline ${
                            isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-black'
                        }`}
                    >
                        // Proyek
                    </a>
                    <a
                        href="#certifications"
                        className={`transition-colors hover:underline ${
                            isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-black'
                        }`}
                    >
                        // Sertifikasi & Magang
                    </a>
                    <a
                        href="#faq"
                        className={`transition-colors hover:underline ${
                            isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-black'
                        }`}
                    >
                        // FAQ
                    </a>
                </nav>

                <div className="flex items-center gap-3">
                    {/* Theme Mode Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                            isDark
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

                    <Link
                        href="/dashboard"
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-md flex items-center gap-1.5 active:scale-95 ${
                            isDark
                                ? 'bg-white text-black hover:bg-neutral-200'
                                : 'bg-black text-white hover:bg-neutral-800'
                        }`}
                    >
                        <i className="ph-bold ph-terminal-window"></i> Workspace
                    </Link>
                </div>
            </header>

            {/* ========================================================================= */}
            {/* HERO SECTION: Cyber Hologram & Manga Editorial Profile */}
            {/* ========================================================================= */}
            <section className="relative z-10 py-12 md:py-20 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto border-b border-white/[0.08]">
                <div className="space-y-8">
                    {/* Top Status & Kanji Badge */}
                    <div
                        className={`flex flex-wrap items-center justify-between gap-4 border-b pb-5 transition-colors duration-500 ${
                            isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                        }`}
                    >
                        <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono ${
                                isDark
                                    ? 'bg-white/[0.04] border-white/15 text-neutral-200'
                                    : 'bg-black/[0.04] border-black/15 text-neutral-800'
                            }`}
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span className="tracking-wider font-bold">STATUS://OPEN_TO_WORK &bull; LEARNING_MODE</span>
                        </div>
                        <div
                            className={`text-right text-[11px] font-mono tracking-widest ${
                                isDark ? 'text-neutral-400' : 'text-neutral-600'
                            }`}
                        >
                            データ工学 // システム設計 &bull; 極
                        </div>
                    </div>

                    {/* Split Grid: Left Headline + Right Chisa Artwork Frame */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Left Content (8 cols on desktop) */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="space-y-2">
                                <p
                                    className={`text-xs sm:text-sm font-mono tracking-widest uppercase ${
                                        isDark ? 'text-neutral-400' : 'text-neutral-500'
                                    }`}
                                >
                                    ポートフォリオ &bull; PERSONAL HUB
                                </p>
                                <h1
                                    className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.1] ${
                                        isDark ? 'text-white' : 'text-black'
                                    }`}
                                >
                                    Muhammad Hafizh <br />
                                    <span className="relative inline-block">
                                        <span className="relative z-10">Azzasafah</span>
                                        <span
                                            className={`absolute bottom-1 sm:bottom-2 left-0 right-0 h-3 sm:h-4 -z-0 ${
                                                isDark ? 'bg-white/15' : 'bg-black/10'
                                            }`}
                                        />
                                    </span>{' '}
                                    <span
                                        className={`text-xl sm:text-3xl font-mono font-medium tracking-normal ${
                                            isDark ? 'text-neutral-400' : 'text-neutral-500'
                                        }`}
                                    >
                                        (~safah)
                                    </span>
                                </h1>

                                {/* Dynamic Typing Subtitle Effect */}
                                <div
                                    className={`text-sm sm:text-lg font-mono font-medium min-h-[2rem] flex items-center ${
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

                            {/* Bio Description Box */}
                            <div
                                className={`p-5 sm:p-6 rounded-2xl border relative overflow-hidden backdrop-blur-md transition-all duration-500 ${
                                    isDark ? 'bg-white/[0.03] border-white/10' : 'bg-black/[0.03] border-black/10'
                                }`}
                            >
                                <p
                                    className={`text-xs sm:text-sm leading-relaxed font-mono ${
                                        isDark ? 'text-neutral-300' : 'text-neutral-700'
                                    }`}
                                >
                                    Tertarik mendalami arsitektur data pipeline berskala besar, orkestrasi workflow, integrasi cloud, dan rekayasa perangkat lunak modern. Terus bereksperimen, membangun proyek nyata, dan mendokumentasikan proses belajar setiap hari.
                                </p>
                            </div>

                            {/* Contact & GitHub Action Buttons */}
                            <div className="flex flex-wrap items-center gap-3 pt-1">
                                <button
                                    onClick={copyEmailToClipboard}
                                    className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95 ${
                                        isDark
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
                                    className={`px-5 py-2.5 border rounded-xl text-xs font-mono font-bold transition-colors flex items-center gap-2 active:scale-95 ${
                                        isDark
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
                                className={`relative w-full max-w-[260px] sm:max-w-[280px] rounded-3xl border p-3 shadow-2xl group transition-all duration-500 overflow-hidden ${
                                    isDark
                                        ? 'bg-[#0e0e12] border-white/15 hover:border-white/40'
                                        : 'bg-white border-black/15 hover:border-black/40 shadow-xl'
                                }`}
                            >
                                <div
                                    className={`flex items-center justify-between px-2 py-1 mb-2 rounded-lg border text-[9px] font-mono ${
                                        isDark
                                            ? 'bg-white/5 border-white/10 text-neutral-400'
                                            : 'bg-black/5 border-black/10 text-neutral-600'
                                    }`}
                                >
                                    <span
                                        className={`flex items-center gap-1 font-bold ${
                                            isDark ? 'text-white' : 'text-black'
                                        }`}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> CHISA.SYS
                                    </span>
                                    <span>AI // ASSISTANT</span>
                                </div>

                                <div
                                    className={`relative rounded-2xl overflow-hidden aspect-[4/5] border ${
                                        isDark ? 'bg-[#050507] border-white/10' : 'bg-[#f0f0f2] border-black/10'
                                    }`}
                                >
                                    <img
                                        src="/chisa.png"
                                        alt="Chisa Character Art"
                                        className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=300&auto=format&fit=crop';
                                        }}
                                    />
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-75 pointer-events-none ${
                                            isDark ? 'from-[#0e0e12]' : 'from-white'
                                        }`}
                                    />
                                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10">
                                        <span
                                            className={`text-[8px] font-mono px-1.5 py-0.5 rounded border backdrop-blur-xs ${
                                                isDark
                                                    ? 'text-neutral-300 bg-black/60 border-white/20'
                                                    : 'text-neutral-800 bg-white/80 border-black/20 font-bold'
                                            }`}
                                        >
                                            HOLOGRAPHIC_UNIT
                                        </span>
                                        <span
                                            className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${
                                                isDark
                                                    ? 'text-emerald-400 bg-black/60 border-emerald-500/30'
                                                    : 'text-emerald-700 bg-emerald-50 border-emerald-300 font-bold'
                                            }`}
                                        >
                                            ACTIVE
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className={`mt-2 px-1 flex items-center justify-between text-[8px] font-mono uppercase tracking-widest ${
                                        isDark ? 'text-neutral-400' : 'text-neutral-500'
                                    }`}
                                >
                                    <span>DATA_ENG_CORE</span>
                                    <span>VER_2026.8</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 2: VERIFIED PROJECTS (KANBAN PORTFOLIO SHOWCASE) */}
            {/* ========================================================================= */}
            <section id="projects" className="relative z-10 py-16 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            <span
                                className={`text-xs font-mono font-bold uppercase tracking-widest ${
                                    isDark ? 'text-neutral-400' : 'text-neutral-500'
                                }`}
                            >
                                SELEKSI PROYEK TERVERIFIKASI
                            </span>
                        </div>
                        <h2
                            className={`text-2xl sm:text-3xl font-extrabold tracking-tight uppercase ${
                                isDark ? 'text-white' : 'text-black'
                            }`}
                        >
                            Karya & Implementasi Nyata
                        </h2>
                    </div>

                    {/* Dynamic Tag Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        {availableTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setActiveProjectFilter(tag)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                                    activeProjectFilter === tag
                                        ? isDark
                                            ? 'bg-white text-black shadow-md'
                                            : 'bg-black text-white shadow-md'
                                        : isDark
                                        ? 'bg-white/5 hover:bg-white/15 text-neutral-300 border border-white/10'
                                        : 'bg-black/5 hover:bg-black/15 text-neutral-700 border border-black/10'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredProjects.length === 0 ? (
                    <div
                        className={`p-12 text-center rounded-3xl border ${
                            isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                        }`}
                    >
                        <i className="ph-bold ph-folder-open text-4xl mb-3 opacity-40"></i>
                        <p className={`text-sm font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            Belum ada proyek dengan tag ini.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((proj, idx) => (
                            <article
                                key={proj.id}
                                className={`p-6 rounded-3xl border flex flex-col justify-between group transition-all duration-300 ${
                                    isDark
                                        ? 'bg-[#0f0f13]/80 border-white/10 hover:border-white/30 hover:bg-[#14141a]'
                                        : 'bg-white border-black/10 hover:border-black/30 hover:shadow-xl'
                                }`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span
                                            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase border ${
                                                isDark
                                                    ? 'bg-white/10 text-white border-white/15'
                                                    : 'bg-black/5 text-black border-black/15'
                                            }`}
                                        >
                                            {proj.tag}
                                        </span>
                                        <span
                                            className={`text-[10px] font-mono font-bold tracking-widest ${
                                                isDark ? 'text-neutral-400' : 'text-neutral-500'
                                            }`}
                                        >
                                            0{idx + 1} // PROJ
                                        </span>
                                    </div>

                                    <h3
                                        className={`text-lg sm:text-xl font-bold transition-colors leading-snug mb-3 tracking-tight ${
                                            isDark
                                                ? 'text-white group-hover:text-neutral-100'
                                                : 'text-black group-hover:text-neutral-800'
                                        }`}
                                    >
                                        {proj.title}
                                    </h3>

                                    <p
                                        className={`text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 ${
                                            isDark ? 'text-neutral-400' : 'text-neutral-600'
                                        }`}
                                    >
                                        {proj.portfolio_summary ||
                                            proj.description ||
                                            'Arsitektur implementasi teruji dengan standardisasi enterprise.'}
                                    </p>

                                    {Array.isArray(proj.tech_stack) && proj.tech_stack.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {proj.tech_stack.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${
                                                        isDark
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
                                    className={`flex items-center gap-2 pt-4 border-t ${
                                        isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                                    }`}
                                >
                                    {proj.live_url && (
                                        <a
                                            href={proj.live_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold font-mono transition-colors flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
                                                isDark
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
                                            className={`py-2.5 px-3 border rounded-xl text-xs font-bold font-mono transition-colors flex items-center justify-center gap-1.5 active:scale-95 ${
                                                isDark
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
            </section>

            {/* ========================================================================= */}
            {/* SECTION 3: CERTIFICATIONS & INTERNSHIP CREDENTIALS */}
            {/* ========================================================================= */}
            <section
                id="certifications"
                className={`relative z-10 py-16 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto border-t transition-colors duration-500 ${
                    isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                }`}
            >
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span
                                className={`text-xs font-mono font-bold uppercase tracking-widest ${
                                    isDark ? 'text-neutral-400' : 'text-neutral-500'
                                }`}
                            >
                                KREDENSIAL & PENGALAMAN TERVERIFIKASI
                            </span>
                        </div>
                        <h2
                            className={`text-2xl sm:text-3xl font-extrabold tracking-tight uppercase ${
                                isDark ? 'text-white' : 'text-black'
                            }`}
                        >
                            Sertifikasi & Magang
                        </h2>
                    </div>

                    {/* Filter Type Toggle Pills: All | Official | Internship */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setActiveCertFilter('ALL')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                                activeCertFilter === 'ALL'
                                    ? isDark
                                        ? 'bg-white text-black shadow-md'
                                        : 'bg-black text-white shadow-md'
                                    : isDark
                                    ? 'bg-white/5 hover:bg-white/15 text-neutral-300 border border-white/10'
                                    : 'bg-black/5 hover:bg-black/15 text-neutral-700 border border-black/10'
                            }`}
                        >
                            Semua ({certifications.length})
                        </button>
                        <button
                            onClick={() => setActiveCertFilter('official')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                activeCertFilter === 'official'
                                    ? isDark
                                        ? 'bg-white text-black shadow-md'
                                        : 'bg-black text-white shadow-md'
                                    : isDark
                                    ? 'bg-white/5 hover:bg-white/15 text-neutral-300 border border-white/10'
                                    : 'bg-black/5 hover:bg-black/15 text-neutral-700 border border-black/10'
                            }`}
                        >
                            <i className="ph-bold ph-seal-check text-indigo-500"></i>
                            Sertifikasi Resmi ({officialCount})
                        </button>
                        <button
                            onClick={() => setActiveCertFilter('internship')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                activeCertFilter === 'internship'
                                    ? isDark
                                        ? 'bg-white text-black shadow-md'
                                        : 'bg-black text-white shadow-md'
                                    : isDark
                                    ? 'bg-white/5 hover:bg-white/15 text-neutral-300 border border-white/10'
                                    : 'bg-black/5 hover:bg-black/15 text-neutral-700 border border-black/10'
                            }`}
                        >
                            <i className="ph-bold ph-briefcase text-cyan-500"></i>
                            Magang & Program ({internshipCount})
                        </button>
                    </div>
                </div>

                {filteredCertifications.length === 0 ? (
                    <div
                        className={`p-12 text-center rounded-3xl border ${
                            isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                        }`}
                    >
                        <i className="ph-bold ph-certificate text-4xl mb-3 opacity-40"></i>
                        <p className={`text-sm font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            Belum ada sertifikasi dalam kategori ini.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredCertifications.map((cert) => (
                            <div
                                key={cert.id}
                                className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between group transition-all duration-300 relative overflow-hidden ${
                                    isDark
                                        ? 'bg-[#0f0f13]/80 border-white/10 hover:border-white/30 hover:bg-[#14141a]'
                                        : 'bg-white border-black/10 hover:border-black/30 hover:shadow-xl'
                                }`}
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <span
                                            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase border flex items-center gap-1.5 ${
                                                cert.type === 'official'
                                                    ? isDark
                                                        ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                                                        : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                                    : isDark
                                                    ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                                                    : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                                            }`}
                                        >
                                            <i
                                                className={`ph-bold ${
                                                    cert.type === 'official' ? 'ph-seal-check' : 'ph-briefcase'
                                                }`}
                                            ></i>
                                            {cert.type === 'official' ? 'SERTIFIKASI RESMI' : 'MAGANG & PENGALAMAN'}
                                        </span>

                                        {cert.issue_date && (
                                            <span
                                                className={`text-[11px] font-mono font-bold ${
                                                    isDark ? 'text-neutral-400' : 'text-neutral-500'
                                                }`}
                                            >
                                                {cert.issue_date}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <h3
                                            className={`text-lg sm:text-xl font-bold transition-colors leading-snug tracking-tight ${
                                                isDark ? 'text-white' : 'text-black'
                                            }`}
                                        >
                                            {cert.title}
                                        </h3>
                                        <p
                                            className={`text-xs font-mono font-semibold mt-1 flex items-center gap-1.5 ${
                                                isDark ? 'text-neutral-300' : 'text-neutral-700'
                                            }`}
                                        >
                                            <i className="ph-bold ph-buildings text-neutral-400"></i>
                                            {cert.issuer}
                                        </p>
                                    </div>

                                    {cert.description && (
                                        <p
                                            className={`text-xs sm:text-sm leading-relaxed ${
                                                isDark ? 'text-neutral-400' : 'text-neutral-600'
                                            }`}
                                        >
                                            {cert.description}
                                        </p>
                                    )}

                                    {Array.isArray(cert.skills) && cert.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {cert.skills.map((skill, sIdx) => (
                                                <span
                                                    key={sIdx}
                                                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${
                                                        isDark
                                                            ? 'bg-white/5 text-neutral-300 border-white/10'
                                                            : 'bg-black/5 text-neutral-700 border-black/10'
                                                    }`}
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`flex items-center justify-between gap-3 pt-5 mt-5 border-t ${
                                        isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                                    }`}
                                >
                                    <div className="text-[10px] font-mono">
                                        {cert.credential_id ? (
                                            <span className={isDark ? 'text-neutral-400' : 'text-neutral-500'}>
                                                ID: <strong className={isDark ? 'text-neutral-200' : 'text-neutral-800'}>{cert.credential_id}</strong>
                                            </span>
                                        ) : (
                                            <span className="text-emerald-500 font-bold flex items-center gap-1">
                                                <i className="ph-bold ph-check-circle"></i> Terverifikasi
                                            </span>
                                        )}
                                    </div>

                                    {cert.credential_url ? (
                                        <a
                                            href={cert.credential_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 active:scale-95 shadow-sm ${
                                                isDark
                                                    ? 'bg-white text-black hover:bg-neutral-200'
                                                    : 'bg-black text-white hover:bg-neutral-800'
                                            }`}
                                        >
                                            <i className="ph-bold ph-arrow-square-out text-sm"></i>
                                            Verifikasi Kredensial
                                        </a>
                                    ) : (
                                        <span
                                            className={`text-[10px] font-mono px-3 py-1.5 rounded-xl border ${
                                                isDark
                                                    ? 'bg-white/5 text-neutral-400 border-white/10'
                                                    : 'bg-black/5 text-neutral-600 border-black/10'
                                            }`}
                                        >
                                            Kredensial Resmi
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ========================================================================= */}
            {/* SECTION 4: FREQUENTLY ASKED QUESTIONS (FAQ DYNAMIC ACCORDION) */}
            {/* ========================================================================= */}
            <section
                id="faq"
                className={`relative z-10 py-16 px-4 sm:px-8 lg:px-16 max-w-5xl mx-auto border-t transition-colors duration-500 ${
                    isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                }`}
            >
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono mb-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        <span
                            className={`font-bold tracking-wider uppercase ${
                                isDark ? 'text-neutral-300' : 'text-neutral-700'
                            }`}
                        >
                            FAQ // 質疑応答
                        </span>
                    </div>
                    <h2
                        className={`text-2xl sm:text-4xl font-extrabold tracking-tight uppercase ${
                            isDark ? 'text-white' : 'text-black'
                        }`}
                    >
                        Pertanyaan Umum
                    </h2>
                    <p
                        className={`text-xs sm:text-sm font-mono ${
                            isDark ? 'text-neutral-400' : 'text-neutral-600'
                        }`}
                    >
                        Informasi seputar ketersediaan kerja, pendekatan data engineering, dan cara berkolaborasi.
                    </p>
                </div>

                {faqs.length === 0 ? (
                    <div
                        className={`p-12 text-center rounded-3xl border ${
                            isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                        }`}
                    >
                        <i className="ph-bold ph-question text-4xl mb-3 opacity-40"></i>
                        <p className={`text-sm font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            Belum ada pertanyaan FAQ yang dipublikasikan.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3.5">
                        {faqs.map((faq, fIdx) => {
                            const isOpen = openFaqId === faq.id;
                            return (
                                <div
                                    key={faq.id}
                                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                                        isDark
                                            ? isOpen
                                                ? 'bg-[#121217] border-white/30 shadow-lg shadow-black/50'
                                                : 'bg-[#0f0f13]/80 border-white/10 hover:border-white/20'
                                            : isOpen
                                            ? 'bg-white border-black/30 shadow-md'
                                            : 'bg-white border-black/10 hover:border-black/20'
                                    }`}
                                >
                                    {/* Question Button Header */}
                                    <button
                                        type="button"
                                        onClick={() => toggleFaq(faq.id)}
                                        className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none select-none"
                                    >
                                        <div className="flex items-center gap-3.5">
                                            <span
                                                className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 border ${
                                                    isDark
                                                        ? 'bg-white/5 text-neutral-300 border-white/10'
                                                        : 'bg-black/5 text-neutral-700 border-black/10'
                                                }`}
                                            >
                                                Q{fIdx + 1}
                                            </span>
                                            <div>
                                                <h3
                                                    className={`text-sm sm:text-base font-bold tracking-tight ${
                                                        isDark ? 'text-white' : 'text-slate-900'
                                                    }`}
                                                >
                                                    {faq.question}
                                                </h3>
                                                {faq.category && (
                                                    <span
                                                        className={`text-[10px] font-mono uppercase tracking-wider ${
                                                            isDark ? 'text-neutral-400' : 'text-neutral-500'
                                                        }`}
                                                    >
                                                        {faq.category}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div
                                            className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold border transition-transform duration-300 shrink-0 ${
                                                isOpen ? 'rotate-180' : ''
                                            } ${
                                                isDark
                                                    ? 'bg-white/10 text-white border-white/20'
                                                    : 'bg-black/5 text-black border-black/20'
                                            }`}
                                        >
                                            <i className="ph-bold ph-caret-down"></i>
                                        </div>
                                    </button>

                                    {/* Accordion Answer Body */}
                                    {isOpen && (
                                        <div
                                            className={`px-5 pb-6 sm:px-6 sm:pb-7 text-xs sm:text-sm leading-relaxed border-t pt-4 font-sans animate-fadeIn ${
                                                isDark
                                                    ? 'border-white/[0.08] text-neutral-300'
                                                    : 'border-black/[0.08] text-neutral-700'
                                            }`}
                                        >
                                            <p className="whitespace-pre-line">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* ========================================================================= */}
            {/* SECTION 5: CTA / CONTACT BANNER */}
            {/* ========================================================================= */}
            <section
                id="contact"
                className={`relative z-10 py-16 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto border-t transition-colors duration-500 ${
                    isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                }`}
            >
                <div
                    className={`p-8 sm:p-12 rounded-3xl border text-center relative overflow-hidden backdrop-blur-xl ${
                        isDark
                            ? 'bg-gradient-to-b from-[#111116] to-[#0a0a0e] border-white/15'
                            : 'bg-gradient-to-b from-white to-slate-100 border-black/15 shadow-xl'
                    }`}
                >
                    <div className="max-w-2xl mx-auto space-y-4">
                        <div
                            className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center text-2xl mb-2 ${
                                isDark ? 'bg-white text-black' : 'bg-black text-white'
                            }`}
                        >
                            <i className="ph-bold ph-paper-plane-tilt"></i>
                        </div>
                        <h2
                            className={`text-2xl sm:text-4xl font-black uppercase tracking-tight ${
                                isDark ? 'text-white' : 'text-black'
                            }`}
                        >
                            Mari Berkolaborasi
                        </h2>
                        <p
                            className={`text-xs sm:text-sm font-mono leading-relaxed ${
                                isDark ? 'text-neutral-400' : 'text-neutral-600'
                            }`}
                        >
                            Punya ide proyek menarik, kebutuhan perancangan pipeline data, atau ingin mendiskusikan peluang kerja sama? Saya siap berdiskusi kapan saja.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                            <button
                                onClick={copyEmailToClipboard}
                                className={`px-6 py-3 rounded-xl text-xs font-mono font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95 ${
                                    isDark
                                        ? 'bg-white text-black hover:bg-neutral-200'
                                        : 'bg-black text-white hover:bg-neutral-800'
                                }`}
                            >
                                <i className="ph-bold ph-envelope text-base"></i>
                                <span>{copiedEmail ? 'Email Berhasil Disalin!' : 'Salin Alamat Email'}</span>
                            </button>
                            <a
                                href="https://github.com/Azzasafah"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-6 py-3 border rounded-xl text-xs font-mono font-bold transition-colors flex items-center gap-2 active:scale-95 ${
                                    isDark
                                        ? 'bg-white/5 hover:bg-white/15 text-white border-white/15'
                                        : 'bg-black/5 hover:bg-black/15 text-black border-black/15'
                                }`}
                            >
                                <i className="ph-bold ph-github-logo text-base"></i>
                                <span>GitHub @Azzasafah</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* FOOTER */}
            {/* ========================================================================= */}
            <footer
                className={`border-t py-12 px-4 sm:px-8 lg:px-16 text-xs font-mono transition-colors duration-500 ${
                    isDark
                        ? 'border-white/10 bg-[#060608] text-neutral-400'
                        : 'border-black/10 bg-[#f0f0f2] text-neutral-600'
                }`}
            >
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <p className={`font-bold tracking-wide ${isDark ? 'text-white' : 'text-black'}`}>
                            MUHAMMAD HAFIZH AZZASAFAH (SAFAH) &copy; 2026
                        </p>
                        <p
                            className={`text-[11px] mt-1 ${
                                isDark ? 'text-neutral-400' : 'text-neutral-500'
                            }`}
                        >
                            Designed with Monochrome Manga & Cyber Aesthetics. Powered by Laravel 12 & Inertia.js.
                        </p>
                    </div>

                    <div className={`flex flex-wrap items-center gap-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        <a href="#projects" className="hover:underline">Proyek</a>
                        <span>&bull;</span>
                        <a href="#certifications" className="hover:underline">Sertifikasi</a>
                        <span>&bull;</span>
                        <a href="#faq" className="hover:underline">FAQ</a>
                        <span>&bull;</span>
                        <button
                            onClick={copyEmailToClipboard}
                            className={`transition-colors cursor-pointer ${
                                isDark ? 'hover:text-white' : 'hover:text-black'
                            }`}
                        >
                            Email
                        </button>
                        <span>&bull;</span>
                        <a
                            href="https://github.com/Azzasafah"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}
                        >
                            GitHub
                        </a>
                        <span>&bull;</span>
                        <Link
                            href="/dashboard"
                            className={`hover:underline font-bold ${
                                isDark ? 'text-white' : 'text-black'
                            }`}
                        >
                            Workspace &rarr;
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

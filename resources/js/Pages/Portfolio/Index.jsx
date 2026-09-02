import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function PortfolioIndex({
    projects = [],
    freelanceProjects = [],
    certifications = [],
    faqs = [],
    user = null,
}) {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('portfolio_theme') || 'light';
        }
        return 'light';
    });

    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeProjectFilter, setActiveProjectFilter] = useState('ALL');
    const [activeCertFilter, setActiveCertFilter] = useState('ALL'); // 'ALL' | 'official' | 'internship'
    const [certPage, setCertPage] = useState(1);
    const CERTS_PER_PAGE = 4;

    const [freelancePage, setFreelancePage] = useState(1);
    const FREELANCE_PER_PAGE = 6;

    const [activeFaqCategory, setActiveFaqCategory] = useState('ALL');
    const [openFaqId, setOpenFaqId] = useState(null);
    const [copiedEmail, setCopiedEmail] = useState(false);

    const email = 'muhammad.hafizh0408@gmail.com';
    const phone = '081805429182';

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

    // Scroll Progress & Scroll Reveal IntersectionObserver
    useEffect(() => {
        const handleScroll = () => {
            const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const currentProgress = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
            setScrollProgress(currentProgress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Setup IntersectionObserver for smooth scroll reveals
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-active');
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
        );

        const elements = document.querySelectorAll('.reveal-init');
        elements.forEach((el) => observer.observe(el));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, [projects, freelanceProjects, certifications, certPage, freelancePage, activeCertFilter, activeProjectFilter]);

    // Typewriter Phrases Loop (Data Engineer, Fullstack Web Backend, Cloud)
    const phrases = [
        'Data Engineer Enthusiast (ETL Pipelines & Lakehouse)',
        'Backend & Fullstack Web Developer (Laravel & REST APIs)',
        'Cloud Infrastructure Explorer (Microsoft Azure Certified)',
        'Database & Query Optimization (Advanced SQL & Triggers)',
        'Sarjana Teknik Informatika Cum Laude (GPA 3.90/4.00)',
    ];

    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(55);

    useEffect(() => {
        const fullText = phrases[currentPhraseIndex];

        const timer = setTimeout(() => {
            if (!isDeleting) {
                const nextText = fullText.substring(0, currentText.length + 1);
                setCurrentText(nextText);
                setTypingSpeed(40);

                if (nextText === fullText) {
                    setTypingSpeed(2400); // Pause before backspacing
                    setIsDeleting(true);
                }
            } else {
                const nextText = fullText.substring(0, currentText.length - 1);
                setCurrentText(nextText);
                setTypingSpeed(18);

                if (nextText === '') {
                    setIsDeleting(false);
                    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
                    setTypingSpeed(350); // Pause before next phrase
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentPhraseIndex, typingSpeed]);

    // Unique tags derived dynamically from Kanban projects
    const availableProjectTags = [
        'ALL',
        ...Array.from(new Set(projects.map((p) => p.tag).filter(Boolean))),
    ];

    // Filter projects
    const filteredProjects = projects.filter((proj) => {
        if (activeProjectFilter === 'ALL') return true;
        return proj.tag === activeProjectFilter;
    });

    // Filter & Paginate certifications
    const filteredCertifications = certifications.filter((cert) => {
        if (activeCertFilter === 'ALL') return true;
        return cert.type === activeCertFilter;
    });

    const officialCount = certifications.filter((c) => c.type === 'official').length;
    const internshipCount = certifications.filter((c) => c.type === 'internship').length;

    const totalCertPages = Math.ceil(filteredCertifications.length / CERTS_PER_PAGE) || 1;
    const paginatedCertifications = filteredCertifications.slice(
        (certPage - 1) * CERTS_PER_PAGE,
        certPage * CERTS_PER_PAGE
    );

    const handleCertFilterChange = (filter) => {
        setActiveCertFilter(filter);
        setCertPage(1);
    };

    // Paginate Freelance projects
    const totalFreelancePages = Math.ceil(freelanceProjects.length / FREELANCE_PER_PAGE) || 1;
    const paginatedFreelance = freelanceProjects.slice(
        (freelancePage - 1) * FREELANCE_PER_PAGE,
        freelancePage * FREELANCE_PER_PAGE
    );

    // Filter FAQ Categories
    const faqCategories = [
        'ALL',
        ...Array.from(new Set(faqs.map((f) => f.category).filter(Boolean))),
    ];

    const filteredFaqs = faqs.filter((faq) => {
        if (activeFaqCategory === 'ALL') return true;
        return faq.category === activeFaqCategory;
    });

    // Skills Matrix Data (Data Engineering, Backend Web, Cloud, Database, Architecture)
    const skillCategories = [
        {
            title: 'Data Engineering & Analytics',
            icon: 'ph-database',
            skills: ['ETL / ELT Pipelines', 'PySpark', 'Apache Airflow', 'Delta Lake', 'Data Lakehouse', 'Advanced SQL', 'Window Functions', 'Stored Procedures', 'Triggers', 'Data Modeling'],
        },
        {
            title: 'Backend & Web Development',
            icon: 'ph-browsers',
            skills: ['Laravel Framework', 'PHP 8.x', 'Node.js', 'Express.js', 'Next.js', 'React.js', 'RESTful API Design', 'MVC Architecture', 'Tailwind CSS', 'CodeIgniter'],
        },
        {
            title: 'Cloud & Infrastructure (Learning)',
            icon: 'ph-cloud',
            skills: ['Microsoft Azure (AZ-900)', 'Azure Data Fundamentals (DP-900)', 'Azure AI Fundamentals (AI-900)', 'Docker Containers', 'Linux / VPS', 'Git & GitHub', 'CI/CD Pipelines'],
        },
        {
            title: 'Software Quality Assurance & Testing',
            icon: 'ph-bug',
            skills: ['Manual Testing', 'API Automation', 'Katalon Studio', 'Groovy Scripting', 'Performance Testing (k6)', 'Postman', 'STLC & SDLC', 'Test Case Design'],
        },
        {
            title: 'System Design & Architecture',
            icon: 'ph-graph',
            skills: ['UML (Use Case, Sequence, Activity)', 'DFD (Data Flow Diagram)', 'ERD (Database Schema)', 'Microservices Architecture', 'Flowchart & Technical SOP'],
        },
        {
            title: 'Data Analysis & Business Intelligence',
            icon: 'ph-chart-bar',
            skills: ['Microsoft Excel (Pivot Table & VLOOKUP)', 'Microsoft Access', 'Business Analysis', 'SWOT Feasibility', 'Reporting & Documentation'],
        },
    ];

    // Work Experience & Internships
    const workExperiences = [
        {
            title: 'Backend Developer (Internship)',
            company: 'Evermos x Rakamin Academy',
            period: 'Juli 2025 – Agust 2025',
            badge: 'Internship',
            tech: ['Golang', 'SQL', 'Clean Code', 'Modular Query', 'API Services'],
            points: [
                'Terlibat dalam studi kasus dan proyek pengembangan backend nyata di lingkungan Evermos, berkolaborasi lintas tim Product dan Marketing.',
                'Mengembangkan dan mempelajari implementasi layanan backend menggunakan Golang dan SQL sebagai tools utama operasional teknis Evermos.',
                'Membiasakan diri dengan pola pengembangan skala production: clean code, modularitas, dan efisiensi query database.',
            ],
        },
        {
            title: 'Data Governance Specialist (Project-Based Intern)',
            company: 'Rakamin Academy Internal Platform',
            period: 'Des 2024 – Jan 2025',
            badge: 'Virtual Internship (Skor 92.33)',
            tech: ['SOP Re-engineering', 'Bug Template', 'Flowchart', 'Process Mapping'],
            points: [
                'Mengevaluasi SOP pelaporan bug yang berjalan dan merancang ulang alur proses antara tim support dan developer.',
                'Merancang ulang alur SOP dengan menyederhanakan langkah prosedural, mendefinisikan peran & tanggung jawab, serta membuat template laporan bug dan flowchart.',
                'Alur pelaporan bug menjadi lebih terstruktur, meningkatkan kecepatan respons dan efektivitas komunikasi lintas tim.',
            ],
        },
        {
            title: 'Project Consultant (Project-Based Intern)',
            company: 'BIPO x Rakamin Academy',
            period: 'Nov 2023 – Des 2023',
            badge: 'Virtual Internship (Skor 87.47)',
            tech: ['Microsoft Excel', 'Pivot Table', 'SWOT Analysis', 'HR Software Simulation'],
            points: [
                'Proyek konsultasi berbasis data untuk simulasi implementasi perangkat lunak Human Resources (HR) guna meningkatkan efisiensi.',
                'Mengolah data kepegawaian, analisis performa dengan Microsoft Excel (pivot table, visualisasi data), dan menyusun strategi negosiasi dengan analisis SWOT.',
                'Laporan analisis kelayakan dan rencana implementasi bertahap disetujui tim akademik Rakamin sebagai solusi layak terapkan.',
            ],
        },
        {
            title: 'Health System Analyst (Project-Based Intern)',
            company: 'Klinik GO x Rakamin Academy',
            period: 'Jan 2023 – Feb 2023',
            badge: 'Virtual Internship',
            tech: ['UML Modeling', 'DFD', 'ERD', 'Use Case', 'Activity Diagram'],
            points: [
                'Digitalisasi sistem pendaftaran pasien berbasis daring untuk mengatasi inefisiensi administrasi manual.',
                'Merancang dokumentasi sistem dan memetakan alur proses kerja bagi tiga jenis pengguna: pasien, admin, dan front office.',
                'Membuat diagram alur sistem Data Flow Diagram (DFD), Unified Modeling Language (UML: Use Case, Sequence, Activity), serta Entity Relationship Diagram (ERD).',
            ],
        },
        {
            title: 'Business Intelligence Analyst (Project-Based Intern)',
            company: 'Bank Muamalat x Rakamin Academy',
            period: 'Sep 2022 – Okt 2022',
            badge: 'Virtual Internship (Skor 83.75)',
            tech: ['Microsoft Excel', 'Microsoft Access', 'BI Dashboard', 'Sales Analytics'],
            points: [
                'Analisis data transaksi multi-sumber (produk, kategori, nasabah) untuk mengidentifikasi peluang peningkatan penjualan.',
                'Membangun dashboard analitis sederhana menggunakan Microsoft Excel & Access untuk visualisasi tren konsumsi pelanggan.',
                'Memberikan insight strategis berupa rekomendasi bundling produk dan loyalty points untuk meningkatkan volume penjualan.',
            ],
        },
        {
            title: 'Fullstack Developer (Project-Based Intern)',
            company: 'Investree x Rakamin Academy',
            period: 'Apr 2026 – Sekarang',
            badge: 'Virtual Internship',
            tech: ['Laravel', 'Laravel Passport', 'MySQL', 'RESTful API', 'Auth Module'],
            points: [
                'Mengembangkan fitur CRUD dan RESTful API menggunakan framework Laravel terintegrasi database MySQL.',
                'Menerapkan mekanisme keamanan User Authentication dengan Laravel UI serta API Authentication menggunakan Laravel Passport.',
                'Berhasil membuat modul sistem otentikasi dan manajemen user yang berfungsi penuh dan siap digunakan.',
            ],
        },
        {
            title: 'Fullstack Web Developer (Internship)',
            company: 'Fakultas Teknik Universitas Dr. Soetomo',
            period: 'Apr 2021 – Jul 2021',
            badge: 'Academic Internship (Nilai A)',
            tech: ['CodeIgniter', 'PHP', 'MySQL', 'Bootstrap', 'UML & ERD'],
            points: [
                'Pengembangan sistem informasi manajemen tugas akhir untuk Fakultas Teknik guna mendigitalisasi proses administrasi akademik.',
                'Merancang dan mengembangkan aplikasi berbasis framework CodeIgniter dengan database MySQL.',
                'Sistem baru berhasil mempercepat proses administrasi akademik dan meraih nilai akhir “A”.',
            ],
        },
        {
            title: 'Asisten Dosen Database',
            company: 'Laboratorium Teknik Informatika, Univ Dr. Soetomo',
            period: 'Des 2021 – Feb 2022',
            badge: 'Teaching Assistant',
            tech: ['SQL', 'Database Design', 'ERD', 'Mentoring'],
            points: [
                'Mendukung pelaksanaan perkuliahan dan praktikum dasar manajemen data dan desain database untuk satu kelas mahasiswa.',
                'Membantu menyampaikan materi, memandu sesi praktikum, mengelola penilaian, dan membimbing mahasiswa dalam pemecahan query SQL praktis.',
            ],
        },
    ];

    const isDark = theme === 'dark';

    return (
        <div
            className={`min-h-screen font-sans relative overflow-x-hidden selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500 ${
                isDark ? 'bg-[#09090b] text-[#f4f4f5]' : 'bg-[#fafafa] text-[#18181b]'
            }`}
        >
            <Head>
                <title>Muhammad Hafizh Azzasafah — Portfolio | Data Engineer, Fullstack Backend & Cloud</title>
                <meta
                    name="description"
                    content="Portofolio resmi Muhammad Hafizh Azzasafah (Safah) - Data Engineer Enthusiast, Backend & Fullstack Web Developer (Laravel, Express, Next.js), Cloud Infrastructure Explorer (3x Microsoft Azure Certified: AZ-900, DP-900, AI-900)."
                />
                <meta
                    name="keywords"
                    content="Muhammad Hafizh Azzasafah, Safah, Data Engineer, Fullstack Web Developer, Backend Developer, Laravel, Next.js, Express.js, PySpark, Airflow, SQL Lanjutan, Microsoft Azure Certified, AZ-900, DP-900, AI-900, Cloud Engineer"
                />
                <meta name="author" content="Muhammad Hafizh Azzasafah" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph / Social Cards */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Muhammad Hafizh Azzasafah — Portfolio | Data Engineer & Backend Developer" />
                <meta
                    property="og:description"
                    content="Portofolio resmi Muhammad Hafizh Azzasafah - Data Pipelines, Backend & Fullstack Web Engineering, Cloud Infrastructure."
                />
                <meta property="og:image" content="/chisa.png" />

                {/* Twitter / X */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Muhammad Hafizh Azzasafah — Portfolio" />
                <meta
                    name="twitter:description"
                    content="Portofolio resmi Muhammad Hafizh Azzasafah - Data Engineer, Backend Fullstack & Cloud Explorer."
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
                        jobTitle: 'Data Engineer & Fullstack Backend Developer',
                        telephone: '081805429182',
                        email: 'muhammad.hafizh0408@gmail.com',
                        sameAs: [
                            'https://github.com/Azzasafah',
                            'https://linkedin.com/in/azzasafah',
                            'mailto:muhammad.hafizh0408@gmail.com',
                        ],
                        alumniOf: {
                            '@type': 'EducationalOrganization',
                            name: 'Universitas Dr. Soetomo',
                        },
                        knowsAbout: [
                            'Data Engineering',
                            'ETL / ELT Pipelines',
                            'PySpark',
                            'Apache Airflow',
                            'Backend Web Development',
                            'Laravel Framework',
                            'Next.js',
                            'Express.js',
                            'Advanced SQL',
                            'Microsoft Azure Cloud',
                        ],
                    })}
                </script>
            </Head>

            {/* Top Reading / Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent pointer-events-none">
                <div
                    className={`h-full transition-all duration-150 ${
                        isDark ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-black shadow-[0_0_8px_rgba(0,0,0,0.4)]'
                    }`}
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Subtle Dot Grid Texture Overlay */}
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

            {/* Ambient Radial Mesh Lighting */}
            <div
                className={`fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[160px] pointer-events-none z-0 transition-colors duration-700 ${
                    isDark ? 'bg-white/[0.015]' : 'bg-black/[0.015]'
                }`}
            />

            {/* Top Navigation Bar - Ultra Clean & Mobile Responsive */}
            <header
                className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 sm:px-8 lg:px-16 h-16 sm:h-20 flex items-center justify-between transition-colors duration-300 ${
                    isDark ? 'bg-[#09090b]/85 border-white/[0.08]' : 'bg-[#fafafa]/85 border-black/[0.08]'
                }`}
            >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-display font-black text-lg sm:text-xl shrink-0 transition-all duration-300 ${
                            isDark
                                ? 'bg-white text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_20px_rgba(255,255,255,0.15)]'
                                : 'bg-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_14px_rgba(0,0,0,0.12)]'
                        }`}
                    >
                        <span>S</span>
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <span
                                className={`font-display font-extrabold text-xs sm:text-sm tracking-tight uppercase truncate max-w-[150px] sm:max-w-none ${
                                    isDark ? 'text-white' : 'text-black'
                                }`}
                            >
                                M. Hafizh Azzasafah
                            </span>
                            <span
                                className={`hidden sm:inline text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                                    isDark
                                        ? 'bg-white/10 text-white/90 border-white/20'
                                        : 'bg-black/5 text-black/90 border-black/20'
                                }`}
                            >
                                “Safah”
                            </span>
                        </div>
                        <p
                            className={`hidden sm:block text-[10px] font-mono tracking-[0.16em] uppercase truncate ${
                                isDark ? 'text-neutral-400' : 'text-neutral-500'
                            }`}
                        >
                            DATA ENGINEER &bull; BACKEND &bull; CLOUD
                        </p>
                    </div>
                </div>

                {/* Center Quick Navigation Links (Desktop) */}
                <nav className="hidden lg:flex items-center gap-6 text-xs font-mono font-semibold tracking-wide">
                    <a
                        href="#portfolio"
                        className={`transition-colors hover:text-indigo-500 ${
                            isDark ? 'text-neutral-300' : 'text-neutral-600'
                        }`}
                    >
                        // Portfolio
                    </a>
                    <a
                        href="#freelance"
                        className={`transition-colors hover:text-indigo-500 ${
                            isDark ? 'text-neutral-300' : 'text-neutral-600'
                        }`}
                    >
                        // Freelance
                    </a>
                    <a
                        href="#experience"
                        className={`transition-colors hover:text-indigo-500 ${
                            isDark ? 'text-neutral-300' : 'text-neutral-600'
                        }`}
                    >
                        // Pengalaman
                    </a>
                    <a
                        href="#skills"
                        className={`transition-colors hover:text-indigo-500 ${
                            isDark ? 'text-neutral-300' : 'text-neutral-600'
                        }`}
                    >
                        // Keahlian
                    </a>
                    <a
                        href="#certifications"
                        className={`transition-colors hover:text-indigo-500 ${
                            isDark ? 'text-neutral-300' : 'text-neutral-600'
                        }`}
                    >
                        // Sertifikasi
                    </a>
                    <a
                        href="#faq"
                        className={`transition-colors hover:text-indigo-500 ${
                            isDark ? 'text-neutral-300' : 'text-neutral-600'
                        }`}
                    >
                        // FAQ
                    </a>
                </nav>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    {/* Theme Mode Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle Theme Mode"
                        className={`p-2 sm:p-2.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
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
                        href="/dashboard"
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                            isDark
                                ? 'bg-white text-black hover:bg-neutral-200 shadow-md shadow-white/5'
                                : 'bg-black text-white hover:bg-neutral-800 shadow-md shadow-black/10'
                        }`}
                    >
                        <i className="ph-bold ph-terminal-window"></i>
                        <span className="hidden xs:inline">Workspace</span>
                    </Link>
                </div>
            </header>

            {/* ========================================================================= */}
            {/* HERO SECTION: Cyber Manga Hologram & Asymmetric Profile Layout */}
            {/* ========================================================================= */}
            <section className="relative z-10 py-12 sm:py-16 md:py-24 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto border-b border-white/[0.08] dark:border-white/[0.08]">
                <div className="space-y-8 sm:space-y-10">
                    {/* Top Status & Header - Responsive on Mobile */}
                    <div
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 border-b pb-4 sm:pb-5 transition-colors duration-300 ${
                            isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                        }`}
                    >
                        <div
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] sm:text-xs font-mono max-w-full overflow-hidden ${
                                isDark
                                    ? 'bg-white/[0.03] border-white/10 text-neutral-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                                    : 'bg-black/[0.03] border-black/10 text-neutral-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]'
                            }`}
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                            <span className="tracking-wide font-bold truncate">STATUS://OPEN_TO_WORK &bull; DATA_ENGINEER &bull; BACKEND</span>
                        </div>
                        <div
                            className={`text-left sm:text-right text-[10px] sm:text-[11px] font-mono tracking-[0.16em] font-medium ${
                                isDark ? 'text-neutral-400' : 'text-neutral-500'
                            }`}
                        >
                            データエンジニア // クラウド設計 &bull; 極
                        </div>
                    </div>

                    {/* Asymmetric Split: Left Typography + Right Cyber Character Frame */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                        {/* Left Typography Block (7 cols) */}
                        <div className="lg:col-span-7 space-y-6 reveal-init">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`text-xs font-mono font-semibold tracking-[0.2em] uppercase ${
                                            isDark ? 'text-neutral-400' : 'text-neutral-500'
                                        }`}
                                    >
                                        PORTFOLIO &bull; CURRICULUM VITAE
                                    </span>
                                </div>
                                
                                <h1
                                    className={`font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.1] ${
                                        isDark ? 'text-white' : 'text-black'
                                    }`}
                                    style={{ textWrap: 'balance' }}
                                >
                                    Muhammad Hafizh <br />
                                    <span className="relative inline-block">
                                        <span className="relative z-10">Azzasafah</span>
                                        <span
                                            className={`absolute bottom-1 sm:bottom-2 left-0 right-0 h-3 sm:h-4 -z-0 rounded-sm ${
                                                isDark ? 'bg-white/15' : 'bg-black/10'
                                            }`}
                                        />
                                    </span>{' '}
                                    <span
                                        className={`text-xl sm:text-3xl lg:text-4xl font-mono font-medium tracking-normal ${
                                            isDark ? 'text-neutral-400' : 'text-neutral-500'
                                        }`}
                                    >
                                        (~safah)
                                    </span>
                                </h1>

                                {/* Dynamic Typing Terminal Subtitle */}
                                <div
                                    className={`text-xs sm:text-base font-mono font-medium min-h-[2.4rem] flex items-center leading-snug ${
                                        isDark ? 'text-neutral-300' : 'text-neutral-700'
                                    }`}
                                >
                                    <span className={`mr-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>[</span>
                                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                                        {currentText}
                                    </span>
                                    <span
                                        className={`w-2 sm:w-2.5 h-3.5 sm:h-5 ml-1 inline-block animate-pulse shrink-0 ${
                                            isDark
                                                ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                                                : 'bg-black shadow-[0_0_8px_rgba(0,0,0,0.4)]'
                                        }`}
                                    />
                                    <span className={`ml-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>]</span>
                                </div>
                            </div>

                            {/* Refined Bio Description Box without Golang */}
                            <div
                                className={`p-5 sm:p-6 rounded-2xl border relative overflow-hidden backdrop-blur-md transition-all duration-300 space-y-3 ${
                                    isDark
                                        ? 'bg-[#111116]/70 border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
                                        : 'bg-white/80 border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.03)]'
                                }`}
                            >
                                <p
                                    className={`text-xs sm:text-sm leading-relaxed font-sans ${
                                        isDark ? 'text-neutral-300' : 'text-neutral-700'
                                    }`}
                                >
                                    Lulusan <strong>Sarjana Teknik Informatika Cum Laude (GPA 3.90/4.00)</strong> yang berfokus pada <strong>Data Engineering</strong>, <strong>Fullstack Web Development (dengan preferensi utama pada Backend Architecture & API Design)</strong>, dan eksplorasi <strong>Cloud Infrastructure</strong>.
                                </p>
                                <p
                                    className={`text-xs sm:text-sm leading-relaxed font-sans ${
                                        isDark ? 'text-neutral-400' : 'text-neutral-600'
                                    }`}
                                >
                                    Memahami perancangan data pipeline (ETL/ELT, PySpark, Airflow), optimasi query database kompleks (Advanced SQL, Stored Procedures, Triggers), pengembangan layanan web modular (Laravel, Next.js, Express, RESTful API), serta tersertifikasi <strong>3x Microsoft Azure (AZ-900, DP-900, AI-900)</strong>. Siap berkontribusi membangun sistem yang scalable, teruji, dan efisien.
                                </p>
                            </div>

                            {/* Clean 4 Metric HUD Cards */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                <div
                                    className={`p-3 rounded-2xl border ${
                                        isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                                    }`}
                                >
                                    <span className="text-[10px] font-mono text-neutral-400 block uppercase">AKADEMIK</span>
                                    <span className="font-display font-black text-base sm:text-lg tabular-nums">3.90 / 4.00</span>
                                    <span className="text-[9px] font-mono text-emerald-500 block font-bold">Cum Laude</span>
                                </div>
                                <div
                                    className={`p-3 rounded-2xl border ${
                                        isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                                    }`}
                                >
                                    <span className="text-[10px] font-mono text-neutral-400 block uppercase">SPESIALISASI</span>
                                    <span className="font-display font-black text-base sm:text-lg">Backend & Data</span>
                                    <span className="text-[9px] font-mono text-indigo-400 block font-bold">Laravel & Pipelines</span>
                                </div>
                                <div
                                    className={`p-3 rounded-2xl border ${
                                        isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                                    }`}
                                >
                                    <span className="text-[10px] font-mono text-neutral-400 block uppercase">CLOUD AZURE</span>
                                    <span className="font-display font-black text-base sm:text-lg">3x Certified</span>
                                    <span className="text-[9px] font-mono text-cyan-400 block font-bold">AZ/DP/AI-900</span>
                                </div>
                                <div
                                    className={`p-3 rounded-2xl border ${
                                        isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                                    }`}
                                >
                                    <span className="text-[10px] font-mono text-neutral-400 block uppercase">BAHASA</span>
                                    <span className="font-display font-black text-base sm:text-lg tabular-nums">TOEFL 577</span>
                                    <span className="text-[9px] font-mono text-amber-500 block font-bold">Inter–Upper</span>
                                </div>
                            </div>

                            {/* Action CTA Bar - Clear Usernames & Handles */}
                            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                                <a
                                    href={`https://wa.me/62${phone.substring(1)}?text=Halo%20Safah,%20saya%20tertarik%20dengan%20portofolio%20Anda`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-[0.98] ${
                                        isDark
                                            ? 'bg-white text-black hover:bg-neutral-200'
                                            : 'bg-black text-white hover:bg-neutral-800'
                                    }`}
                                >
                                    <i className="ph-bold ph-whatsapp-logo text-base text-emerald-500"></i>
                                    <span>WA: {phone}</span>
                                </a>

                                <button
                                    onClick={copyEmailToClipboard}
                                    aria-label="Salin Alamat Email"
                                    className={`px-3.5 sm:px-4 py-2.5 border rounded-xl text-xs font-mono font-bold transition-colors flex items-center gap-2 cursor-pointer active:scale-[0.98] ${
                                        isDark
                                            ? 'bg-white/5 hover:bg-white/15 text-white border-white/15'
                                            : 'bg-black/5 hover:bg-black/15 text-black border-black/15'
                                    }`}
                                >
                                    <i className="ph-bold ph-envelope-simple text-sm"></i>
                                    <span>{copiedEmail ? 'Email Disalin!' : email}</span>
                                </button>

                                <a
                                    href="https://linkedin.com/in/azzasafah"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-3.5 sm:px-4 py-2.5 border rounded-xl text-xs font-mono font-bold transition-colors flex items-center gap-2 active:scale-[0.98] ${
                                        isDark
                                            ? 'bg-white/5 hover:bg-white/15 text-white border-white/15'
                                            : 'bg-black/5 hover:bg-black/15 text-black border-black/15'
                                    }`}
                                >
                                    <i className="ph-bold ph-linkedin-logo text-base text-indigo-400"></i>
                                    <span>in/azzasafah</span>
                                </a>

                                <a
                                    href="https://github.com/Azzasafah"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-3.5 sm:px-4 py-2.5 border rounded-xl text-xs font-mono font-bold transition-colors flex items-center gap-2 active:scale-[0.98] ${
                                        isDark
                                            ? 'bg-white/5 hover:bg-white/15 text-white border-white/15'
                                            : 'bg-black/5 hover:bg-black/15 text-black border-black/15'
                                    }`}
                                >
                                    <i className="ph-bold ph-github-logo text-base"></i>
                                    <span>github/Azzasafah</span>
                                </a>
                            </div>
                        </div>

                        {/* Right Chisa Hologram Frame (5 cols) */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end reveal-init reveal-delay-2">
                            <div
                                className={`relative w-full max-w-[260px] sm:max-w-[300px] rounded-3xl border p-3.5 shadow-2xl group transition-all duration-500 overflow-hidden ${
                                    isDark
                                        ? 'bg-[#0e0e12] border-white/15 hover:border-white/35 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
                                        : 'bg-white border-black/15 hover:border-black/35 shadow-[0_12px_36px_rgba(0,0,0,0.08)]'
                                }`}
                            >
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
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> CHISA.SYS
                                    </span>
                                    <span className="font-semibold tracking-wider">AI // COMPANION</span>
                                </div>

                                <div
                                    className={`relative rounded-2xl overflow-hidden aspect-[4/5] border ${
                                        isDark ? 'bg-[#050507] border-white/10' : 'bg-[#f0f0f2] border-black/10'
                                    }`}
                                >
                                    <picture>
                                        <source srcSet="/chisa.webp" type="image/webp" />
                                        <img
                                            src="/chisa.png"
                                            alt="Chisa Companion Visual"
                                            width="300"
                                            height="375"
                                            loading="eager"
                                            fetchPriority="high"
                                            decoding="async"
                                            className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=300&auto=format&fit=crop';
                                            }}
                                        />
                                    </picture>
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-70 pointer-events-none ${
                                            isDark ? 'from-[#0e0e12]' : 'from-white'
                                        }`}
                                    />
                                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                                        <span
                                            className={`text-[8px] font-mono px-2 py-0.5 rounded border backdrop-blur-xs ${
                                                isDark
                                                    ? 'text-neutral-300 bg-black/70 border-white/20'
                                                    : 'text-neutral-800 bg-white/85 border-black/20 font-bold'
                                            }`}
                                        >
                                            HOLOGRAPHIC_UNIT
                                        </span>
                                        <span
                                            className={`text-[8px] font-mono px-2 py-0.5 rounded border ${
                                                isDark
                                                    ? 'text-emerald-400 bg-black/70 border-emerald-500/30'
                                                    : 'text-emerald-700 bg-emerald-50 border-emerald-300 font-bold'
                                            }`}
                                        >
                                            ACTIVE
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className={`mt-2.5 px-1 flex items-center justify-between text-[8px] font-mono uppercase tracking-[0.15em] ${
                                        isDark ? 'text-neutral-400' : 'text-neutral-500'
                                    }`}
                                >
                                    <span>DATA_ENG_BACKEND</span>
                                    <span>V2026.9</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 1: PORTFOLIO (WITH SCROLL REVEAL & CUSTOM BUTTON OPTIONS) */}
            {/* ========================================================================= */}
            <section id="portfolio" className="relative z-10 py-18 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto scroll-mt-20">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 reveal-init">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            <span
                                className={`text-xs font-mono font-bold uppercase tracking-[0.18em] ${
                                    isDark ? 'text-neutral-400' : 'text-neutral-500'
                                }`}
                            >
                                SELEKSI PROYEK & KARYA UNGGULAN
                            </span>
                        </div>
                        <h2
                            className={`font-display text-2xl sm:text-4xl font-extrabold tracking-tight uppercase ${
                                isDark ? 'text-white' : 'text-black'
                            }`}
                        >
                            Portfolio
                        </h2>
                    </div>

                    {/* Dynamic Tag Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        {availableProjectTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setActiveProjectFilter(tag)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 ${
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
                        className={`p-14 text-center rounded-3xl border reveal-init ${
                            isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                        }`}
                    >
                        <i className="ph-bold ph-folder-open text-4xl mb-3 opacity-40"></i>
                        <p className={`text-sm font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            Belum ada proyek dengan tag ini.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredProjects.map((proj, idx) => {
                            const buttonMode = proj.button_display_mode || 'both';
                            const showLive = (buttonMode === 'both' || buttonMode === 'live') && proj.live_url;
                            const showGithub = (buttonMode === 'both' || buttonMode === 'github') && proj.github_url;
                            const onlyOneButton = (showLive && !showGithub) || (!showLive && showGithub);

                            return (
                                <article
                                    key={proj.id}
                                    className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between group transition-all duration-300 relative overflow-hidden reveal-init ${
                                        idx % 2 === 1 ? 'reveal-delay-1' : ''
                                    } ${
                                        isDark
                                            ? 'bg-[#111116]/85 border-white/10 hover:border-white/30 hover:bg-[#15151c] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]'
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
                                                0{idx + 1} // PORTFOLIO_PROJ
                                            </span>
                                        </div>

                                        <h3
                                            className={`font-display text-lg sm:text-xl font-bold transition-colors leading-snug mb-3 tracking-tight ${
                                                isDark
                                                    ? 'text-white group-hover:text-neutral-100'
                                                    : 'text-black group-hover:text-neutral-800'
                                            }`}
                                        >
                                            {proj.title}
                                        </h3>

                                        <p
                                            className={`text-xs sm:text-sm leading-relaxed mb-6 font-sans ${
                                                isDark ? 'text-neutral-400' : 'text-neutral-600'
                                            }`}
                                        >
                                            {proj.portfolio_summary ||
                                                proj.description ||
                                                'Implementasi arsitektur teruji siap production.'}
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

                                    {/* Action Row - Respecting User's Configured Button Mode */}
                                    {(showLive || showGithub) && (
                                        <div
                                            className={`flex items-center gap-2 pt-4 border-t mt-auto ${
                                                isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                                            }`}
                                        >
                                            {showLive && (
                                                <a
                                                    href={proj.live_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`${
                                                        onlyOneButton ? 'w-full' : 'flex-1'
                                                    } py-2.5 px-3 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] ${
                                                        isDark
                                                            ? 'bg-white text-black hover:bg-neutral-200'
                                                            : 'bg-black text-white hover:bg-neutral-800'
                                                    }`}
                                                >
                                                    <i className="ph-bold ph-arrow-square-out text-sm"></i> Live Demo
                                                </a>
                                            )}
                                            {showGithub && (
                                                <a
                                                    href={proj.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`${
                                                        onlyOneButton ? 'w-full' : 'flex-1'
                                                    } py-2.5 px-3 border rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                                                        isDark
                                                            ? 'bg-white/5 hover:bg-white/15 text-white border-white/15'
                                                            : 'bg-black/5 hover:bg-black/15 text-black border-black/15'
                                                    }`}
                                                >
                                                    <i className="ph-bold ph-github-logo text-base"></i> Code / GitHub
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* ========================================================================= */}
            {/* SECTION 2: FREELANCE PROJECTS (DINAMIS DARI CMS + REFINED BADGES) */}
            {/* ========================================================================= */}
            <section
                id="freelance"
                className={`relative z-10 py-18 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto border-t scroll-mt-20 transition-colors duration-500 ${
                    isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                }`}
            >
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 reveal-init">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                            <span
                                className={`text-xs font-mono font-bold uppercase tracking-[0.18em] ${
                                    isDark ? 'text-neutral-400' : 'text-neutral-500'
                                }`}
                            >
                                KONTRAK & PROYEK KLIEN (DINAMIS)
                            </span>
                        </div>
                        <h2
                            className={`font-display text-2xl sm:text-4xl font-extrabold tracking-tight uppercase ${
                                isDark ? 'text-white' : 'text-black'
                            }`}
                        >
                            Freelance Projects
                        </h2>
                    </div>

                    <div className="text-xs font-mono text-neutral-500">
                        Total {freelanceProjects.length} Proyek Dinamis Terkelola
                    </div>
                </div>

                {freelanceProjects.length === 0 ? (
                    <div
                        className={`p-14 text-center rounded-3xl border reveal-init ${
                            isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                        }`}
                    >
                        <i className="ph-bold ph-briefcase text-4xl mb-3 opacity-40"></i>
                        <p className={`text-sm font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            Belum ada data proyek freelance yang dipublikasikan.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedFreelance.map((fProj, idx) => (
                                <article
                                    key={fProj.id}
                                    className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between group transition-all duration-300 relative overflow-hidden reveal-init ${
                                        idx % 3 === 1 ? 'reveal-delay-1' : idx % 3 === 2 ? 'reveal-delay-2' : ''
                                    } ${
                                        isDark
                                            ? 'bg-[#111116]/85 border-white/10 hover:border-white/30 hover:bg-[#15151c] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]'
                                            : 'bg-white border-black/10 hover:border-black/30 hover:shadow-xl'
                                    }`}
                                >
                                    <div className="space-y-3.5">
                                        {/* Refined Client Badge & Period Row (No Overflows/Awkward Wraps) */}
                                        <div className="flex items-center justify-between gap-2">
                                            <span
                                                title={fProj.client_name}
                                                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase border flex items-center gap-1.5 truncate max-w-[175px] sm:max-w-[195px] ${
                                                    isDark
                                                        ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                                                        : 'bg-cyan-50 text-cyan-800 border-cyan-200'
                                                }`}
                                            >
                                                <i className="ph-bold ph-buildings shrink-0"></i>
                                                <span className="truncate">{fProj.client_name}</span>
                                            </span>

                                            <span
                                                className={`text-[11px] font-mono font-bold shrink-0 ${
                                                    isDark ? 'text-neutral-400' : 'text-neutral-500'
                                                }`}
                                            >
                                                {fProj.period || '-'}
                                            </span>
                                        </div>

                                        <div>
                                            <h3
                                                className={`font-display text-lg font-bold transition-colors leading-snug tracking-tight ${
                                                    isDark ? 'text-white' : 'text-black'
                                                }`}
                                            >
                                                {fProj.title}
                                            </h3>
                                            {fProj.role_scope && (
                                                <p
                                                    className={`text-xs font-mono font-semibold mt-1 ${
                                                        isDark ? 'text-neutral-300' : 'text-neutral-700'
                                                    }`}
                                                >
                                                    {fProj.role_scope}
                                                </p>
                                            )}
                                        </div>

                                        {fProj.description && (
                                            <p
                                                className={`text-xs sm:text-sm leading-relaxed font-sans ${
                                                    isDark ? 'text-neutral-400' : 'text-neutral-600'
                                                }`}
                                            >
                                                {fProj.description}
                                            </p>
                                        )}

                                        {Array.isArray(fProj.tech_stack) && fProj.tech_stack.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 pt-1">
                                                {fProj.tech_stack.map((tech, tIdx) => (
                                                    <span
                                                        key={tIdx}
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

                                    {/* Bottom Action Row */}
                                    <div
                                        className={`flex items-center gap-2 pt-4 border-t mt-5 ${
                                            isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                                        }`}
                                    >
                                        {fProj.project_url && (
                                            <a
                                                href={fProj.project_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] ${
                                                    isDark
                                                        ? 'bg-white text-black hover:bg-neutral-200'
                                                        : 'bg-black text-white hover:bg-neutral-800'
                                                }`}
                                            >
                                                <i className="ph-bold ph-arrow-square-out text-sm"></i> Detail Proyek
                                            </a>
                                        )}
                                        {fProj.github_url && (
                                            <a
                                                href={fProj.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`py-2 px-3 border rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                                                    isDark
                                                        ? 'bg-white/5 hover:bg-white/15 text-white border-white/15'
                                                        : 'bg-black/5 hover:bg-black/15 text-black border-black/15'
                                                }`}
                                            >
                                                <i className="ph-bold ph-github-logo text-base"></i> GitHub
                                            </a>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Freelance Pagination Controls */}
                        {totalFreelancePages > 1 && (
                            <div className="flex items-center justify-center gap-2 pt-10 reveal-init">
                                <button
                                    onClick={() => setFreelancePage((prev) => Math.max(prev - 1, 1))}
                                    disabled={freelancePage === 1}
                                    aria-label="Previous Page"
                                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                                        isDark
                                            ? 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                                            : 'bg-white hover:bg-slate-50 text-black border-slate-200 shadow-xs'
                                    }`}
                                >
                                    &larr; Prev
                                </button>

                                {Array.from({ length: totalFreelancePages }, (_, i) => i + 1).map((pg) => (
                                    <button
                                        key={pg}
                                        onClick={() => setFreelancePage(pg)}
                                        className={`w-9 h-9 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                                            freelancePage === pg
                                                ? isDark
                                                    ? 'bg-white text-black shadow-md'
                                                    : 'bg-black text-white shadow-md'
                                                : isDark
                                                ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10'
                                                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                                        }`}
                                    >
                                        {pg}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setFreelancePage((prev) => Math.min(prev + 1, totalFreelancePages))}
                                    disabled={freelancePage === totalFreelancePages}
                                    aria-label="Next Page"
                                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                                        isDark
                                            ? 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                                            : 'bg-white hover:bg-slate-50 text-black border-slate-200 shadow-xs'
                                    }`}
                                >
                                    Next &rarr;
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* ========================================================================= */}
            {/* SECTION 3: WORK & INTERNSHIP EXPERIENCE */}
            {/* ========================================================================= */}
            <section
                id="experience"
                className={`relative z-10 py-18 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto border-t scroll-mt-20 transition-colors duration-500 ${
                    isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                }`}
            >
                <div className="mb-10 reveal-init">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span
                            className={`text-xs font-mono font-bold uppercase tracking-[0.18em] ${
                                isDark ? 'text-neutral-400' : 'text-neutral-500'
                            }`}
                        >
                            REKAM JEJAK & PROGRAM MAGANG
                        </span>
                    </div>
                    <h2
                        className={`font-display text-2xl sm:text-4xl font-extrabold tracking-tight uppercase ${
                            isDark ? 'text-white' : 'text-black'
                        }`}
                    >
                        Pengalaman Kerja & Magang
                    </h2>
                </div>

                <div className="space-y-4">
                    {workExperiences.map((exp, expIdx) => (
                        <div
                            key={expIdx}
                            className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 reveal-init ${
                                expIdx % 2 === 1 ? 'reveal-delay-1' : ''
                            } ${
                                isDark
                                    ? 'bg-[#111116]/85 border-white/10 hover:border-white/25'
                                    : 'bg-white border-black/10 hover:border-black/25 shadow-xs'
                            }`}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <span
                                            className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase border ${
                                                isDark
                                                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                                                    : 'bg-amber-50 text-amber-800 border-amber-200'
                                            }`}
                                        >
                                            {exp.badge}
                                        </span>
                                    </div>
                                    <h3
                                        className={`font-display text-lg sm:text-xl font-bold tracking-tight ${
                                            isDark ? 'text-white' : 'text-black'
                                        }`}
                                    >
                                        {exp.title}
                                    </h3>
                                    <p
                                        className={`text-xs sm:text-sm font-mono font-semibold flex items-center gap-1.5 mt-0.5 ${
                                            isDark ? 'text-neutral-300' : 'text-neutral-700'
                                        }`}
                                    >
                                        <i className="ph-bold ph-buildings text-neutral-400"></i>
                                        {exp.company}
                                    </p>
                                </div>

                                <span
                                    className={`text-xs font-mono font-bold px-3 py-1 rounded-xl border shrink-0 ${
                                        isDark
                                            ? 'bg-white/5 text-neutral-300 border-white/10'
                                            : 'bg-black/5 text-neutral-700 border-black/10'
                                    }`}
                                >
                                    {exp.period}
                                </span>
                            </div>

                            <ul className="space-y-1.5 mb-4 pl-4 list-disc marker:text-neutral-400">
                                {exp.points.map((pt, pIdx) => (
                                    <li
                                        key={pIdx}
                                        className={`text-xs sm:text-sm leading-relaxed font-sans ${
                                            isDark ? 'text-neutral-400' : 'text-neutral-600'
                                        }`}
                                    >
                                        {pt}
                                    </li>
                                ))}
                            </ul>

                            {exp.tech && exp.tech.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.05] dark:border-white/[0.05]">
                                    {exp.tech.map((t, tIdx) => (
                                        <span
                                            key={tIdx}
                                            className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${
                                                isDark
                                                    ? 'bg-white/5 text-neutral-300 border-white/10'
                                                    : 'bg-black/5 text-neutral-700 border-black/10'
                                            }`}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 4: SKILLS & TOOLKIT */}
            {/* ========================================================================= */}
            <section
                id="skills"
                className={`relative z-10 py-18 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto border-t scroll-mt-20 transition-colors duration-500 ${
                    isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                }`}
            >
                <div className="mb-10 reveal-init">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        <span
                            className={`text-xs font-mono font-bold uppercase tracking-[0.18em] ${
                                isDark ? 'text-neutral-400' : 'text-neutral-500'
                            }`}
                        >
                            KEAHLIAN & KOMPETENSI TEKNIS
                        </span>
                    </div>
                    <h2
                        className={`font-display text-2xl sm:text-4xl font-extrabold tracking-tight uppercase ${
                            isDark ? 'text-white' : 'text-black'
                        }`}
                    >
                        Skills & Toolkit
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {skillCategories.map((cat, sIdx) => (
                        <div
                            key={sIdx}
                            className={`p-6 rounded-3xl border flex flex-col justify-between reveal-init ${
                                sIdx % 3 === 1 ? 'reveal-delay-1' : sIdx % 3 === 2 ? 'reveal-delay-2' : ''
                            } ${
                                isDark
                                    ? 'bg-[#111116]/85 border-white/10 hover:border-white/25'
                                    : 'bg-white border-black/10 hover:border-black/25 shadow-xs'
                            }`}
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${
                                            isDark ? 'bg-white/10 text-white' : 'bg-black text-white'
                                        }`}
                                    >
                                        <i className={`ph-bold ${cat.icon}`}></i>
                                    </div>
                                    <h3
                                        className={`font-display font-bold text-base tracking-tight ${
                                            isDark ? 'text-white' : 'text-black'
                                        }`}
                                    >
                                        {cat.title}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                    {cat.skills.map((skill, kIdx) => (
                                        <span
                                            key={kIdx}
                                            className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${
                                                isDark
                                                    ? 'bg-white/5 text-neutral-300 border-white/10'
                                                    : 'bg-black/5 text-neutral-800 border-black/10 font-medium'
                                            }`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 5: CERTIFICATIONS & CREDENTIALS WITH PAGINATION */}
            {/* ========================================================================= */}
            <section
                id="certifications"
                className={`relative z-10 py-18 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto border-t scroll-mt-20 transition-colors duration-500 ${
                    isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                }`}
            >
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 reveal-init">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span
                                className={`text-xs font-mono font-bold uppercase tracking-[0.18em] ${
                                    isDark ? 'text-neutral-400' : 'text-neutral-500'
                                }`}
                            >
                                KREDENSIAL & PENGHARGAAN RESMI
                            </span>
                        </div>
                        <h2
                            className={`font-display text-2xl sm:text-4xl font-extrabold tracking-tight uppercase ${
                                isDark ? 'text-white' : 'text-black'
                            }`}
                        >
                            Sertifikasi & Kredensial
                        </h2>
                    </div>

                    {/* Filter Type Toggle Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => handleCertFilterChange('ALL')}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 ${
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
                            onClick={() => handleCertFilterChange('official')}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
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
                            onClick={() => handleCertFilterChange('internship')}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
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
                        className={`p-14 text-center rounded-3xl border reveal-init ${
                            isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                        }`}
                    >
                        <i className="ph-bold ph-certificate text-4xl mb-3 opacity-40"></i>
                        <p className={`text-sm font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            Belum ada sertifikasi dalam kategori ini.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {paginatedCertifications.map((cert, idx) => (
                                <div
                                    key={cert.id}
                                    className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between group transition-all duration-300 relative overflow-hidden reveal-init ${
                                        idx % 2 === 1 ? 'reveal-delay-1' : ''
                                    } ${
                                        isDark
                                            ? 'bg-[#111116]/85 border-white/10 hover:border-white/30 hover:bg-[#15151c] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]'
                                            : 'bg-white border-black/10 hover:border-black/30 hover:shadow-xl'
                                    }`}
                                >
                                    <div className="space-y-3.5">
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
                                                className={`font-display text-lg sm:text-xl font-bold transition-colors leading-snug tracking-tight ${
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
                                                className={`text-xs sm:text-sm leading-relaxed font-sans ${
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

                                    {/* Bottom Pinned Verification Bar */}
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
                                                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 active:scale-[0.98] shadow-sm ${
                                                    isDark
                                                        ? 'bg-white text-black hover:bg-neutral-200'
                                                        : 'bg-black text-white hover:bg-neutral-800'
                                                }`}
                                            >
                                                <i className="ph-bold ph-arrow-square-out text-sm"></i>
                                                Verifikasi
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

                        {/* Certifications Pagination Controls */}
                        {totalCertPages > 1 && (
                            <div className="flex items-center justify-center gap-2 pt-10 reveal-init">
                                <button
                                    onClick={() => setCertPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={certPage === 1}
                                    aria-label="Previous Page"
                                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                                        isDark
                                            ? 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                                            : 'bg-white hover:bg-slate-50 text-black border-slate-200 shadow-xs'
                                    }`}
                                >
                                    &larr; Prev
                                </button>

                                {Array.from({ length: totalCertPages }, (_, i) => i + 1).map((pg) => (
                                    <button
                                        key={pg}
                                        onClick={() => setCertPage(pg)}
                                        className={`w-9 h-9 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                                            certPage === pg
                                                ? isDark
                                                    ? 'bg-white text-black shadow-md'
                                                    : 'bg-black text-white shadow-md'
                                                : isDark
                                                ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10'
                                                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                                        }`}
                                    >
                                        {pg}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCertPage((prev) => Math.min(prev + 1, totalCertPages))}
                                    disabled={certPage === totalCertPages}
                                    aria-label="Next Page"
                                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                                        isDark
                                            ? 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                                            : 'bg-white hover:bg-slate-50 text-black border-slate-200 shadow-xs'
                                    }`}
                                >
                                    Next &rarr;
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* ========================================================================= */}
            {/* SECTION 6: EDUCATION & ACADEMIC BACKGROUND */}
            {/* ========================================================================= */}
            <section
                id="education"
                className={`relative z-10 py-18 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto border-t scroll-mt-20 transition-colors duration-500 ${
                    isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                }`}
            >
                <div className="mb-10 reveal-init">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span
                            className={`text-xs font-mono font-bold uppercase tracking-[0.18em] ${
                                isDark ? 'text-neutral-400' : 'text-neutral-500'
                            }`}
                        >
                            LATAR BELAKANG AKADEMIK
                        </span>
                    </div>
                    <h2
                        className={`font-display text-2xl sm:text-4xl font-extrabold tracking-tight uppercase ${
                            isDark ? 'text-white' : 'text-black'
                        }`}
                    >
                        Pendidikan & Skripsi
                    </h2>
                </div>

                <div
                    className={`p-7 sm:p-9 rounded-3xl border relative overflow-hidden reveal-init ${
                        isDark
                            ? 'bg-[#111116]/85 border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]'
                            : 'bg-white border-black/10 shadow-sm'
                    }`}
                >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div>
                            <span
                                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase border mb-2 inline-block ${
                                    isDark
                                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                }`}
                            >
                                CUM LAUDE &bull; GPA 3.90 / 4.00
                            </span>
                            <h3
                                className={`font-display text-xl sm:text-2xl font-black uppercase tracking-tight ${
                                    isDark ? 'text-white' : 'text-black'
                                }`}
                            >
                                Sarjana Teknik Informatika (S.Kom)
                            </h3>
                            <p
                                className={`text-xs sm:text-sm font-mono font-bold mt-1 ${
                                    isDark ? 'text-neutral-300' : 'text-neutral-700'
                                }`}
                            >
                                Universitas Dr. Soetomo — Surabaya, Indonesia
                            </p>
                        </div>

                        <span
                            className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl border shrink-0 ${
                                isDark
                                    ? 'bg-white/5 text-neutral-300 border-white/10'
                                    : 'bg-black/5 text-neutral-700 border-black/10'
                            }`}
                        >
                            Juni 2018 – Agust 2022
                        </span>
                    </div>

                    <div
                        className={`p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-2 ${
                            isDark ? 'bg-white/[0.02] border-white/10' : 'bg-slate-50 border-slate-200'
                        }`}
                    >
                        <p className="font-semibold font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                            // JUDUL SKRIPSI & KARYA AKHIR
                        </p>
                        <p className="font-sans">
                            <strong>Perancangan Game Edukasi Pengenalan dan Pencegahan Covid-19 dengan Klasifikasi Penyakit Covid-19 Menggunakan Metode Logistic Regression.</strong>
                        </p>
                        <p className={`text-xs font-sans ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            Menggabungkan konsep game-based learning interaktif dengan penerapan machine learning untuk meningkatkan pemahaman masyarakat terhadap protokol kesehatan dan klasifikasi gejala klinis.
                        </p>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
            {/* ========================================================================= */}
            <section
                id="faq"
                className={`relative z-10 py-18 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto border-t scroll-mt-20 transition-colors duration-500 ${
                    isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                }`}
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left Sticky Header & Filter Area (4 cols) */}
                    <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-28 reveal-init">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                            <span
                                className={`font-bold tracking-wider uppercase ${
                                    isDark ? 'text-neutral-300' : 'text-neutral-700'
                                }`}
                            >
                                FAQ // 質疑応答
                            </span>
                        </div>

                        <h2
                            className={`font-display text-2xl sm:text-4xl font-extrabold tracking-tight uppercase ${
                                isDark ? 'text-white' : 'text-black'
                            }`}
                        >
                            Pertanyaan Umum
                        </h2>

                        <p
                            className={`text-xs sm:text-sm font-sans leading-relaxed ${
                                isDark ? 'text-neutral-400' : 'text-neutral-600'
                            }`}
                        >
                            Informasi seputar ketersediaan kerja (*Open to Work*), pendekatan data pipeline & backend development, serta alur kolaborasi freelance.
                        </p>

                        {/* Category Filter Pills */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                            {faqCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFaqCategory(cat)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 ${
                                        activeFaqCategory === cat
                                            ? isDark
                                                ? 'bg-white text-black shadow-sm'
                                                : 'bg-black text-white shadow-sm'
                                            : isDark
                                            ? 'bg-white/5 hover:bg-white/10 text-neutral-400 border border-white/10'
                                            : 'bg-black/5 hover:bg-black/10 text-neutral-600 border border-black/10'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Accordion List (8 cols) */}
                    <div className="lg:col-span-8 space-y-3.5 reveal-init reveal-delay-1">
                        {filteredFaqs.length === 0 ? (
                            <div
                                className={`p-12 text-center rounded-3xl border ${
                                    isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                                }`}
                            >
                                <i className="ph-bold ph-question text-4xl mb-3 opacity-40"></i>
                                <p className={`text-sm font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                    Belum ada FAQ dalam kategori ini.
                                </p>
                            </div>
                        ) : (
                            filteredFaqs.map((faq, fIdx) => {
                                const isOpen = openFaqId === faq.id;
                                return (
                                    <div
                                        key={faq.id}
                                        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                                            isDark
                                                ? isOpen
                                                    ? 'bg-[#15151c] border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                                                    : 'bg-[#111116]/80 border-white/10 hover:border-white/20'
                                                : isOpen
                                                ? 'bg-white border-black/30 shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
                                                : 'bg-white border-black/10 hover:border-black/20'
                                        }`}
                                    >
                                        {/* Question Header */}
                                        <button
                                            type="button"
                                            onClick={() => toggleFaq(faq.id)}
                                            aria-expanded={isOpen}
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
                                                        className={`font-display text-sm sm:text-base font-bold tracking-tight ${
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
                            })
                        )}
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 8: CONTACT & DIRECT COLLABORATION BANNER */}
            {/* ========================================================================= */}
            <section
                id="contact"
                className={`relative z-10 py-18 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto border-t scroll-mt-20 transition-colors duration-500 ${
                    isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                }`}
            >
                <div
                    className={`p-8 sm:p-14 rounded-3xl border text-center relative overflow-hidden backdrop-blur-xl reveal-init ${
                        isDark
                            ? 'bg-gradient-to-b from-[#14141a] to-[#0a0a0e] border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
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
                            className={`font-display text-2xl sm:text-4xl font-black uppercase tracking-tight ${
                                isDark ? 'text-white' : 'text-black'
                            }`}
                        >
                            Siap Memulai Kolaborasi?
                        </h2>
                        <p
                            className={`text-xs sm:text-sm font-sans leading-relaxed ${
                                isDark ? 'text-neutral-400' : 'text-neutral-600'
                            }`}
                        >
                            Tertarik untuk merekrut Data Engineer, Backend / Fullstack Web Developer, atau mendiskusikan kebutuhan proyek freelance? Mari hubungi saya untuk diskusi teknis dan jadwal kerja sama.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                            <a
                                href={`https://wa.me/62${phone.substring(1)}?text=Halo%20Safah,%20saya%20ingin%20berdiskusi%20tentang%20peluang%20kerja%20atau%20proyek`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-5 sm:px-6 py-3 rounded-xl text-xs font-mono font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-[0.98] ${
                                    isDark
                                        ? 'bg-white text-black hover:bg-neutral-200'
                                        : 'bg-black text-white hover:bg-neutral-800'
                                }`}
                            >
                                <i className="ph-bold ph-whatsapp-logo text-base text-emerald-500"></i>
                                <span>WA: {phone}</span>
                            </a>

                            <button
                                onClick={copyEmailToClipboard}
                                aria-label="Salin Alamat Email"
                                className={`px-5 sm:px-6 py-3 border rounded-xl text-xs font-mono font-bold transition-colors flex items-center gap-2 cursor-pointer active:scale-[0.98] ${
                                    isDark
                                        ? 'bg-white/5 hover:bg-white/15 text-white border-white/15'
                                        : 'bg-black/5 hover:bg-black/15 text-black border-black/15'
                                }`}
                            >
                                <i className="ph-bold ph-envelope text-base"></i>
                                <span>{copiedEmail ? 'Email Berhasil Disalin!' : email}</span>
                            </button>

                            <a
                                href="https://linkedin.com/in/azzasafah"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-5 sm:px-6 py-3 border rounded-xl text-xs font-mono font-bold transition-colors flex items-center gap-2 active:scale-[0.98] ${
                                    isDark
                                        ? 'bg-white/5 hover:bg-white/15 text-white border-white/15'
                                        : 'bg-black/5 hover:bg-black/15 text-black border-black/15'
                                }`}
                            >
                                <i className="ph-bold ph-linkedin-logo text-base text-indigo-400"></i>
                                <span>in/azzasafah</span>
                            </a>

                            <a
                                href="https://github.com/Azzasafah"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-5 sm:px-6 py-3 border rounded-xl text-xs font-mono font-bold transition-colors flex items-center gap-2 active:scale-[0.98] ${
                                    isDark
                                        ? 'bg-white/5 hover:bg-white/15 text-white border-white/15'
                                        : 'bg-black/5 hover:bg-black/15 text-black border-black/15'
                                }`}
                            >
                                <i className="ph-bold ph-github-logo text-base"></i>
                                <span>github/Azzasafah</span>
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
                        ? 'border-white/10 bg-[#070709] text-neutral-400'
                        : 'border-black/10 bg-[#f4f4f6] text-neutral-600'
                }`}
            >
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <p className={`font-display font-bold tracking-wide ${isDark ? 'text-white' : 'text-black'}`}>
                            MUHAMMAD HAFIZH AZZASAFAH (SAFAH) &copy; 2026
                        </p>
                        <p
                            className={`text-[11px] mt-1 ${
                                isDark ? 'text-neutral-400' : 'text-neutral-500'
                            }`}
                        >
                            Data Engineering &bull; Fullstack Backend &bull; Cloud Infrastructure. Crafted with Taste Design & Monochrome Aesthetic.
                        </p>
                    </div>

                    <div className={`flex flex-wrap items-center gap-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        <a href="#portfolio" className="hover:underline">Portfolio</a>
                        <span>&bull;</span>
                        <a href="#freelance" className="hover:underline">Freelance</a>
                        <span>&bull;</span>
                        <a href="#experience" className="hover:underline">Pengalaman</a>
                        <span>&bull;</span>
                        <a href="#skills" className="hover:underline">Keahlian</a>
                        <span>&bull;</span>
                        <a href="#certifications" className="hover:underline">Sertifikasi</a>
                        <span>&bull;</span>
                        <a href="#faq" className="hover:underline">FAQ</a>
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

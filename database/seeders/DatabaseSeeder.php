<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Task;
use App\Models\LearningJournal;
use App\Models\KajianSchedule;
use App\Models\SleepLog;
use App\Models\RefreshingActivity;
use App\Models\Certification;
use App\Models\Faq;
use App\Models\FreelanceProject;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin User (Kredensial disamarkan melalui UserSeeder & .env)
        $this->call(UserSeeder::class);
        $user = User::first();

        // 2. Tasks & Portfolio Projects (from CV)
        $tasks = [
            [
                'title' => 'Grocery Store API Testing — Katalon Studio & k6',
                'description' => 'Merancang dan mengeksekusi 18+ test case untuk Simple Grocery Store API menggunakan Katalon Studio pada 7 endpoint utama (products, cart, order, auth). Dilengkapi Smoke Testing, E2E Flow, Negative Testing, serta performance testing menggunakan k6 hingga 1.000 concurrent users.',
                'status' => 'done',
                'tag' => 'Backend',
                'priority' => 'high',
                'date_label' => 'Selesai',
                'due_date' => Carbon::yesterday(),
                'order_index' => 0,
                'is_portfolio' => true,
                'portfolio_summary' => 'Automated API Testing & Performance Benchmark dengan 18+ test case di Katalon Studio, validasi Bearer Token, dan simulasi beban 1.000 concurrent users dengan k6.',
                'github_url' => 'https://github.com/Azzasafah/grocery-api-katalon-test',
                'live_url' => 'https://shorturl.at/yk1kz',
                'tech_stack' => ['Katalon Studio', 'Groovy', 'REST API', 'k6', 'Postman'],
            ],
            [
                'title' => 'Grocery Store Web UI Automation — Katalon Studio',
                'description' => 'Membangun UI automation testing web Grocery Store dengan 30+ step pengujian pada 4 alur utama: autentikasi, katalog produk, keranjang belanja, dan manajemen pesanan. Menerapkan dynamic test data timestamp dan Page Object Model.',
                'status' => 'done',
                'tag' => 'Frontend',
                'priority' => 'high',
                'date_label' => 'Selesai',
                'due_date' => Carbon::today()->subDays(2),
                'order_index' => 1,
                'is_portfolio' => true,
                'portfolio_summary' => 'Web UI Automation testing end-to-end dengan Katalon Studio, dynamic test data anti-duplikasi, dan struktur Object Repository berbasis halaman.',
                'github_url' => 'https://github.com/Azzasafah/grocery-web-ui-katalon-test',
                'live_url' => 'https://github.com/Azzasafah/grocery-web-ui-katalon-test',
                'tech_stack' => ['Katalon Studio', 'Groovy', 'Web UI Automation', 'POM'],
            ],
            [
                'title' => 'Grocery Store App — Express.js Web Application',
                'description' => 'Aplikasi web toko grosir online berbasis Express.js dengan arsitektur MVC modular (17 REST API endpoints), session authentication, cart management, dan order fulfillment yang di-deploy ke Vercel.',
                'status' => 'done',
                'tag' => 'Backend',
                'priority' => 'high',
                'date_label' => 'Selesai',
                'due_date' => Carbon::today()->subDays(4),
                'order_index' => 2,
                'is_portfolio' => true,
                'portfolio_summary' => 'Aplikasi web toko grosir MVC dengan Express.js, integrasi REST API eksternal, dan arsitektur routing modular (AUT untuk pengujian UI).',
                'github_url' => 'https://github.com/Azzasafah/Grocery-Store-App',
                'live_url' => 'https://grocery-store-app.vercel.app',
                'tech_stack' => ['Node.js', 'Express.js', 'REST API', 'JavaScript', 'Vercel'],
            ],
            [
                'title' => 'Fullstack Point of Sales (POS) & Payment Gateway',
                'description' => 'Aplikasi POS modern fullstack terpisah (Next.js frontend & Express.js backend), autentikasi JWT aman, integrasi Midtrans payment gateway, dan deployment production (Predikat Best Graduate Sinau Koding).',
                'status' => 'done',
                'tag' => 'Backend',
                'priority' => 'high',
                'date_label' => 'Selesai',
                'due_date' => Carbon::today()->subDays(6),
                'order_index' => 3,
                'is_portfolio' => true,
                'portfolio_summary' => 'Aplikasi kasir (POS) end-to-end dengan Next.js, Express.js API, JWT authentication, dan integrasi payment gateway Midtrans.',
                'github_url' => 'https://github.com/Azzasafah',
                'live_url' => 'https://shorturl.at/TY7So',
                'tech_stack' => ['Next.js', 'Express.js', 'Midtrans', 'JWT', 'Tailwind CSS'],
            ],
            [
                'title' => 'Refactor Test Suites & CI/CD Pipeline Integration',
                'description' => 'Optimasi script automasi test suite dan konfigurasi GitHub Actions workflow.',
                'status' => 'in_progress',
                'tag' => 'Backend',
                'priority' => 'high',
                'date_label' => 'Sedang dikerjakan',
                'due_date' => Carbon::today(),
                'order_index' => 0,
                'is_portfolio' => false,
            ],
            [
                'title' => 'Eksplorasi Performance Load Testing dengan k6 Scripting',
                'description' => 'Menyusun skenario spike testing dan stress testing untuk REST API endpoints.',
                'status' => 'todo',
                'tag' => 'Cloud',
                'priority' => 'medium',
                'date_label' => 'Besok',
                'due_date' => Carbon::tomorrow(),
                'order_index' => 0,
                'is_portfolio' => false,
            ],
        ];

        foreach ($tasks as $taskData) {
            $user->tasks()->create($taskData);
        }

        // 3. Freelance Projects (Dynamic)
        $freelanceProjects = [
            [
                'title' => 'Sistem Informasi Manajemen Tugas Akhir & Seminar',
                'client_name' => 'Fakultas Teknik Universitas Dr. Soetomo',
                'role_scope' => 'Fullstack Web Developer',
                'period' => 'Apr 2021 – Jul 2021',
                'tech_stack' => ['CodeIgniter', 'PHP', 'MySQL', 'Bootstrap', 'UML', 'ERD'],
                'description' => 'Merancang dan mengembangkan sistem informasi digital untuk pendaftaran, bimbingan, dan seminar tugas akhir mahasiswa Fakultas Teknik. Mendigitalkan alur administrasi akademik dan meraih nilai akhir "A".',
                'project_url' => 'https://github.com/Azzasafah',
                'github_url' => 'https://github.com/Azzasafah',
                'status' => 'completed',
                'order_index' => 0,
                'is_active' => true,
            ],
            [
                'title' => 'Simulasi Konsultasi Implementasi HR Software & Feasibility Analysis',
                'client_name' => 'BIPO x Rakamin Academy',
                'role_scope' => 'Project Consultant',
                'period' => 'Nov 2023 – Des 2023',
                'tech_stack' => ['Microsoft Excel', 'Pivot Table', 'SWOT Analysis', 'Data Analysis'],
                'description' => 'Mengolah data kepegawaian dan melakukan analisis performa menggunakan Microsoft Excel (pivot table, data visualization) serta analisis SWOT untuk menyusun strategi negosiasi dan rencana implementasi perangkat lunak HR.',
                'project_url' => 'https://github.com/Azzasafah',
                'github_url' => 'https://github.com/Azzasafah',
                'status' => 'completed',
                'order_index' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Digitalisasi Sistem Pendaftaran Pasien & UML Architecture Mapping',
                'client_name' => 'Klinik GO x Rakamin Academy',
                'role_scope' => 'Health System Analyst',
                'period' => 'Jan 2023 – Feb 2023',
                'tech_stack' => ['UML', 'DFD', 'ERD', 'Use Case Diagram', 'System Architecture'],
                'description' => 'Merancang dokumentasi sistem komprehensif dan memetakan alur kerja registrasi pasien bagi tiga jenis pengguna (pasien, admin, front office) menggunakan DFD, Activity Diagram, Sequence Diagram, dan ERD.',
                'project_url' => 'https://github.com/Azzasafah',
                'github_url' => 'https://github.com/Azzasafah',
                'status' => 'completed',
                'order_index' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Business Intelligence & Sales Transaction Analytics Dashboard',
                'client_name' => 'Bank Muamalat x Rakamin Academy',
                'role_scope' => 'BI & Data Analyst',
                'period' => 'Sep 2022 – Okt 2022',
                'tech_stack' => ['Microsoft Excel', 'Microsoft Access', 'Data Analytics', 'BI Reporting'],
                'description' => 'Menganalisis data transaksi multi-sumber (produk, kategori, nasabah) dan membangun dashboard analitis untuk memvisualisasikan tren penjualan serta memberikan rekomendasi bundling produk strategis.',
                'project_url' => 'https://github.com/Azzasafah',
                'github_url' => 'https://github.com/Azzasafah',
                'status' => 'completed',
                'order_index' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Re-engineering SOP & Bug Tracking Workflow System',
                'client_name' => 'Rakamin Academy Internal Platform',
                'role_scope' => 'Data Governance & Process Specialist',
                'period' => 'Des 2024 – Jan 2025',
                'tech_stack' => ['SOP Design', 'Process Mapping', 'Bug Reporting Template', 'Flowchart'],
                'description' => 'Mengevaluasi dan merancang ulang alur SOP pelaporan bug antara tim support dan developer, menyederhanakan alur prosedural, dan membuat template bug report standar yang meningkatkan kecepatan respons penanganan kendala teknis.',
                'project_url' => 'https://github.com/Azzasafah',
                'github_url' => 'https://github.com/Azzasafah',
                'status' => 'completed',
                'order_index' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($freelanceProjects as $fp) {
            $user->freelanceProjects()->create($fp);
        }

        // 4. Learning Journals
        $journals = [
            [
                'title' => 'Konsep Manual Testing & STLC (Software Testing Life Cycle)',
                'category' => 'Data Engineering',
                'study_date' => Carbon::today(),
                'snippet' => 'Mempelajari metodologi penyusunan test case terstruktur, pemetaan skenario positif dan negatif, eksekusi pengujian fungsionalitas, serta pelaporan defect defect-tracking lifecycle dalam kerangka kerja Agile / Scrum.',
                'content' => "## Software Testing Life Cycle (STLC) & Test Strategy\n\nSTLC adalah rangkaian proses terstruktur untuk memastikan kualitas perangkat lunak memenuhi kriteria fungsional dan non-fungsional.\n\n### Tahapan Utama STLC:\n1. **Requirement Analysis**: Membedah Functional Specification Document (FSD) dan User Stories.\n2. **Test Planning**: Menentukan cakupan, jadwal, dan sumber daya pengujian.\n3. **Test Case Development**: Merancang skenario positif, negatif, dan boundary value analysis (BVA).\n4. **Test Environment Setup**: Mempersiapkan server testing dan test data dinamis.\n5. **Test Execution**: Eksekusi test suites dan pencatatan hasil (Pass/Fail).\n6. **Test Cycle Closure**: Evaluasi defect density dan laporan kesiapan rilis (RTM).",
                'tags' => ['QA', 'ManualTesting', 'STLC', 'TestCases', 'BugReport'],
            ],
            [
                'title' => 'Automasi API Testing dengan Katalon Studio & k6 Load Testing',
                'category' => 'Cloud Computing',
                'study_date' => Carbon::yesterday(),
                'snippet' => 'Implementasi automasi pengujian REST API menggunakan script Groovy di Katalon Studio dan pengujian beban kinerja tinggi menggunakan k6 untuk memvalidasi throughput serta latency sistem saat menangani 1.000 concurrent virtual users.',
                'content' => "## Arsitektur Automasi API & Performance Testing\n\n### 1. Test Suite Katalon Studio (Groovy):\n- **Smoke Testing**: Validasi endpoint kesehatan sistem (`/status`, status code 200).\n- **E2E Flow**: Registrasi user $\\rightarrow$ Pembuatan Cart $\\rightarrow$ Checkout Order $\\rightarrow$ Validasi Bearer Token.\n- **Negative Testing**: Simulasi invalid payload dan validasi error handler 400/401/404.\n\n### 2. k6 Performance Testing Script:\n```javascript\nimport http from 'k6/http';\nimport { check, sleep } from 'k6';\n\nexport const options = {\n  stages: [\n    { duration: '30s', target: 50 },\n    { duration: '1m', target: 200 },\n    { duration: '30s', target: 0 },\n  ],\n};\n\nexport default function () {\n  const res = http.get('https://api.grocerystore.com/products');\n  check(res, { 'status is 200': (r) => r.status === 200 });\n  sleep(1);\n}\n```",
                'tags' => ['KatalonStudio', 'k6', 'Groovy', 'APITesting', 'PerformanceTesting'],
            ],
            [
                'title' => 'Query SQL Lanjutan: Window Functions, Stored Procedures & Triggers',
                'category' => 'Data Engineering',
                'study_date' => Carbon::today()->subDays(3),
                'snippet' => 'Penerapan fungsi analitik SQL tingkat lanjut (ROW_NUMBER, RANK, OVER PARTITION BY, CASE WHEN) dan pembuatan Stored Procedures serta Triggers untuk integritas data transaksional skala besar.',
                'content' => "## Advanced SQL & Query Optimization\n\n### 1. Window Functions (OVER PARTITION BY):\nMemungkinkan kalkulasi agregat tanpa menghilangkan detail baris individual.\n\n```sql\nSELECT \n    customer_id,\n    order_date,\n    total_amount,\n    SUM(total_amount) OVER(PARTITION BY customer_id ORDER BY order_date) as running_total,\n    ROW_NUMBER() OVER(PARTITION BY customer_id ORDER BY order_date DESC) as latest_order_rank\nFROM orders;\n```\n\n### 2. Stored Procedures & Transaction Safety:\nMencegah race condition dan memastikan operasi multi-tabel berjalan secara atomik (ACID).",
                'tags' => ['SQL', 'Database', 'WindowFunctions', 'StoredProcedures', 'MySQL'],
            ],
        ];

        foreach ($journals as $journalData) {
            $user->learningJournals()->create($journalData);
        }

        // 5. Kajian Schedules
        $kajians = [
            [
                'title' => 'Kajian Fiqih Muamalah: Etika & Kejujuran dalam Bekerja',
                'speaker' => 'Ustadz Dr. Firanda Andirja, M.A.',
                'event_date' => Carbon::today()->addDays(2),
                'time_info' => '09:00 WIB',
                'location' => 'Masjid Raya As-Sunnah',
                'notes' => 'Menjaga amanah dalam setiap baris kode dan tanggung jawab profesional. Bekerja dengan niat ibadah mendatangkan keberkahan.',
                'is_completed' => false,
            ],
            [
                'title' => 'Tafsir Al-Baqarah: Menjaga Integritas & Kesabaran',
                'speaker' => 'Ustadz Abu Yahya Badrusalam, Lc.',
                'event_date' => Carbon::today()->addDays(5),
                'time_info' => 'Ba\'da Maghrib',
                'location' => 'Masjid Al-Hidayah',
                'notes' => 'Pentingnya ketabahan dalam menghadapi ujian hidup dan selalu berpegang teguh pada prinsip kebenaran.',
                'is_completed' => false,
            ],
            [
                'title' => 'Adab Menuntut Ilmu & Keutamaan Amal Shalih',
                'speaker' => 'Ustadz Muhammad Nuzul Dzikri, Lc.',
                'event_date' => Carbon::today()->subDays(4),
                'time_info' => 'Ba\'da Isya',
                'location' => 'Masjid Nurul Iman',
                'notes' => 'Ikatlah ilmu dengan menuliskannya dan amalkan apa yang telah dipelajari agar bermanfaat bagi sesama.',
                'is_completed' => true,
            ],
        ];

        foreach ($kajians as $kajianData) {
            $user->kajianSchedules()->create($kajianData);
        }

        // 6. Refreshing Activities
        $activities = [
            [
                'title' => 'Main Game (RPG / Strategy)',
                'category' => 'Gaming',
                'icon' => 'ph-game-controller',
                'color' => 'emerald',
                'last_done_date' => Carbon::today()->subDays(2),
                'notes' => 'Main game 1 jam untuk relaksasi kognitif.',
            ],
            [
                'title' => 'Olahraga & Jogging Sore',
                'category' => 'Sport',
                'icon' => 'ph-sneaker',
                'color' => 'orange',
                'last_done_date' => Carbon::yesterday(),
                'notes' => 'Lari santai 3km di taman.',
            ],
            [
                'title' => 'Nonton Tech Podcast / Dokumenter',
                'category' => 'Entertainment',
                'icon' => 'ph-film-strip',
                'color' => 'blue',
                'last_done_date' => Carbon::today(),
                'notes' => 'Nonton serial software engineering case studies.',
            ],
            [
                'title' => 'Ngopi & Santai Sore',
                'category' => 'Relaxation',
                'icon' => 'ph-coffee',
                'color' => 'purple',
                'last_done_date' => Carbon::today()->subDays(3),
                'notes' => 'Menikmati seduhan kopi manual brew.',
            ],
        ];

        foreach ($activities as $act) {
            $user->refreshingActivities()->create($act);
        }

        // 7. Certifications (All from CV)
        $certifications = [
            [
                'title' => 'Microsoft Certified: Azure Fundamentals (AZ-900)',
                'issuer' => 'Microsoft (Digital Talent Scholarship Kominfo)',
                'type' => 'official',
                'issue_date' => 'Agust 2023',
                'credential_id' => 'MS-AZ900-849120',
                'credential_url' => 'https://learn.microsoft.com/en-us/users/azzasafah',
                'skills' => ['Microsoft Azure', 'Cloud Computing', 'Security', 'SLA & Governance', 'Virtual Machines'],
                'description' => 'Sertifikasi resmi Microsoft yang memvalidasi pemahaman mendalam tentang konsep cloud, arsitektur layanan Azure, manajemen keamanan, privasi, dan kepatuhan infrastruktur.',
                'order_index' => 0,
                'is_active' => true,
            ],
            [
                'title' => 'Microsoft Certified: Azure Data Fundamentals (DP-900)',
                'issuer' => 'Microsoft (Digital Talent Scholarship Kominfo)',
                'type' => 'official',
                'issue_date' => 'Agust 2023',
                'credential_id' => 'MS-DP900-512984',
                'credential_url' => 'https://learn.microsoft.com/en-us/users/azzasafah',
                'skills' => ['Azure SQL', 'Cosmos DB', 'Data Lake Storage', 'Relational & Non-Relational Data', 'Azure Synapse'],
                'description' => 'Sertifikasi resmi Microsoft untuk konsep dasar pemrosesan data relasional dan non-relasional, data warehouse, serta beban kerja analitik modern di platform Azure.',
                'order_index' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
                'issuer' => 'Microsoft (Digital Talent Scholarship Kominfo)',
                'type' => 'official',
                'issue_date' => 'Agust 2023',
                'credential_id' => 'MS-AI900-721093',
                'credential_url' => 'https://learn.microsoft.com/en-us/users/azzasafah',
                'skills' => ['Azure AI Services', 'Computer Vision', 'NLP', 'Machine Learning Fundamentals', 'Conversational AI'],
                'description' => 'Sertifikasi resmi Microsoft yang membuktikan pemahaman fundamental beban kerja kecerdasan buatan (AI/ML) dan implementasi layanan Azure Cognitive Services.',
                'order_index' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Sertifikasi Kompetensi Programmer Komputer (BNSP)',
                'issuer' => 'Badan Nasional Sertifikasi Profesi (BNSP)',
                'type' => 'official',
                'issue_date' => '2022 – 2025',
                'credential_id' => 'BNSP-TI-PRG-88219',
                'credential_url' => 'https://bnsp.go.id',
                'skills' => ['Pemrograman Berorientasi Objek', 'Database Query', 'Software Design', 'Algoritma', 'Clean Code'],
                'description' => 'Sertifikasi standar kompetensi kerja nasional Indonesia (SKKNI) bidang keahlian rekayasa perangkat lunak dan pemrograman komputer.',
                'order_index' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Database Course Level Advanced (Nilai: 80/100)',
                'issuer' => 'ITBOX Indonesia',
                'type' => 'official',
                'issue_date' => 'Desember 2025',
                'credential_id' => 'ITBOX-SQL-ADV-80',
                'credential_url' => 'https://itbox.id',
                'skills' => ['SQL Lanjutan', 'Window Function', 'OVER PARTITION', 'Stored Procedure', 'Trigger', 'Query Optimization'],
                'description' => 'Menyelesaikan modul tingkat lanjut pengolahan database kompleks, optimasi query, manajemen transaksi, dan lulus ujian akhir dengan predikat memuaskan (80/100).',
                'order_index' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'TOEFL ITP / GE-EPT (Skor: 577)',
                'issuer' => 'Lembaga Bahasa / Educational Testing',
                'type' => 'official',
                'issue_date' => '2026 (Valid s.d. Apr 2027)',
                'credential_id' => 'TOEFL-577-HAFIZH',
                'credential_url' => 'mailto:muhammad.hafizh0408@gmail.com',
                'skills' => ['English Proficiency', 'Technical Reading', 'Listening Comprehension', 'Written Expression'],
                'description' => 'Membuktikan kecakapan bahasa Inggris tingkat Intermediate–Upper untuk komunikasi profesional, dokumentasi teknis, dan kolaborasi global.',
                'order_index' => 5,
                'is_active' => true,
            ],
            [
                'title' => 'Bootcamp Fullstack Web Developer (Predikat Best Graduate)',
                'issuer' => 'Sinau Koding Academy',
                'type' => 'official',
                'issue_date' => 'Jan 2026',
                'credential_id' => 'SK-FS-BEST-2026',
                'credential_url' => 'https://shorturl.at/TY7So',
                'skills' => ['Next.js', 'Express.js', 'REST API', 'Midtrans', 'JWT Auth', 'Vercel Deployment'],
                'description' => 'Lulusan terbaik (peringkat 1 dengan nilai tertinggi) dalam pengembangan proyek aplikasi Point of Sales (POS) end-to-end terintegrasi sistem pembayaran Midtrans.',
                'order_index' => 6,
                'is_active' => true,
            ],
            [
                'title' => 'Binarian Impact Scholarship Batch 1 (Gold Challenge Award)',
                'issuer' => 'Binar Academy',
                'type' => 'official',
                'issue_date' => 'Agust 2023',
                'credential_id' => 'BINAR-GOLD-CHALLENGE-01',
                'credential_url' => 'https://www.binaracademy.com',
                'skills' => ['React.js', 'Node.js', 'Express.js', 'Git Collaboration', 'Taiga PM'],
                'description' => 'Terpilih melalui seleksi beasiswa kompetitif, memimpin pengembangan proyek akhir tim, dan meraih penghargaan Gold Challenge (nilai evaluasi tertinggi).',
                'order_index' => 7,
                'is_active' => true,
            ],
            [
                'title' => 'Backend Developer Internship — Evermos',
                'issuer' => 'Evermos x Rakamin Academy',
                'type' => 'internship',
                'issue_date' => 'Juli 2025 – Agust 2025',
                'credential_id' => 'EVR-RAKAMIN-BE-2025',
                'credential_url' => 'https://github.com/Azzasafah',
                'skills' => ['Golang', 'SQL', 'Clean Code', 'Modular Architecture', 'Query Optimization'],
                'description' => 'Terlibat dalam studi kasus dan proyek backend nyata di lingkungan Evermos, berkolaborasi lintas tim Product & Marketing, serta mengimplementasikan layanan backend Golang skala production.',
                'order_index' => 8,
                'is_active' => true,
            ],
            [
                'title' => 'Data Governance Virtual Intern (Skor: 92.33 / 100)',
                'issuer' => 'Rakamin Academy Virtual Internship',
                'type' => 'internship',
                'issue_date' => 'Des 2024 – Jan 2025',
                'credential_id' => 'RAKAMIN-DG-9233',
                'credential_url' => 'https://github.com/Azzasafah',
                'skills' => ['Data Governance', 'SOP Re-engineering', 'Bug Reporting Process', 'Flowchart'],
                'description' => 'Merancang ulang alur SOP pelaporan bug antara tim support dan engineer internal, menciptakan template bug report standar, dan meraih skor evaluasi 92.33.',
                'order_index' => 9,
                'is_active' => true,
            ],
            [
                'title' => 'Fullstack Web Developer Intern — Universitas Dr. Soetomo',
                'issuer' => 'Fakultas Teknik Universitas Dr. Soetomo',
                'type' => 'internship',
                'issue_date' => 'Apr 2021 – Jul 2021',
                'credential_id' => 'UNITOMO-FT-DEV-01',
                'credential_url' => 'https://github.com/Azzasafah',
                'skills' => ['CodeIgniter', 'PHP', 'MySQL', 'UML Architecture', 'ERD Design'],
                'description' => 'Membangun aplikasi web sistem informasi manajemen tugas akhir Fakultas Teknik, mendokumentasikan arsitektur sistem, dan meraih nilai akhir "A".',
                'order_index' => 10,
                'is_active' => true,
            ],
        ];

        foreach ($certifications as $cert) {
            $user->certifications()->create($cert);
        }

        // 8. FAQs (Frequently Asked Questions from CV context)
        $faqs = [
            [
                'question' => 'Apa keahlian dan fokus utama spesialisasi Anda?',
                'answer' => 'Saya berfokus pada Software Quality Assurance (QA Engineer) — mencakup Manual Testing, API Automation & Web UI Automation menggunakan Katalon Studio & Groovy, serta Performance Testing dengan k6. Selain itu, saya memiliki fondasi kuat dalam Fullstack Web Engineering (Laravel, Next.js, Express.js, React, Golang) dan Cloud Platform (3x Microsoft Azure Certified: AZ-900, DP-900, AI-900).',
                'category' => 'Technical',
                'order_index' => 0,
                'is_active' => true,
            ],
            [
                'question' => 'Apakah Anda terbuka untuk pekerjaan Full-time, Kontrak, atau Freelance Project?',
                'answer' => 'Ya, sangat terbuka! Saya siap berkontribusi secara Full-time, Remote, Kontrak, maupun mengerjakan proyek Freelance untuk pengujian perangkat lunak (QA Automation / Manual Testing), pengembangan website, sistem informasi instansi, maupun integrasi API.',
                'category' => 'General',
                'order_index' => 1,
                'is_active' => true,
            ],
            [
                'question' => 'Bagaimana metodologi Anda dalam memastikan kualitas perangkat lunak (QA)?',
                'answer' => 'Saya menerapkan tahapan STLC yang sistematis: analisis kebutuhan dokumen (FSD/User Stories), penyusunan test scenario & test case positif/negatif, pembuatan dynamic test data untuk mencegah duplikasi, implementasi Page Object Model (POM), eksekusi regression & smoke testing terotomasi di Katalon Studio, serta pengujian beban sistem dengan k6.',
                'category' => 'Technical',
                'order_index' => 2,
                'is_active' => true,
            ],
            [
                'question' => 'Bagaimana rekam jejak akademik dan penghargaan yang pernah Anda raih?',
                'answer' => 'Saya lulusan Sarjana Teknik Informatika dengan predikat Cum Laude (IPK 3.90 / 4.00), peraih predikat Best Graduate (Peringkat 1 Nilai Tertinggi) di Bootcamp Fullstack Sinau Koding Academy, peraih Gold Challenge Award di Binar Academy, serta Asisten Dosen Laboratorium Database.',
                'category' => 'General',
                'order_index' => 3,
                'is_active' => true,
            ],
            [
                'question' => 'Bagaimana cara menghubungi dan memulai diskusi proyek freelance atau wawancara kerja?',
                'answer' => 'Anda dapat langsung menghubungi saya melalui WhatsApp / Telepon di 081805429182, email ke muhammad.hafizh0408@gmail.com, atau via profil LinkedIn di linkedin.com/in/azzasafah. Saya siap merespons secara cepat dan profesional.',
                'category' => 'Work Collaboration',
                'order_index' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($faqs as $faq) {
            $user->faqs()->create($faq);
        }

        // 8. SafahFlow (ADE Bootcamp 36 Sesi, 5 Projects, Spiritual & Chores)
        $this->call(SafahFlowMasterSeeder::class);
    }
}


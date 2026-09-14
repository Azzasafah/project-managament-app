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

        // Clean user's previous portfolio/cv seeds to ensure clean idempotency
        Task::where('user_id', $user->id)->delete();
        FreelanceProject::where('user_id', $user->id)->delete();
        Certification::where('user_id', $user->id)->delete();
        Faq::where('user_id', $user->id)->delete();
        LearningJournal::where('user_id', $user->id)->delete();
        KajianSchedule::where('user_id', $user->id)->delete();
        RefreshingActivity::where('user_id', $user->id)->delete();

        // 2. Tasks & Portfolio Projects (8 Portfolio Projects from GitHub Repositories)
        $tasks = [
            [
                'title' => 'Express Mini ERP — REST API & Inventory Management',
                'description' => 'Membangun arsitektur backend REST API modular untuk sistem ERP mini (PO, SO, stok produk, karyawan, laporan). Menggunakan Express 5, Prisma 7, PostgreSQL, autentikasi JWT dengan role-based access control, Joi validation, export ExcelJS, dan dokumentasi Swagger UI.',
                'status' => 'done',
                'tag' => 'Backend',
                'priority' => 'high',
                'date_label' => 'Selesai',
                'due_date' => Carbon::today()->subDays(1),
                'order_index' => 0,
                'is_portfolio' => true,
                'button_display_mode' => 'github',
                'portfolio_summary' => 'REST API sistem ERP mini mencakup modul pembelian (PO), penjualan (SO), manajemen inventaris dengan pergerakan stok atomic, manajemen karyawan, dan pelaporan export Excel (.xlsx) dengan Node.js, Express 5, Prisma ORM, dan PostgreSQL.',
                'github_url' => 'https://github.com/Azzasafah/Express-MiniERP',
                'live_url' => null,
                'tech_stack' => ['Node.js', 'Express 5', 'Prisma ORM', 'PostgreSQL', 'JWT', 'Joi', 'Swagger UI', 'ExcelJS'],
            ],
            [
                'title' => 'Procurement API — Enterprise Procurement Lifecycle',
                'description' => 'Arsitektur backend enterprise dengan Laravel 11, PHP 8.2, dan MySQL. Dilengkapi otentikasi Sanctum Bearer Token, kontrol akses 3 level (Employee, Manager, Admin), manajemen vendor & stok multi-gudang, serta reporting analitik rata-rata lead time dan summary belanja.',
                'status' => 'done',
                'tag' => 'Backend',
                'priority' => 'high',
                'date_label' => 'Selesai',
                'due_date' => Carbon::today()->subDays(2),
                'order_index' => 1,
                'is_portfolio' => true,
                'button_display_mode' => 'github',
                'portfolio_summary' => 'RESTful API enterprise untuk alur lengkap pengadaan barang (procurement lifecycle): draft employee, approval bertingkat manager/admin, penugasan vendor, pemantauan stok otomatis, order procurement, hingga delivery tracking dan laporan analitik KPI.',
                'github_url' => 'https://github.com/Azzasafah/Procurement-API',
                'live_url' => null,
                'tech_stack' => ['Laravel 11', 'PHP 8.2', 'MySQL', 'Sanctum', 'RESTful API', 'Clean Architecture', 'RBAC'],
            ],
            [
                'title' => 'POS API Backend — Point of Sale & Midtrans Gateway',
                'description' => 'Layanan backend POS terstruktur siap produksi: mencakup autentikasi OTP & JWT, otorisasi berbasis peran (Admin & Cashier), CRUD kategori & produk dengan upload MinIO S3-compatible, transaksi POS cash/Midtrans, callback webhook, dan laporan keuangan transaksi.',
                'status' => 'done',
                'tag' => 'Backend',
                'priority' => 'high',
                'date_label' => 'Selesai',
                'due_date' => Carbon::today()->subDays(3),
                'order_index' => 2,
                'is_portfolio' => true,
                'button_display_mode' => 'github',
                'portfolio_summary' => 'Backend layanan Point of Sale (POS) modular dengan Node.js & Express, Prisma ORM, integrasi Midtrans Snap payment gateway, MinIO object storage untuk gambar produk, SMTP Mailer OTP, dan JWT authentication.',
                'github_url' => 'https://github.com/safahdev/backend-pos',
                'live_url' => null,
                'tech_stack' => ['Node.js', 'Express.js', 'Prisma ORM', 'Midtrans', 'MinIO', 'JWT', 'PostgreSQL', 'SMTP Mailer'],
            ],
            [
                'title' => 'Frontend POS — Point of Sale Cashier Interface',
                'description' => 'Frontend kasir POS modern dibangun dengan Next.js dan Tailwind CSS. Terhubung langsung dengan backend POS untuk manajemen data produk, pencarian cepat, kalkulasi subtotal transaksi kasir, serta integrasi popup pembayaran Midtrans Snap.',
                'status' => 'done',
                'tag' => 'Frontend',
                'priority' => 'high',
                'date_label' => 'Selesai',
                'due_date' => Carbon::today()->subDays(4),
                'order_index' => 3,
                'is_portfolio' => true,
                'button_display_mode' => 'github',
                'portfolio_summary' => 'Antarmuka web kasir POS modern berbasis Next.js dan Tailwind CSS yang terintegrasi dengan POS API Backend, mendukung katalog produk responsif, keranjang kasir real-time, dan modal checkout pembayaran Midtrans Snap.',
                'github_url' => 'https://github.com/safahdev/frontend-pos',
                'live_url' => null,
                'tech_stack' => ['Next.js', 'React', 'Tailwind CSS', 'Midtrans Snap', 'REST API', 'JavaScript'],
            ],
            [
                'title' => 'Mulia Karya — E-Commerce & Custom Furniture Fabrication Tracking',
                'description' => 'Aplikasi fullstack Laravel 12 & Tailwind CSS dengan estetika premium craftsmanship. Mencakup 8 modul utama: katalog produk SVLK, custom studio 3D, pelacakan live milestone proyek, multi-gateway Midtrans (SHA-512) & QRIS, notifikasi otomatis WhatsApp Gateway (Fonnte API), dan admin backoffice CMS.',
                'status' => 'done',
                'tag' => 'Fullstack',
                'priority' => 'high',
                'date_label' => 'Selesai',
                'due_date' => Carbon::today()->subDays(5),
                'order_index' => 4,
                'is_portfolio' => true,
                'button_display_mode' => 'github',
                'portfolio_summary' => 'Platform web digitalisasi mebel Jepara: katalog furnitur kayu solid oven (SVLK), studio custom order & 3D interior, live milestone tracking progres workshop, pembayaran Midtrans & QRIS, serta notifikasi WhatsApp Fonnte & Email transaksional.',
                'github_url' => 'https://github.com/Azzasafah/mulia-karya-umkm-furnitur',
                'live_url' => null,
                'tech_stack' => ['Laravel 12', 'Tailwind CSS', 'Midtrans', 'WhatsApp Gateway', 'PHP 8.2', 'MySQL', 'SEO JSON-LD'],
            ],
            [
                'title' => 'Berdikari Tofu Platform — D2C E-Commerce & Admin CMS',
                'description' => 'Aplikasi web modern memadukan frontend responsif React & Inertia.js dengan backend Laravel 11. Memiliki checkout WhatsApp otomatis terstruktur, katalog produk dinamis, manajemen testimoni & FAQ, pengaturan toko fleksibel, dan SEO metadata Schema.org.',
                'status' => 'done',
                'tag' => 'Fullstack',
                'priority' => 'high',
                'date_label' => 'Selesai',
                'due_date' => Carbon::today()->subDays(6),
                'order_index' => 5,
                'is_portfolio' => true,
                'button_display_mode' => 'github',
                'portfolio_summary' => 'Platform e-commerce D2C untuk digitalisasi UMKM produsen tahu segar: katalog varian interaktif, pemesanan instan 1-klik via WhatsApp dengan kalkulator subtotal otomatis, embed Google Maps lokasi produksi, serta dashboard admin CMS dinamis.',
                'github_url' => 'https://github.com/Azzasafah/berdikari-tofu-platform',
                'live_url' => null,
                'tech_stack' => ['Laravel 11', 'Inertia.js', 'React', 'Tailwind CSS', 'WhatsApp Order Flow', 'MySQL', 'Vite'],
            ],
            [
                'title' => 'Grocery Store API Testing — Katalon Studio',
                'description' => 'Merancang dan mengeksekusi 18+ automated test case pada Simple Grocery Store API menggunakan Katalon Studio (Groovy). Menguji alur lengkap: health check status, pembuatan cart, penambahan & update item, registrasi client, validasi Bearer Token, pembuatan order, hingga verifikasi penanganan error (status 400, 401, 404).',
                'status' => 'done',
                'tag' => 'QA Automation',
                'priority' => 'high',
                'date_label' => 'Selesai',
                'due_date' => Carbon::today()->subDays(7),
                'order_index' => 6,
                'is_portfolio' => true,
                'button_display_mode' => 'github',
                'portfolio_summary' => 'Automated API Testing untuk Simple Grocery Store API menggunakan Katalon Studio & Groovy pada 7 endpoint utama (products, cart, order, clients). Dilengkapi Smoke Testing, E2E Positive Journey, Negative Testing, validasi Bearer Token, dan dynamic test data.',
                'github_url' => 'https://github.com/Azzasafah/grocery-api-katalon-test',
                'live_url' => null,
                'tech_stack' => ['Katalon Studio', 'Groovy', 'REST API', 'Postman', 'Test Automation', 'API Testing'],
            ],
            [
                'title' => 'Grocery Store Web UI Automation — Katalon Studio',
                'description' => 'Membangun UI automation testing web Grocery Store dengan 30+ step pengujian pada 4 alur utama: autentikasi, katalog produk, keranjang belanja, dan manajemen pesanan. Menerapkan dynamic test data timestamp dan Object Repository terstruktur berbasis halaman (POM).',
                'status' => 'done',
                'tag' => 'QA Automation',
                'priority' => 'high',
                'date_label' => 'Selesai',
                'due_date' => Carbon::today()->subDays(8),
                'order_index' => 7,
                'is_portfolio' => true,
                'button_display_mode' => 'both',
                'portfolio_summary' => 'Web UI Automation testing end-to-end untuk aplikasi web Grocery Store dengan Katalon Studio, dynamic test data anti-duplikasi, Page Object Model (POM), dan validasi alur checkout nyata.',
                'github_url' => 'https://github.com/Azzasafah/grocery-web-ui-katalon-test',
                'live_url' => 'https://grocery-store-app-seven.vercel.app',
                'tech_stack' => ['Katalon Studio', 'Groovy', 'Web UI Automation', 'Selenium-based', 'POM'],
            ],
            [
                'title' => 'Refactor Test Suites & CI/CD Pipeline Integration',
                'description' => 'Optimasi script automasi test suite dan konfigurasi GitHub Actions workflow untuk continuous testing.',
                'status' => 'in_progress',
                'tag' => 'Backend',
                'priority' => 'high',
                'date_label' => 'Sedang dikerjakan',
                'due_date' => Carbon::today(),
                'order_index' => 0,
                'is_portfolio' => false,
            ],
            [
                'title' => 'Eksplorasi Cloud Infrastructure & Containerization',
                'description' => 'Membangun arsitektur deployment menggunakan Docker container dan orkestrasi microservice berbasis cloud.',
                'status' => 'todo',
                'tag' => 'Cloud',
                'priority' => 'medium',
                'date_label' => 'Besok',
                'due_date' => Carbon::tomorrow(),
                'order_index' => 1,
                'is_portfolio' => false,
            ],
        ];

        foreach ($tasks as $taskData) {
            $user->tasks()->create($taskData);
        }

        // 3. Freelance Projects / Magang (Dynamic)
        // Aturan: Drive link = project_url (Detail Proyek), GitHub link = github_url, Keduanya = isi keduanya
        $freelanceProjects = [
            [
                'title' => 'Sistem Informasi Manajemen Tugas Akhir & Seminar',
                'client_name' => 'Fakultas Teknik Universitas Dr. Soetomo',
                'role_scope' => 'Fullstack Web Developer',
                'period' => 'Apr 2021 – Jul 2021',
                'tech_stack' => ['CodeIgniter', 'PHP', 'MySQL', 'Bootstrap', 'UML', 'ERD'],
                'description' => 'Merancang dan mengembangkan sistem informasi digital untuk pendaftaran, bimbingan, dan seminar tugas akhir mahasiswa Fakultas Teknik. Mendigitalkan alur administrasi akademik dan meraih nilai akhir "A".',
                'project_url' => 'https://drive.google.com/file/d/1Wqk2qeqlswQxsr4xcQSizIyy8obuuuN6/view',
                'github_url' => 'https://github.com/br4masta/ci4app-Project-Tugas-Akhir',
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
                'project_url' => 'https://drive.google.com/drive/folders/1KbPZsgMy2EwDpQSJ0BUHTPz7VB7ID-h3?usp=drive_link',
                'github_url' => null,
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
                'project_url' => 'https://best-emu-e9d.notion.site/Project-Based-Virtual-Intern-fb58b73147714ce2a2070ea99d1eef8a',
                'github_url' => null,
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
                'project_url' => 'https://drive.google.com/file/d/1isuTOao2y1Cs6zzWOXtfMrp9dKI0n5xI/view',
                'github_url' => null,
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
                'project_url' => 'https://drive.google.com/drive/folders/10c42kus7vjdGmf6k1hbLeiq81zJye-_b?usp=drive_link',
                'github_url' => null,
                'status' => 'completed',
                'order_index' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($freelanceProjects as $fp) {
            $user->freelanceProjects()->create($fp);
        }

        // 4. Learning Journals (No k6)
        $journals = [
            [
                'title' => 'Konsep Manual Testing & STLC (Software Testing Life Cycle)',
                'category' => 'Data Engineering',
                'study_date' => Carbon::today(),
                'snippet' => 'Mempelajari metodologi penyusunan test case terstruktur, pemetaan skenario positif dan negatif, eksekusi pengujian fungsionalitas, serta pelaporan defect-tracking lifecycle dalam kerangka kerja Agile / Scrum.',
                'content' => "## Software Testing Life Cycle (STLC) & Test Strategy\n\nSTLC adalah rangkaian proses terstruktur untuk memastikan kualitas perangkat lunak memenuhi kriteria fungsional dan non-fungsional.\n\n### Tahapan Utama STLC:\n1. **Requirement Analysis**: Membedah Functional Specification Document (FSD) dan User Stories.\n2. **Test Planning**: Menentukan cakupan, jadwal, dan sumber daya pengujian.\n3. **Test Case Development**: Merancang skenario positif, negatif, dan boundary value analysis (BVA).\n4. **Test Environment Setup**: Mempersiapkan server testing dan test data dinamis.\n5. **Test Execution**: Eksekusi test suites dan pencatatan hasil (Pass/Fail).\n6. **Test Cycle Closure**: Evaluasi defect density dan laporan kesiapan rilis (RTM).",
                'tags' => ['QA', 'ManualTesting', 'STLC', 'TestCases', 'BugReport'],
            ],
            [
                'title' => 'Automasi API Testing dengan Katalon Studio & Groovy Scripting',
                'category' => 'Cloud Computing',
                'study_date' => Carbon::yesterday(),
                'snippet' => 'Implementasi automasi pengujian REST API menggunakan script Groovy di Katalon Studio untuk memvalidasi endpoint kesehatan sistem, alur transaksi E2E, penanganan payload negatif, dan Bearer Token.',
                'content' => "## Arsitektur Automasi API Testing dengan Katalon Studio\n\n### 1. Test Suite Katalon Studio (Groovy):\n- **Smoke Testing**: Validasi endpoint kesehatan sistem (`/status`, status code 200).\n- **E2E Flow**: Registrasi user $\\rightarrow$ Pembuatan Cart $\\rightarrow$ Checkout Order $\\rightarrow$ Validasi Bearer Token.\n- **Negative Testing**: Simulasi invalid payload dan validasi error handler 400/401/404.\n- **Dynamic Test Data**: Pemanfaatan timestamp dan global variables untuk mencegah duplikasi data.",
                'tags' => ['KatalonStudio', 'Groovy', 'APITesting', 'Automation', 'Postman'],
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

        // 7. Certifications (Diperbarui dengan Google Drive Verification Links resmi)
        $certifications = [
            [
                'title' => 'Microsoft Certified: Azure Fundamentals (AZ-900)',
                'issuer' => 'Microsoft (Digital Talent Scholarship Kominfo)',
                'type' => 'official',
                'issue_date' => 'Agust 2023',
                'credential_id' => 'MS-AZ900-849120',
                'credential_url' => 'https://drive.google.com/file/d/1CR2F05c6xOJHmHdobcbun7cUs-lm157x/view?usp=drive_link',
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
                'credential_url' => 'https://drive.google.com/file/d/1OiDds-jgWYRgsV-WGSaqTggUKDuhFfBp/view?usp=drive_link',
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
                'credential_url' => 'https://drive.google.com/file/d/1QTTwkYg5Hdt9g5G8kyxxs9VMXTJKPNY1/view?usp=drive_link',
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
                'credential_url' => 'https://drive.google.com/file/d/1UouSTOAofpi61D53uOkEFDg4hRBVkl5X/view?usp=sharing',
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
                'credential_url' => 'https://github.com/safahdev/backend-pos',
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
                'credential_url' => 'https://drive.google.com/drive/folders/10c42kus7vjdGmf6k1hbLeiq81zJye-_b?usp=drive_link',
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
                'credential_url' => 'https://drive.google.com/file/d/1Wqk2qeqlswQxsr4xcQSizIyy8obuuuN6/view',
                'skills' => ['CodeIgniter', 'PHP', 'MySQL', 'UML Architecture', 'ERD Design'],
                'description' => 'Membangun aplikasi web sistem informasi manajemen tugas akhir Fakultas Teknik, mendokumentasikan arsitektur sistem, dan meraih nilai akhir "A".',
                'order_index' => 10,
                'is_active' => true,
            ],
        ];

        foreach ($certifications as $cert) {
            $user->certifications()->create($cert);
        }

        // 8. FAQs (Frequently Asked Questions from CV context - No k6)
        $faqs = [
            [
                'question' => 'Apa keahlian dan fokus utama spesialisasi Anda?',
                'answer' => 'Saya berfokus pada Software Quality Assurance (QA Engineer) — mencakup Manual Testing, API Automation & Web UI Automation menggunakan Katalon Studio & Groovy. Selain itu, saya memiliki fondasi kuat dalam Fullstack Web Engineering (Laravel, Next.js, Express.js, React, Golang) dan Cloud Platform (3x Microsoft Azure Certified: AZ-900, DP-900, AI-900).',
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
                'answer' => 'Saya menerapkan tahapan STLC yang sistematis: analisis kebutuhan dokumen (FSD/User Stories), penyusunan test scenario & test case positif/negatif, pembuatan dynamic test data untuk mencegah duplikasi, implementasi Page Object Model (POM), serta eksekusi regression & smoke testing terotomasi di Katalon Studio.',
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

        // 9. SafahFlow (ADE Bootcamp 36 Sesi, 5 Projects, Spiritual & Chores)
        $this->call(SafahFlowMasterSeeder::class);
    }
}

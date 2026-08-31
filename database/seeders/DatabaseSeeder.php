<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Task;
use App\Models\LearningJournal;
use App\Models\KajianSchedule;
use App\Models\SleepLog;
use App\Models\RefreshingActivity;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin User
        $user = User::updateOrCreate(
            ['email' => 'azzasafah0408@gmail.com'],
            [
                'name' => 'Muhammad Hafizh Azzasafah',
                'password' => Hash::make('safah04082001'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Tasks
        $tasks = [
            [
                'title' => 'Setup Laravel 12 API Routes',
                'description' => 'Membangun route RESTful dan middleware otentikasi untuk modul backend.',
                'status' => 'todo',
                'tag' => 'Backend',
                'priority' => 'high',
                'date_label' => 'Hari Ini',
                'due_date' => Carbon::today(),
                'order_index' => 0,
                'is_portfolio' => false,
            ],
            [
                'title' => 'Design ERD untuk Modul Kanban',
                'description' => 'Merancang relasi tabel dan indeks performa untuk task ordering.',
                'status' => 'todo',
                'tag' => 'Database',
                'priority' => 'medium',
                'date_label' => 'Besok',
                'due_date' => Carbon::tomorrow(),
                'order_index' => 1,
                'is_portfolio' => false,
            ],
            [
                'title' => 'Beli VPS untuk Deployment',
                'description' => 'Persiapan server Linux Ubuntu 24.04 LTS di provider cloud.',
                'status' => 'todo',
                'tag' => 'Cloud',
                'priority' => 'low',
                'date_label' => 'Lusa',
                'due_date' => Carbon::today()->addDays(2),
                'order_index' => 2,
                'is_portfolio' => false,
            ],
            [
                'title' => 'Config CI/CD Pipeline GitHub Actions',
                'description' => 'Automated test suite dan auto-deploy saat push ke main branch.',
                'status' => 'todo',
                'tag' => 'Cloud',
                'priority' => 'medium',
                'date_label' => 'Minggu Ini',
                'due_date' => Carbon::today()->addDays(4),
                'order_index' => 3,
                'is_portfolio' => false,
            ],
            [
                'title' => 'Slicing UI Dashboard Alpine + Tailwind',
                'description' => 'Menerapkan interface responsif dengan glassmorphism dan HUD waifu banner.',
                'status' => 'in_progress',
                'tag' => 'Frontend',
                'priority' => 'high',
                'date_label' => 'Sedang dikerjakan',
                'due_date' => Carbon::today(),
                'order_index' => 0,
                'is_portfolio' => false,
            ],
            [
                'title' => 'Implementasi SortableJS Drag & Drop',
                'description' => 'Integrasi library drag & drop antar kolom kanban dengan AJAX sync.',
                'status' => 'in_progress',
                'tag' => 'Frontend',
                'priority' => 'high',
                'date_label' => 'Sedang dikerjakan',
                'due_date' => Carbon::today(),
                'order_index' => 1,
                'is_portfolio' => false,
            ],
            [
                'title' => 'Instalasi & Setup Laravel Auth Split-Screen',
                'description' => 'Otentikasi kustom dengan session guard aman dan layout split-screen techwear.',
                'status' => 'done',
                'tag' => 'Auth',
                'priority' => 'high',
                'date_label' => 'Selesai',
                'due_date' => Carbon::yesterday(),
                'order_index' => 0,
                'is_portfolio' => true,
                'portfolio_summary' => 'Sistem otentikasi kustom dengan session guard aman, validasi instan, dan antarmuka split-screen futuristic branding.',
                'github_url' => 'https://github.com/example/auth-system',
                'live_url' => 'https://demo.personalhub.test',
                'tech_stack' => ['Laravel 12', 'Tailwind CSS', 'Alpine.js', 'MySQL'],
            ],
            [
                'title' => 'Automated Data Pipeline with PySpark & Lakehouse',
                'description' => 'Pipeline ETL batch harian memproses data transaksi 5GB/hari ke Delta Lakehouse.',
                'status' => 'done',
                'tag' => 'Backend',
                'priority' => 'high',
                'date_label' => 'Selesai',
                'due_date' => Carbon::today()->subDays(3),
                'order_index' => 1,
                'is_portfolio' => true,
                'portfolio_summary' => 'ETL Data Lakehouse terotomasi menggunakan PySpark, Apache Airflow, dan AWS S3 untuk analisis analitik real-time.',
                'github_url' => 'https://github.com/example/pyspark-pipeline',
                'live_url' => 'https://pipeline.demo.test',
                'tech_stack' => ['Python', 'Apache Spark', 'Airflow', 'AWS S3', 'Delta Lake'],
            ],
            [
                'title' => 'Cloud Infrastructure on AWS with Terraform IaC',
                'description' => 'Automated IaC provisioning untuk VPC multi-AZ, EKS Cluster, dan RDS PostgreSQL.',
                'status' => 'done',
                'tag' => 'Cloud',
                'priority' => 'medium',
                'date_label' => 'Selesai',
                'due_date' => Carbon::today()->subDays(5),
                'order_index' => 2,
                'is_portfolio' => true,
                'portfolio_summary' => 'Infrastruktur cloud enterprise berbasis Infrastructure as Code (IaC) dengan keamanan VPC bertingkat dan auto-scaling.',
                'github_url' => 'https://github.com/example/terraform-aws',
                'live_url' => 'https://cloud.demo.test',
                'tech_stack' => ['Terraform', 'AWS', 'Kubernetes', 'Docker'],
            ],
        ];

        foreach ($tasks as $taskData) {
            $user->tasks()->create($taskData);
        }

        // 3. Learning Journals
        $journals = [
            [
                'title' => 'Eksplorasi Apache Airflow DAGs & Operators',
                'category' => 'Data Engineering',
                'study_date' => Carbon::today(),
                'snippet' => 'Belajar membuat pipeline data sederhana dengan Directed Acyclic Graphs (DAGs) di Apache Airflow. Memahami konsep Tasks, BashOperator, PythonOperator, dan cara mengatur scheduling pipeline secara otomatis agar task berjalan berurutan sesuai dependensi.',
                'content' => "## Konsep Utama Apache Airflow\n\nApache Airflow adalah platform open-source untuk merancang, menjadwalkan, dan memantau alur kerja secara programatis.\n\n### 1. Directed Acyclic Graph (DAG)\nDAG adalah kumpulan semua tugas (tasks) yang ingin dijalankan, disusun sedemikian rupa sehingga mencerminkan hubungan dan dependensinya tanpa adanya siklus tertutup.\n\n### 2. Operators & Tasks\n- `PythonOperator`: Menjalankan fungsi Python secara langsung.\n- `BashOperator`: Menjalankan perintah shell/bash script.\n- `PostgresOperator`: Mengeksekusi query database SQL.\n\n### Contoh Implementasi Code:\n```python\nfrom airflow import DAG\nfrom airflow.operators.python import PythonOperator\nfrom datetime import datetime, timedelta\n\ndef extract_data():\n    print('Extracting transactions data...')\n\nwith DAG('daily_etl_pipeline', start_date=datetime(2026, 1, 1), schedule_interval='@daily') as dag:\n    task_extract = PythonOperator(task_id='extract', python_callable=extract_data)\n```",
                'tags' => ['Python', 'Airflow', 'Pipeline', 'ETL'],
            ],
            [
                'title' => 'Setup VPC, Subnets & NAT Gateway di AWS',
                'category' => 'Cloud Computing',
                'study_date' => Carbon::yesterday(),
                'snippet' => 'Membuat Virtual Private Cloud (VPC), mengatur public dan private subnets di multi-AZ, serta mengkonfigurasi NAT Gateway dan Internet Gateway agar instance private tetap bisa akses internet dengan aman tanpa terekspos IP Publik.',
                'content' => "## Isolasi Jaringan Tingkat Lanjut di AWS\n\n### 1. CIDR Block & Subnetting\n- VPC CIDR: `10.0.0.0/16` (65,536 IP)\n- Public Subnet AZ-a: `10.0.1.0/24`\n- Private Subnet AZ-a: `10.0.10.0/24`\n\n### 2. NAT Gateway vs Internet Gateway\nInternet Gateway menghubungkan public subnet langsung ke internet 2 arah. Sedangkan NAT Gateway diletakkan di public subnet agar resource di private subnet dapat mengunduh package/update tanpa menerima koneksi inbound dari luar.",
                'tags' => ['AWS', 'Networking', 'VPC', 'Security'],
            ],
            [
                'title' => 'Arsitektur Data Lakehouse & Apache Iceberg',
                'category' => 'Data Engineering',
                'study_date' => Carbon::today()->subDays(3),
                'snippet' => 'Memahami pergeseran dari Data Warehouse tradisional ke Modern Lakehouse. Keunggulan ACID transactions di atas Object Storage (S3/GCS), time-travel queries, schema evolution, dan format Parquet berkinerja tinggi.',
                'content' => "## Kenapa Memilih Lakehouse?\n\nLakehouse menggabungkan fleksibilitas & biaya murah dari Data Lake dengan keandalan transaksi ACID dari Data Warehouse.\n\n### Fitur Kunci Apache Iceberg:\n1. Snapshot Isolation\n2. Hidden Partitioning\n3. Schema Evolution aman tanpa rewrite full dataset.",
                'tags' => ['Lakehouse', 'Iceberg', 'Parquet', 'DataWarehousing'],
            ],
        ];

        foreach ($journals as $journalData) {
            $user->learningJournals()->create($journalData);
        }

        // 4. Kajian Schedules
        $kajians = [
            [
                'title' => 'Kajian Sirah: Fase Makkah & Keteguhan Sahabat',
                'speaker' => 'Ustadz Dr. Firanda Andirja, M.A.',
                'event_date' => Carbon::today()->addDays(2),
                'time_info' => '09:00 WIB',
                'location' => 'Masjid Raya As-Sunnah',
                'notes' => 'Membahas keteguhan para sahabat di awal dakwah Islam, hikmah dibalik ujian, dan metode tarbiyah Rasulullah ﷺ.',
                'is_completed' => false,
            ],
            [
                'title' => 'Tafsir Al-Baqarah Ayat 1-10 (Ciri Orang Bertakwa)',
                'speaker' => 'Ustadz Abu Yahya Badrusalam, Lc.',
                'event_date' => Carbon::today()->addDays(5),
                'time_info' => 'Ba\'da Maghrib',
                'location' => 'Masjid Al-Hidayah',
                'notes' => 'Ciri-ciri orang bertakwa (Muttaqin) meliputi iman kepada yang ghaib, mendirikan shalat, dan menginfakkan sebagian rezeki yang Allah karuniakan.',
                'is_completed' => false,
            ],
            [
                'title' => 'Adab Menuntut Ilmu & Keikhlasan Niat',
                'speaker' => 'Ustadz Muhammad Nuzul Dzikri, Lc.',
                'event_date' => Carbon::today()->subDays(4),
                'time_info' => 'Ba\'da Isya',
                'location' => 'Masjid Nurul Iman',
                'notes' => 'Pentingnya mengikhlaskan niat sebelum belajar. Ilmu yang didapat dengan niat yang lurus akan jauh lebih berkah dan bermanfaat bagi umat.',
                'is_completed' => true,
            ],
        ];

        foreach ($kajians as $kajianData) {
            $user->kajianSchedules()->create($kajianData);
        }

        // 5. Sleep Logs (Mulai dari kosong / fresh start)
        // Dikelola langsung secara real oleh user melalui modal sleep tracker.

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
                'title' => 'Olahraga / Jogging Sore',
                'category' => 'Sport',
                'icon' => 'ph-sneaker',
                'color' => 'orange',
                'last_done_date' => Carbon::yesterday(),
                'notes' => 'Lari santai 3km di taman.',
            ],
            [
                'title' => 'Nonton Seri / Film Dokumenter',
                'category' => 'Entertainment',
                'icon' => 'ph-film-strip',
                'color' => 'blue',
                'last_done_date' => Carbon::today(),
                'notes' => 'Nonton serial tech documentary.',
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

        // 7. Certifications (Official & Internship)
        $certifications = [
            [
                'title' => 'AWS Certified Cloud Practitioner (CLF-C02)',
                'issuer' => 'Amazon Web Services (AWS)',
                'type' => 'official',
                'issue_date' => 'Jan 2026',
                'credential_id' => 'AWS-CCP-982147',
                'credential_url' => 'https://aws.amazon.com/verification',
                'skills' => ['AWS Cloud', 'IAM', 'S3', 'EC2', 'VPC', 'Security'],
                'description' => 'Validasi menyeluruh atas arsitektur cloud, keamanan data, kepatuhan infrastruktur, dan model penetapan harga AWS.',
                'order_index' => 0,
                'is_active' => true,
            ],
            [
                'title' => 'Data Engineering with Apache Spark & Python',
                'issuer' => 'Coursera / Databricks Partner',
                'type' => 'official',
                'issue_date' => 'Sep 2025',
                'credential_id' => 'DBX-SPK-33410',
                'credential_url' => 'https://coursera.org/verify/DBX-SPK-33410',
                'skills' => ['Apache Spark', 'PySpark', 'Delta Lake', 'ETL Optimization', 'Parquet'],
                'description' => 'Spesialisasi pemrosesan dataset terdistribusi batch & streaming dengan PySpark dan arsitektur Modern Lakehouse.',
                'order_index' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Belajar Membangun Arsitektur Cloud & Data Pipeline',
                'issuer' => 'Dicoding Indonesia',
                'type' => 'official',
                'issue_date' => 'Nov 2025',
                'credential_id' => 'DCD-ARC-78190',
                'credential_url' => 'https://www.dicoding.com/certificates/DCD-ARC-78190',
                'skills' => ['Data Pipeline', 'Cloud Architecture', 'Docker', 'REST API', 'Database Indexing'],
                'description' => 'Sertifikasi keahlian merancang arsitektur aplikasi berskala besar, orkestrasi container, dan optimalisasi pipeline data.',
                'order_index' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Data Engineering & Cloud Infrastructure Intern',
                'issuer' => 'Tech Inovasi Nusantara (Magang Industri)',
                'type' => 'internship',
                'issue_date' => 'Jul 2025 - Des 2025',
                'credential_id' => 'INT-DE-2025-089',
                'credential_url' => 'https://github.com/Azzasafah',
                'skills' => ['Airflow DAGs', 'PySpark', 'PostgreSQL', 'Terraform', 'CI/CD'],
                'description' => 'Bertanggung jawab merancang dan mengotomasi 5+ pipeline batch harian memproses data transaksi, serta mengelola deployment infrastruktur cloud menggunakan Terraform.',
                'order_index' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Cloud & Backend Developer Apprentice',
                'issuer' => 'Program MSIB Kampus Merdeka Batch 6',
                'type' => 'internship',
                'issue_date' => 'Feb 2025 - Jun 2025',
                'credential_id' => 'MSIB-KM-67104',
                'credential_url' => 'https://kampusmerdeka.kemdikbud.go.id/',
                'skills' => ['Laravel', 'REST API', 'Docker', 'AWS EC2', 'PostgreSQL'],
                'description' => 'Pengembangan microservices backend, implementasi middleware autentikasi aman, dan manajemen container deployment di cloud VPS.',
                'order_index' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($certifications as $cert) {
            $user->certifications()->create($cert);
        }

        // 8. FAQs (Frequently Asked Questions)
        $faqs = [
            [
                'question' => 'Apa fokus utama keahlian teknis Anda saat ini?',
                'answer' => 'Fokus utama saya adalah Data Engineering (ETL/ELT pipeline, PySpark, Apache Airflow, Delta Lake, PostgreSQL) dan Cloud Infrastructure (AWS & Terraform IaC), serta orchestrasi backend menggunakan ekosistem modern Laravel dan React.',
                'category' => 'Data Engineering',
                'order_index' => 0,
                'is_active' => true,
            ],
            [
                'question' => 'Apakah Anda terbuka untuk kesempatan kerja (Open to Work / Freelance / Full-time)?',
                'answer' => 'Ya, tentu! Saya sangat terbuka untuk peluang kerja Full-time, Remote, Kontrak, maupun proyek Freelance di bidang Data Engineering, Cloud Infrastructure, ataupun Full-Stack Web Development.',
                'category' => 'General',
                'order_index' => 1,
                'is_active' => true,
            ],
            [
                'question' => 'Bagaimana pendekatan Anda dalam membangun pipeline data yang handal?',
                'answer' => 'Saya mengedepankan prinsip Idempotency, validasi integritas skema data (schema enforcement), logging komprehensif, pemantauan kegagalan otomatis melalui Airflow alerts, serta isolasi lingkungan berbasis Docker.',
                'category' => 'Technical',
                'order_index' => 2,
                'is_active' => true,
            ],
            [
                'question' => 'Bagaimana cara tercepat untuk menghubungi dan berkolaborasi dengan Anda?',
                'answer' => 'Anda bisa langsung menghubungi saya melalui email di muhammad.hafizh2016@gmail.com, mengirimkan pesan via profil GitHub @Azzasafah, atau memanfaatkan tombol kontak instan di portofolio ini.',
                'category' => 'Work Collaboration',
                'order_index' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($faqs as $faq) {
            $user->faqs()->create($faq);
        }
    }
}

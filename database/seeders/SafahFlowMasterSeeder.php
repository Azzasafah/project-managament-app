<?php

namespace Database\Seeders;

use App\Models\BootcampAttendance;
use App\Models\BootcampSession;
use App\Models\ChoreLog;
use App\Models\DailyLog;
use App\Models\Project;
use App\Models\ProjectMilestone;
use App\Models\SpiritualLog;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class SafahFlowMasterSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();
        if (!$user) {
            $this->call(UserSeeder::class);
            $user = User::first();
        }

        // 1. Seed 36 Bootcamp Sessions from Jadwal Kelas.xlsx
        $sessions = [
            [
                'session_number' => 1,
                'session_name' => 'Sesi 1 Pra - Bootcamp',
                'phase' => 'PRA_BOOTCAMP',
                'scheduled_date' => '2026-08-09',
                'day_name' => 'Minggu',
                'start_time' => '13:00',
                'mentor_name' => 'Mas Farich',
                'topic' => 'Python Core — Data Structures, Flow & Cleaning Contract',
                'target_project' => 'Tugas Kopi Kita',
            ],
            [
                'session_number' => 2,
                'session_name' => 'Sesi 2 Pra - Bootcamp',
                'phase' => 'PRA_BOOTCAMP',
                'scheduled_date' => '2026-08-13',
                'day_name' => 'Kamis',
                'start_time' => '19:30',
                'mentor_name' => 'Mas Farich',
                'topic' => 'SQLite Fundamentals — Schema, Loading & Query Dasar',
                'target_project' => 'Tugas Kopi Kita',
            ],
            [
                'session_number' => 3,
                'session_name' => 'Sesi 3 Pra - Bootcamp',
                'phase' => 'PRA_BOOTCAMP',
                'scheduled_date' => '2026-08-16',
                'day_name' => 'Minggu',
                'start_time' => '13:00',
                'mentor_name' => 'Mas Farich',
                'topic' => 'Python Applied — CLI Pipeline, Logging & Error Policy',
                'target_project' => 'Tugas Kopi Kita',
            ],
            [
                'session_number' => 4,
                'session_name' => 'Sesi 4 Pra - Bootcamp',
                'phase' => 'PRA_BOOTCAMP',
                'scheduled_date' => '2026-08-20',
                'day_name' => 'Kamis',
                'start_time' => '19:30',
                'mentor_name' => 'Mas Farich',
                'topic' => 'SQL Analytics Core — JOIN, Aggregation, Grain & 8 Metrics',
                'target_project' => 'LIB-512',
            ],
            [
                'session_number' => 5,
                'session_name' => 'Sesi 5 Pra - Bootcamp',
                'phase' => 'PRA_BOOTCAMP',
                'scheduled_date' => '2026-08-23',
                'day_name' => 'Minggu',
                'start_time' => '13:00',
                'mentor_name' => 'Mas Farich',
                'topic' => 'Decision — Ready Report',
                'target_project' => 'LIB-512',
            ],
            [
                'session_number' => 6,
                'session_name' => 'Sesi 6 Pra - Bootcamp',
                'phase' => 'PRA_BOOTCAMP',
                'scheduled_date' => '2026-08-27',
                'day_name' => 'Kamis',
                'start_time' => '19:30',
                'mentor_name' => 'Mas Farich',
                'topic' => 'GitHub Workflow — PR, Review, Demo & Readiness Gate',
                'target_project' => 'LIB-512',
            ],
            [
                'session_number' => 7,
                'session_name' => 'Sesi 7',
                'phase' => 'CORE',
                'scheduled_date' => '2026-08-30',
                'day_name' => 'Minggu',
                'start_time' => '16:00',
                'mentor_name' => 'Mas Bayuzen',
                'topic' => 'Welcome to Advanced Data Engineering — From Pipeline Builder to System Architect',
                'target_project' => 'Telkom ETL Bronze',
            ],
            [
                'session_number' => 8,
                'session_name' => 'Sesi 8',
                'phase' => 'CORE',
                'scheduled_date' => '2026-09-01',
                'day_name' => 'Selasa',
                'start_time' => '19:30',
                'mentor_name' => 'Mas Bayuzen',
                'topic' => 'Docker Mastery — Building Reproducible Data Environments',
                'target_project' => 'Telkom ETL Bronze',
            ],
            [
                'session_number' => 9,
                'session_name' => 'Sesi 9',
                'phase' => 'CORE',
                'scheduled_date' => '2026-09-06',
                'day_name' => 'Minggu',
                'start_time' => '16:00',
                'mentor_name' => 'Mas Bayuzen',
                'topic' => 'Your Big Data Lab — Setting Up the Full Stack',
                'target_project' => 'Telkom ETL Bronze',
            ],
            [
                'session_number' => 10,
                'session_name' => 'Sesi 10',
                'phase' => 'CORE',
                'scheduled_date' => '2026-09-08',
                'day_name' => 'Selasa',
                'start_time' => '19:30',
                'mentor_name' => 'Mas Bachtiyar',
                'topic' => 'Python for Production Data Engineering — Writing Code That Survives Reality',
                'target_project' => 'Telkom ETL Silver',
            ],
            [
                'session_number' => 11,
                'session_name' => 'Sesi 11',
                'phase' => 'CORE',
                'scheduled_date' => '2026-09-13',
                'day_name' => 'Minggu',
                'start_time' => '16:00',
                'mentor_name' => 'Mas Bachtiyar',
                'topic' => 'Advanced SQL — The Power Language of Data Engineers',
                'target_project' => 'Telkom ETL Bronze & Tugas Kopi Kita',
            ],
            [
                'session_number' => 12,
                'session_name' => 'Sesi 12',
                'phase' => 'CORE',
                'scheduled_date' => '2026-09-15',
                'day_name' => 'Selasa',
                'start_time' => '19:30',
                'mentor_name' => 'Mas Bachtiyar',
                'topic' => 'Data Modeling for Production — Designing Schemas That Scale',
                'target_project' => 'Telkom ETL Bronze & Tugas Kopi Kita (Database Modeling)',
            ],
            [
                'session_number' => 13,
                'session_name' => 'Sesi 13',
                'phase' => 'CORE',
                'scheduled_date' => '2026-09-20',
                'day_name' => 'Minggu',
                'start_time' => '16:00',
                'mentor_name' => 'Mas Bachtiyar',
                'topic' => 'Production-Grade API Ingestion — Building Extractors That Never Give Up',
                'target_project' => 'Telkom ETL Silver & Tugas LIB-512 (API Ingestion)',
            ],
            [
                'session_number' => 14,
                'session_name' => 'Sesi 14',
                'phase' => 'CORE',
                'scheduled_date' => '2026-09-22',
                'day_name' => 'Selasa',
                'start_time' => '19:30',
                'mentor_name' => 'Mas Bachtiyar',
                'topic' => 'Multi-Source Data Ingestion & Data Contracts',
                'target_project' => 'Telkom ETL Silver (Data Contract Ingestion)',
            ],
            [
                'session_number' => 15,
                'session_name' => 'Sesi 15',
                'phase' => 'CORE',
                'scheduled_date' => '2026-09-27',
                'day_name' => 'Minggu',
                'start_time' => '16:00',
                'mentor_name' => 'Mas Bachtiyar',
                'topic' => 'Data Quality & Validation — Trust Your Pipeline',
                'target_project' => 'Telkom ETL Gold (Data Quality & Validation Gate)',
            ],
            [
                'session_number' => 16,
                'session_name' => 'Sesi 16',
                'phase' => 'STREAMING',
                'scheduled_date' => '2026-09-29',
                'day_name' => 'Selasa',
                'start_time' => '19:15',
                'mentor_name' => 'Mba Yuli',
                'topic' => "Kafka Fundamentals — When Batch Isn't Enough",
                'target_project' => 'Azure Realtime (Docker Event Producer & Kafka)',
            ],
            [
                'session_number' => 17,
                'session_name' => 'Sesi 17',
                'phase' => 'STREAMING',
                'scheduled_date' => '2026-10-04',
                'day_name' => 'Minggu',
                'start_time' => '16:00',
                'mentor_name' => 'Mba Yuli',
                'topic' => 'Building Real Streaming Pipelines — Database to Kafka',
                'target_project' => 'Azure Realtime (Kafka Streaming Pipeline)',
            ],
            [
                'session_number' => 18,
                'session_name' => 'Sesi 18',
                'phase' => 'STREAMING',
                'scheduled_date' => '2026-10-06',
                'day_name' => 'Selasa',
                'start_time' => '19:15',
                'mentor_name' => 'Mba Yuli',
                'topic' => 'Resilient Streaming Systems — Dead Letters, CDC & Production Reliability',
                'target_project' => 'Azure Realtime (DLQ & Production Reliability)',
            ],
            [
                'session_number' => 19,
                'session_name' => 'Sesi 19',
                'phase' => 'PROCESSING',
                'scheduled_date' => '2026-10-11',
                'day_name' => 'Minggu',
                'start_time' => '16:00',
                'mentor_name' => 'Mba Yuli',
                'topic' => 'PySpark Fundamentals — Processing Data at Scale',
                'target_project' => 'ADE Labs (PySpark Scaling & DataFrames)',
            ],
            [
                'session_number' => 20,
                'session_name' => 'Sesi 20',
                'phase' => 'PROCESSING',
                'scheduled_date' => '2026-10-13',
                'day_name' => 'Selasa',
                'start_time' => '19:15',
                'mentor_name' => 'Mba Yuli',
                'topic' => 'Building Batch Data Pipelines with Spark — From Raw Data to Insight',
                'target_project' => 'ADE Labs (PySpark Batch Data Pipeline)',
            ],
            [
                'session_number' => 21,
                'session_name' => 'Sesi 21',
                'phase' => 'PROCESSING',
                'scheduled_date' => '2026-10-18',
                'day_name' => 'Minggu',
                'start_time' => '16:00',
                'mentor_name' => 'Mba Yuli',
                'topic' => 'Structured Streaming with Spark — Real-Time Data Processing at Scale',
                'target_project' => 'Azure Realtime (Spark Structured Streaming)',
            ],
            [
                'session_number' => 22,
                'session_name' => 'Sesi 22',
                'phase' => 'PROCESSING',
                'scheduled_date' => '2026-10-20',
                'day_name' => 'Selasa',
                'start_time' => '19:30',
                'mentor_name' => 'Mas Bayuzen',
                'topic' => 'Spark Optimization & Performance Tuning',
                'target_project' => 'Azure Realtime (Spark Performance Tuning)',
            ],
            [
                'session_number' => 23,
                'session_name' => 'Sesi 23',
                'phase' => 'LAKE_ORCHESTRATION',
                'scheduled_date' => '2026-10-25',
                'day_name' => 'Minggu',
                'start_time' => '16:00',
                'mentor_name' => 'Mas Bayuzen',
                'topic' => 'Data Lake Architecture with MinIO — Building Your Data Reservoir',
                'target_project' => 'Telkom ETL & ADE Labs (MinIO Data Lakehouse)',
            ],
            [
                'session_number' => 24,
                'session_name' => 'Sesi 24',
                'phase' => 'LAKE_ORCHESTRATION',
                'scheduled_date' => '2026-10-27',
                'day_name' => 'Selasa',
                'start_time' => '19:30',
                'mentor_name' => 'Mas Bayuzen',
                'topic' => 'Source-to-Lake Pipelines — From Raw Data to Curated Zones',
                'target_project' => 'Telkom ETL (MinIO Bronze-Silver-Gold Zone)',
            ],
            [
                'session_number' => 25,
                'session_name' => 'Sesi 25',
                'phase' => 'LAKE_ORCHESTRATION',
                'scheduled_date' => '2026-11-01',
                'day_name' => 'Minggu',
                'start_time' => '16:00',
                'mentor_name' => 'Mba Wulan',
                'topic' => 'Elasticsearch — Fast Search & Analytics Engine',
                'target_project' => 'ADE Labs (Elasticsearch Analytics Engine)',
            ],
            [
                'session_number' => 26,
                'session_name' => 'Sesi 26',
                'phase' => 'LAKE_ORCHESTRATION',
                'scheduled_date' => '2026-11-03',
                'day_name' => 'Selasa',
                'start_time' => '19:30',
                'mentor_name' => 'Mba Wulan',
                'topic' => 'BI Dashboard — Making Your Pipeline Speak to Stakeholders',
                'target_project' => 'Azure Realtime (Power BI DirectQuery Dashboard)',
            ],
            [
                'session_number' => 27,
                'session_name' => 'Sesi 27',
                'phase' => 'LAKE_ORCHESTRATION',
                'scheduled_date' => '2026-11-08',
                'day_name' => 'Minggu',
                'start_time' => '16:00',
                'mentor_name' => 'Mba Wulan',
                'topic' => 'Apache Airflow Fundamentals — Orchestrating Data Pipelines Like a Pro',
                'target_project' => 'Telkom ETL (Apache Airflow Orchestration Core)',
            ],
            [
                'session_number' => 28,
                'session_name' => 'Sesi 28',
                'phase' => 'LAKE_ORCHESTRATION',
                'scheduled_date' => '2026-11-10',
                'day_name' => 'Selasa',
                'start_time' => '19:30',
                'mentor_name' => 'Mba Wulan',
                'topic' => 'Production Workflow Orchestration — End-to-End Automation with Airflow',
                'target_project' => 'Telkom ETL (Airflow DAG Production Automation)',
            ],
            [
                'session_number' => 29,
                'session_name' => 'Sesi 29',
                'phase' => 'LAKE_ORCHESTRATION',
                'scheduled_date' => '2026-11-15',
                'day_name' => 'Minggu',
                'start_time' => '16:00',
                'mentor_name' => 'Mba Wulan',
                'topic' => 'Capstone Development — Build Your Production Pipeline',
                'target_project' => 'Capstone Streaming (Production Pipeline Setup)',
            ],
            [
                'session_number' => 30,
                'session_name' => 'Sesi 30',
                'phase' => 'CONSULTATION',
                'scheduled_date' => '2026-11-22',
                'day_name' => 'Minggu',
                'start_time' => '16:00',
                'mentor_name' => 'Mentor ADE',
                'topic' => '1 on 1 Grup (Consultation)',
                'target_project' => 'Konsultasi Proyek (Telkom ETL & Azure Realtime)',
            ],
            [
                'session_number' => 31,
                'session_name' => 'Sesi 31',
                'phase' => 'CONSULTATION',
                'scheduled_date' => '2026-11-29',
                'day_name' => 'Minggu',
                'start_time' => '16:00',
                'mentor_name' => 'Mentor ADE',
                'topic' => '1 on 1 Grup (Consultation)',
                'target_project' => 'Konsultasi Proyek (Capstone Streaming System)',
            ],
            [
                'session_number' => 32,
                'session_name' => 'Sesi 32',
                'phase' => 'CONSULTATION',
                'scheduled_date' => '2026-12-06',
                'day_name' => 'Minggu',
                'start_time' => '16:00',
                'mentor_name' => 'Mentor ADE',
                'topic' => '1 on 1 Grup (Consultation)',
                'target_project' => 'Konsultasi Proyek (Final Code Review & Quality Gate)',
            ],
            [
                'session_number' => 33,
                'session_name' => 'Sesi 33',
                'phase' => 'GRAND_DEMO_DAY',
                'scheduled_date' => '2026-12-08',
                'day_name' => 'Selasa',
                'start_time' => '19:30',
                'mentor_name' => 'Juri Eksternal & Lead DE',
                'topic' => 'Grand Demo Day — Showcase Your Data Engineering System',
                'target_project' => 'Grand Demo Day (Live Architecture Defense)',
            ],
            [
                'session_number' => 34,
                'session_name' => 'Sesi 34',
                'phase' => 'CAREER',
                'scheduled_date' => '2026-12-13',
                'day_name' => 'Minggu',
                'start_time' => '16:00',
                'mentor_name' => 'Career Coach',
                'topic' => 'Career Preparation Part 2 — Technical Interview & Portfolio Defense',
                'target_project' => 'Career Readiness (Technical Portfolio Defense)',
            ],
            [
                'session_number' => 35,
                'session_name' => 'Sesi 35',
                'phase' => 'CAREER',
                'scheduled_date' => '2026-12-15',
                'day_name' => 'Selasa',
                'start_time' => '19:30',
                'mentor_name' => 'Career Coach',
                'topic' => 'Career Preparation Part 1 — Resume, LinkedIn & Personal Brand',
                'target_project' => 'Career Readiness (Resume & Personal Branding)',
            ],
            [
                'session_number' => 36,
                'session_name' => 'Sesi 36',
                'phase' => 'USER_TEST',
                'scheduled_date' => '2026-12-20',
                'day_name' => 'Minggu',
                'start_time' => '16:00',
                'mentor_name' => 'Mba Wulan',
                'topic' => 'User Test — Comprehensive Final Competency Evaluation',
                'target_project' => 'Evaluasi Akhir (Comprehensive Competency Showcase)',
            ],
        ];

        foreach ($sessions as $s) {
            $sessionModel = BootcampSession::updateOrCreate(
                ['session_number' => $s['session_number']],
                $s
            );

            // Sesi 1-7 berstatus SELESAI (ATTENDED)
            // Sesi 8-10 berstatus CATCH-UP (SCHEDULED tapi lewat)
            // Sesi 11+ berstatus TERJADWAL
            $status = 'SCHEDULED';
            if ($s['session_number'] <= 7) {
                $status = 'ATTENDED';
            }

            BootcampAttendance::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'bootcamp_session_id' => $sessionModel->id,
                ],
                [
                    'status' => $status,
                    'summary_notes' => $status === 'ATTENDED' ? 'Materi dan practical lab diselesaikan dengan baik.' : null,
                ]
            );
        }

        // 2. Seed 5 Data Engineering Portfolio Projects (Mulai Fresh per Hari Ini hingga Bootcamp Selesai)
        $projects = [
            [
                'name' => 'Telkom ETL Pipeline',
                'slug' => 'telkom-etl-pipeline',
                'weight_percentage' => 35,
                'description' => 'Arsitektur Ingestion Medallion (Bronze, Silver, Gold), Airflow DAG Orchestration, Pytest Data Reconciliation, dan Idempotency guarantee untuk pipeline telekomunikasi skala enterprise.',
                'repo_url' => 'https://github.com/Azzasafah/telkom-etl-pipeline',
                'status' => 'IN_PROGRESS',
                'milestones' => [
                    [
                        'week_number' => 1,
                        'title' => 'Setup Repository, Virtualenv & Data Contract Definition',
                        'description' => 'Inisialisasi git repo, virtual environment, Pytest scaffolding, serta pendefinisian skema kontrak data telekomunikasi.',
                    ],
                    [
                        'week_number' => 3,
                        'title' => 'Ingestion Layer: Raw Landing ke Medallion Bronze (Idempotent)',
                        'description' => 'Membangun script ingestor batch raw CSV/JSON telekomunikasi dengan metadata audit trail dan jaminan idempotency.',
                    ],
                    [
                        'week_number' => 4,
                        'title' => 'Silver Layer: Data Cleansing, Deduplikasi & Schema Enforcement',
                        'description' => 'Pembersihan noise, normalisasi nomor pelanggan/cell ID, filtering duplikasi, dan standardisasi format ISO.',
                    ],
                    [
                        'week_number' => 5,
                        'title' => 'Gold Layer: Dimensional Modeling & Aggregation Analytics Mart',
                        'description' => 'Pemodelan bintang (Kimball Star Schema): Fact CDR, Dim Customer, Dim Tower, dan mart utilisasi bandwidth.',
                    ],
                    [
                        'week_number' => 6,
                        'title' => 'Apache Airflow DAG Orchestration & Retry Policy Automation',
                        'description' => 'Otomasi pipeline harian dengan Airflow DAG, failure alert notifications, sensor dependencies, dan dynamic tasks.',
                    ],
                    [
                        'week_number' => 7,
                        'title' => 'Pytest Automated Data Reconciliation & Quality Gate Check',
                        'description' => 'Test suite otomatis sebelum loading ke Gold mart (row count parity, null check, referential integrity).',
                    ],
                    [
                        'week_number' => 15,
                        'title' => 'Final Enterprise Pipeline Audit & Portofolio Technical Defense',
                        'description' => 'Uji performa skala besar, dokumentasi arsitektur komprehensif, dan publish hasil ke portofolio showcase.',
                    ],
                ],
            ],
            [
                'name' => 'Azure Realtime Sales Analytics',
                'slug' => 'azure-realtime-sales-analytics',
                'weight_percentage' => 30,
                'description' => 'Pipeline streaming end-to-end dengan Docker transaction simulator, Azure SQL Database star schema, ACR containerized workload, Power BI DirectQuery, dan Microsoft Teams anomaly alert webhook.',
                'repo_url' => 'https://github.com/Azzasafah/azure-realtime-sales',
                'status' => 'IN_PROGRESS',
                'milestones' => [
                    [
                        'week_number' => 1,
                        'title' => 'Perancangan Arsitektur Realtime & Spesifikasi Event Transaksi',
                        'description' => 'Menyusun arsitektur sistem realtime data pipeline dan mendefinisikan schema payload event JSON transaksi penjualan.',
                    ],
                    [
                        'week_number' => 7,
                        'title' => 'Docker Transaction Simulator & Event Streaming Producer',
                        'description' => 'Membangun engine generator event transaksi penjualan acak berbasis container Docker dengan rate throttling.',
                    ],
                    [
                        'week_number' => 8,
                        'title' => 'Azure SQL Database Provisioning & Star Schema DDL Deployment',
                        'description' => 'Setup database cloud Azure SQL, konfigurasi firewall, pembuatan tabel fakta & dimensi penjualan.',
                    ],
                    [
                        'week_number' => 9,
                        'title' => 'Containerized Ingestion Consumer & Azure Container Registry (ACR)',
                        'description' => 'Build image Docker consumer, push ke ACR, dan deployment workload ingestion realtime ke Azure instance.',
                    ],
                    [
                        'week_number' => 10,
                        'title' => 'Power BI Realtime Dashboard via DirectQuery Connection',
                        'description' => 'Menghubungkan visualisasi dashboard interaktif langsung ke database tanpa jeda batch (DirectQuery).',
                    ],
                    [
                        'week_number' => 11,
                        'title' => 'Microsoft Teams Webhook Anomaly & Spike Transaction Alert',
                        'description' => 'Integrasi webhook notifikasi otomatis saat volume transaksi melonjak drastis atau terjadi error critical.',
                    ],
                    [
                        'week_number' => 15,
                        'title' => 'Stress Test High-Concurrency & Portofolio Demonstration',
                        'description' => 'Simulasi 5.000 transaksi/menit, benchmarking latensi ingestion, dan rilis dokumentasi arsitektur cloud.',
                    ],
                ],
            ],
            [
                'name' => 'Advance Data Engineer Bootcamp Labs',
                'slug' => 'ade-bootcamp-curriculum',
                'weight_percentage' => 20,
                'description' => 'Penyelesaian kurikulum intensif 36 sesi ADE Boost, practical labs, implementasi best practice industri, dan integrasi lintas tools (Kafka, Spark, MinIO, Airflow).',
                'repo_url' => 'https://github.com/Azzasafah/ade-bootcamp-labs',
                'status' => 'IN_PROGRESS',
                'milestones' => [
                    [
                        'week_number' => 1,
                        'title' => 'Docker Big Data Lab Setup (PostgreSQL, Kafka, PySpark, Airflow)',
                        'description' => 'Konfigurasi docker-compose multi-service untuk seluruh kebutuhan lab praktikum lokal terintegrasi.',
                    ],
                    [
                        'week_number' => 3,
                        'title' => 'Advanced SQL Optimization, CTE & Analytical Window Functions',
                        'description' => 'Eksplorasi query tuning, execution plan indexing, partition pruning, dan window aggregations kompleks.',
                    ],
                    [
                        'week_number' => 5,
                        'title' => 'Streaming Fundamentals Lab dengan Apache Kafka Cluster',
                        'description' => 'Praktik pembuatan topic, partition balancing, consumer groups, dan handling event streaming rebalance.',
                    ],
                    [
                        'week_number' => 8,
                        'title' => 'Distributed Computing Lab dengan Apache Spark & PySpark',
                        'description' => 'Transformasi distributed DataFrame, broadcast join optimization, shuffling tuning, dan cache management.',
                    ],
                    [
                        'week_number' => 11,
                        'title' => 'Modern Data Lakehouse Lab dengan MinIO S3 Object Storage',
                        'description' => 'Konfigurasi MinIO multi-bucket, penyimpanan format Parquet, dan integrasi bersama Apache Airflow orchestrator.',
                    ],
                    [
                        'week_number' => 14,
                        'title' => 'End-to-End Pipeline Integration Across Big Data Stack',
                        'description' => 'Konsolidasi seluruh komponen tools lab menjadi satu alur pipeline continuous data engineering.',
                    ],
                    [
                        'week_number' => 15,
                        'title' => 'Final Evaluation, Competency Assessment & Showcase Release',
                        'description' => 'Penyusunan repositori kurikulum komprehensif, code review bersama mentor, dan portofolio readiness.',
                    ],
                ],
            ],
            [
                'name' => 'Capstone Streaming System',
                'slug' => 'capstone-streaming-system',
                'weight_percentage' => 10,
                'description' => 'Sistem streaming berkecepatan tinggi dengan Kafka cluster, Dead Letter Queue (DLQ), PySpark Streaming stateful aggregation, MinIO Data Lakehouse, dan presentasi Grand Demo Day.',
                'repo_url' => 'https://github.com/Azzasafah/capstone-streaming',
                'status' => 'PLANNING',
                'milestones' => [
                    [
                        'week_number' => 10,
                        'title' => 'Capstone Proposal & High-Level Architecture Design Submission',
                        'description' => 'Penyusunan problem statement, pipeline architecture blueprint, dan pemilihan business use-case streaming.',
                    ],
                    [
                        'week_number' => 12,
                        'title' => 'Kafka Cluster, Schema Registry & Dead Letter Queue (DLQ)',
                        'description' => 'Implementasi ingestion queue tangguh dengan penanganan pesan corrupt/gagal ke Dead Letter Queue.',
                    ],
                    [
                        'week_number' => 13,
                        'title' => 'PySpark Structured Streaming Engine with Watermarking',
                        'description' => 'Stateful aggregation real-time, deduplikasi berbasis watermark event-time, dan window sliding analytics.',
                    ],
                    [
                        'week_number' => 14,
                        'title' => 'MinIO Data Lakehouse Sink (Bronze -> Silver -> Gold)',
                        'description' => 'Penyimpanan lakehouse berformat Parquet, partition compaction, dan sinkronisasi ke analytics mart.',
                    ],
                    [
                        'week_number' => 15,
                        'title' => 'Grand Demo Day Live Architecture Defense & Technical Showcase',
                        'description' => 'Presentasi langsung di hadapan dewan juri & lead data engineer mengenai keandalan arsitektur capstone.',
                    ],
                ],
            ],
            [
                'name' => 'Tugas Awal Kopi Kita & LIB-512',
                'slug' => 'tugas-awal-kopi-kita-lib-512',
                'weight_percentage' => 5,
                'description' => 'Profiling data tabular, validasi kontrak integritas, pemodelan 8 metrik kunci transaksi F&B, dan pelaporan analytics decision-ready.',
                'repo_url' => 'https://github.com/Azzasafah/kopi-kita-analytics',
                'status' => 'IN_PROGRESS',
                'milestones' => [
                    [
                        'week_number' => 1,
                        'title' => 'Data Profiling Report & Inconsistency Discovery (Kopi Kita)',
                        'description' => 'Pengecekan integritas kolom, identifikasi outlier nilai transaksi, missing values, dan dokumentasi profil data.',
                    ],
                    [
                        'week_number' => 2,
                        'title' => 'SQLite Loading & Automated CLI Ingestion Pipeline (Kopi Kita)',
                        'description' => 'Script CLI otomatis untuk validasi skema, cleaning dataset, dan loading ke database SQLite lokal.',
                    ],
                    [
                        'week_number' => 2,
                        'title' => 'SQL Analytics Core — Grain Definition & 8 Metric Contract (LIB-512)',
                        'description' => 'Penulisan script SQL analitis untuk menjawab 8 metrik kunci transaksi bisnis F&B dengan validasi hasil uji.',
                    ],
                    [
                        'week_number' => 3,
                        'title' => 'Decision-Ready Executive Presentation & Portofolio Wrap-up',
                        'description' => 'Laporan analitik ringkas berorientasi bisnis dan ringkasan insight rekomendasi peningkatan performa penjualan.',
                    ],
                ],
            ],
        ];

        foreach ($projects as $projData) {
            $milestones = $projData['milestones'];
            unset($projData['milestones']);

            $proj = Project::updateOrCreate(
                ['slug' => $projData['slug']],
                $projData
            );

            // Bersihkan milestone lama dan sinkronkan milestone target baru
            $proj->milestones()->delete();

            foreach ($milestones as $m) {
                ProjectMilestone::create([
                    'project_id' => $proj->id,
                    'week_number' => $m['week_number'],
                    'title' => $m['title'],
                    'description' => $m['description'] ?? null,
                    'is_completed' => false,
                    'completed_at' => null,
                ]);
            }
        }

        // 3. Seed Today's Initial Logs (Daily, Spiritual, Chore)
        $today = Carbon::today()->format('Y-m-d');

        DailyLog::updateOrCreate(
            ['user_id' => $user->id, 'log_date' => $today],
            [
                'day_type' => 'FULL_LAB',
                'effective_study_minutes' => 240,
                'key_output' => 'Kickoff Proyek Portofolio: Inisialisasi Repository, Environment & Data Profiling',
                'error_and_solution' => 'Memulai roadmap 15 pekan target proyek portofolio hingga bootcamp selesai.',
                'git_commit_hash' => '8a989d5',
                'energy_level' => 5,
            ]
        );

        SpiritualLog::updateOrCreate(
            ['user_id' => $user->id, 'log_date' => $today],
            [
                'tahajud_witir' => true,
                'dzikir_pagi' => true,
                'dzikir_petang' => false,
                'al_mulk' => false,
                'al_kahfi' => false,
                'kajian_pagi' => false,
                'kajian_malam' => false,
            ]
        );

        ChoreLog::updateOrCreate(
            ['user_id' => $user->id, 'log_date' => $today],
            [
                'focus_area' => 'Kamar Mandi & Wastafel (Jadwal Rutin Kamis)',
                'morning_done' => true,
                'evening_done' => false,
                'weekly_deep_done' => false,
                'timer_minutes' => 25,
            ]
        );
    }
}

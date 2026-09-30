<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class WorkExperienceService
{
    protected static function getFilePath(): string
    {
        return storage_path('app/settings/work_experiences.json');
    }

    public static function defaults(): array
    {
        return [
            [
                'id' => 'exp_1',
                'title' => 'Backend Developer (Internship)',
                'company' => 'Evermos x Rakamin Academy',
                'period' => 'Juli 2025 – Agust 2025',
                'badge' => 'Internship',
                'tech' => ['Golang', 'SQL', 'Clean Code', 'Modular Query', 'API Services'],
                'project_url' => null,
                'github_url' => null,
                'points' => [
                    'Terlibat dalam studi kasus dan proyek pengembangan backend nyata di lingkungan Evermos, berkolaborasi lintas tim Product dan Marketing.',
                    'Mengembangkan dan mempelajari implementasi layanan backend menggunakan Golang dan SQL sebagai tools utama operasional teknis Evermos.',
                    'Membiasakan diri dengan pola pengembangan skala production: clean code, modularitas, dan efisiensi query database.',
                ],
                'is_active' => true,
                'order_index' => 1,
            ],
            [
                'id' => 'exp_2',
                'title' => 'Data Governance Specialist (Project-Based Intern)',
                'company' => 'Rakamin Academy Internal Platform',
                'period' => 'Des 2024 – Jan 2025',
                'badge' => 'Virtual Internship (Skor 92.33)',
                'tech' => ['SOP Re-engineering', 'Bug Template', 'Flowchart', 'Process Mapping'],
                'project_url' => 'https://drive.google.com/drive/folders/10c42kus7vjdGmf6k1hbLeiq81zJye-_b?usp=drive_link',
                'github_url' => null,
                'points' => [
                    'Mengevaluasi SOP pelaporan bug yang berjalan dan merancang ulang alur proses antara tim support dan developer.',
                    'Merancang ulang alur SOP dengan menyederhanakan langkah prosedural, mendefinisikan peran & tanggung jawab, serta membuat template laporan bug dan flowchart.',
                    'Alur pelaporan bug menjadi lebih terstruktur, meningkatkan kecepatan respons dan efektivitas komunikasi lintas tim.',
                ],
                'is_active' => true,
                'order_index' => 2,
            ],
            [
                'id' => 'exp_3',
                'title' => 'Project Consultant (Project-Based Intern)',
                'company' => 'BIPO x Rakamin Academy',
                'period' => 'Nov 2023 – Des 2023',
                'badge' => 'Virtual Internship (Skor 87.47)',
                'tech' => ['Microsoft Excel', 'Pivot Table', 'SWOT Analysis', 'HR Software Simulation'],
                'project_url' => 'https://drive.google.com/drive/folders/1KbPZsgMy2EwDpQSJ0BUHTPz7VB7ID-h3?usp=drive_link',
                'github_url' => null,
                'points' => [
                    'Proyek konsultasi berbasis data untuk simulasi implementasi perangkat lunak Human Resources (HR) guna meningkatkan efisiensi.',
                    'Mengolah data kepegawaian, analisis performa dengan Microsoft Excel (pivot table, visualisasi data), dan menyusun strategi negosiasi dengan analisis SWOT.',
                    'Laporan analisis kelayakan dan rencana implementasi bertahap disetujui tim akademik Rakamin sebagai solusi layak terapkan.',
                ],
                'is_active' => true,
                'order_index' => 3,
            ],
            [
                'id' => 'exp_4',
                'title' => 'Health System Analyst (Project-Based Intern)',
                'company' => 'Klinik GO x Rakamin Academy',
                'period' => 'Jan 2023 – Feb 2023',
                'badge' => 'Virtual Internship',
                'tech' => ['UML Modeling', 'DFD', 'ERD', 'Use Case', 'Activity Diagram'],
                'project_url' => 'https://best-emu-e9d.notion.site/Project-Based-Virtual-Intern-fb58b73147714ce2a2070ea99d1eef8a',
                'github_url' => null,
                'points' => [
                    'Digitalisasi sistem pendaftaran pasien berbasis daring untuk mengatasi inefisiensi administrasi manual.',
                    'Merancang dokumentasi sistem dan memetakan alur proses kerja bagi tiga jenis pengguna: pasien, admin, dan front office.',
                    'Membuat diagram alur sistem Data Flow Diagram (DFD), Unified Modeling Language (UML: Use Case, Sequence, Activity), serta Entity Relationship Diagram (ERD).',
                ],
                'is_active' => true,
                'order_index' => 4,
            ],
            [
                'id' => 'exp_5',
                'title' => 'Business Intelligence Analyst (Project-Based Intern)',
                'company' => 'Bank Muamalat x Rakamin Academy',
                'period' => 'Sep 2022 – Okt 2022',
                'badge' => 'Virtual Internship (Skor 83.75)',
                'tech' => ['Microsoft Excel', 'Microsoft Access', 'BI Dashboard', 'Sales Analytics'],
                'project_url' => 'https://drive.google.com/file/d/1isuTOao2y1Cs6zzWOXtfMrp9dKI0n5xI/view',
                'github_url' => null,
                'points' => [
                    'Analisis data transaksi multi-sumber (produk, kategori, nasabah) untuk mengidentifikasi peluang peningkatan penjualan.',
                    'Membangun dashboard analitis sederhana menggunakan Microsoft Excel & Access untuk visualisasi tren konsumsi pelanggan.',
                    'Memberikan insight strategis berupa rekomendasi bundling produk dan loyalty points untuk meningkatkan volume penjualan.',
                ],
                'is_active' => true,
                'order_index' => 5,
            ],
            [
                'id' => 'exp_6',
                'title' => 'Fullstack Developer (Project-Based Intern)',
                'company' => 'Investree x Rakamin Academy',
                'period' => 'Apr 2026 – Sekarang',
                'badge' => 'Virtual Internship',
                'tech' => ['Laravel', 'Laravel Passport', 'MySQL', 'RESTful API', 'Auth Module'],
                'project_url' => null,
                'github_url' => null,
                'points' => [
                    'Mengembangkan fitur CRUD dan RESTful API menggunakan framework Laravel terintegrasi database MySQL.',
                    'Menerapkan mekanisme keamanan User Authentication dengan Laravel UI serta API Authentication menggunakan Laravel Passport.',
                    'Berhasil membuat modul sistem otentikasi dan manajemen user yang berfungsi penuh dan siap digunakan.',
                ],
                'is_active' => true,
                'order_index' => 6,
            ],
            [
                'id' => 'exp_7',
                'title' => 'Fullstack Web Developer (Internship)',
                'company' => 'Fakultas Teknik Universitas Dr. Soetomo',
                'period' => 'Apr 2021 – Jul 2021',
                'badge' => 'Academic Internship (Nilai A)',
                'tech' => ['CodeIgniter', 'PHP', 'MySQL', 'Bootstrap', 'UML & ERD'],
                'project_url' => 'https://drive.google.com/file/d/1Wqk2qeqlswQxsr4xcQSizIyy8obuuuN6/view',
                'github_url' => 'https://github.com/br4masta/ci4app-Project-Tugas-Akhir',
                'points' => [
                    'Pengembangan sistem informasi manajemen tugas akhir untuk Fakultas Teknik guna mendigitalisasi proses administrasi akademik.',
                    'Merancang dan mengembangkan aplikasi berbasis framework CodeIgniter dengan database MySQL.',
                    'Sistem baru berhasil mempercepat proses administrasi akademik dan meraih nilai akhir “A”.',
                ],
                'is_active' => true,
                'order_index' => 7,
            ],
            [
                'id' => 'exp_8',
                'title' => 'Asisten Dosen Database',
                'company' => 'Laboratorium Teknik Informatika, Univ Dr. Soetomo',
                'period' => 'Des 2021 – Feb 2022',
                'badge' => 'Teaching Assistant',
                'tech' => ['SQL', 'Database Design', 'ERD', 'Mentoring'],
                'project_url' => null,
                'github_url' => null,
                'points' => [
                    'Mendukung pelaksanaan perkuliahan dan praktikum dasar manajemen data dan desain database untuk satu kelas mahasiswa.',
                    'Membantu menyampaikan materi, memandu sesi praktikum, mengelola penilaian, dan membimbing mahasiswa dalam pemecahan query SQL praktis.',
                ],
                'is_active' => true,
                'order_index' => 8,
            ],
        ];
    }

    public static function all(): array
    {
        $path = self::getFilePath();
        if (File::exists($path)) {
            $data = json_decode(File::get($path), true);
            if (is_array($data)) {
                usort($data, fn($a, $b) => ($a['order_index'] ?? 0) <=> ($b['order_index'] ?? 0));
                return $data;
            }
        }

        // Initialize with defaults if file doesn't exist
        $defaults = self::defaults();
        self::save($defaults);
        return $defaults;
    }

    public static function save(array $items): void
    {
        $dir = dirname(self::getFilePath());
        if (!File::isDirectory($dir)) {
            File::makeDirectory($dir, 0755, true);
        }
        File::put(self::getFilePath(), json_encode(array_values($items), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }

    public static function create(array $attributes): array
    {
        $items = self::all();
        $id = 'exp_' . time() . '_' . Str::random(4);

        $newItem = [
            'id' => $id,
            'title' => $attributes['title'] ?? '',
            'company' => $attributes['company'] ?? '',
            'period' => $attributes['period'] ?? '',
            'badge' => $attributes['badge'] ?? 'Internship',
            'tech' => is_array($attributes['tech'] ?? null) ? $attributes['tech'] : (
                is_string($attributes['tech'] ?? null) ? array_values(array_filter(array_map('trim', explode(',', $attributes['tech'])))) : []
            ),
            'project_url' => $attributes['project_url'] ?? null,
            'github_url' => $attributes['github_url'] ?? null,
            'points' => is_array($attributes['points'] ?? null) ? $attributes['points'] : (
                is_string($attributes['points'] ?? null) ? array_values(array_filter(array_map('trim', explode("\n", $attributes['points'])))) : []
            ),
            'is_active' => isset($attributes['is_active']) ? (bool) $attributes['is_active'] : true,
            'order_index' => isset($attributes['order_index']) ? (int) $attributes['order_index'] : count($items) + 1,
        ];

        $items[] = $newItem;
        self::save($items);
        return $newItem;
    }

    public static function update(string $id, array $attributes): ?array
    {
        $items = self::all();
        $updated = null;

        foreach ($items as &$item) {
            if ($item['id'] === $id) {
                if (isset($attributes['title'])) $item['title'] = $attributes['title'];
                if (isset($attributes['company'])) $item['company'] = $attributes['company'];
                if (isset($attributes['period'])) $item['period'] = $attributes['period'];
                if (isset($attributes['badge'])) $item['badge'] = $attributes['badge'];
                if (isset($attributes['tech'])) {
                    $item['tech'] = is_array($attributes['tech']) ? $attributes['tech'] : (
                        is_string($attributes['tech']) ? array_values(array_filter(array_map('trim', explode(',', $attributes['tech'])))) : []
                    );
                }
                if (array_key_exists('project_url', $attributes)) $item['project_url'] = $attributes['project_url'];
                if (array_key_exists('github_url', $attributes)) $item['github_url'] = $attributes['github_url'];
                if (isset($attributes['points'])) {
                    $item['points'] = is_array($attributes['points']) ? $attributes['points'] : (
                        is_string($attributes['points']) ? array_values(array_filter(array_map('trim', explode("\n", $attributes['points'])))) : []
                    );
                }
                if (isset($attributes['is_active'])) $item['is_active'] = (bool) $attributes['is_active'];
                if (isset($attributes['order_index'])) $item['order_index'] = (int) $attributes['order_index'];

                $updated = $item;
                break;
            }
        }

        if ($updated) {
            self::save($items);
        }

        return $updated;
    }

    public static function toggle(string $id): ?array
    {
        $items = self::all();
        $updated = null;

        foreach ($items as &$item) {
            if ($item['id'] === $id) {
                $item['is_active'] = !($item['is_active'] ?? true);
                $updated = $item;
                break;
            }
        }

        if ($updated) {
            self::save($items);
        }

        return $updated;
    }

    public static function delete(string $id): bool
    {
        $items = self::all();
        $initialCount = count($items);
        $items = array_values(array_filter($items, fn($item) => $item['id'] !== $id));

        if (count($items) !== $initialCount) {
            self::save($items);
            return true;
        }

        return false;
    }
}

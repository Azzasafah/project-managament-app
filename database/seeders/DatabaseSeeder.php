<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     * Mengorkestrasikan seeder secara modular dan terstruktur.
     */
    public function run(): void
    {
        // 1. Admin User (Kredensial disamarkan melalui UserSeeder & .env)
        $this->call(UserSeeder::class);

        // 2. Data CV & Portfolio: 8 GitHub Projects, 5 Rekam Jejak Magang & Freelance, Sertifikasi Azure & TOEFL, dsb.
        $this->call(CvPortfolioSeeder::class);

        // 3. SafahFlow Hub: ADE Bootcamp 36 Sesi, 5 Proyek Inti Data Engineering, Spiritual & Daily Chores
        $this->call(SafahFlowMasterSeeder::class);
    }
}

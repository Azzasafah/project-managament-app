<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Username & password disamarkan demi keamanan dan kerahasiaan kredensial.
     * Nilai riil dapat disesuaikan melalui file .env lokal (ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD).
     */
    public function run(): void
    {
        // Jangan buat user baru jika di database sudah ada akun yang terdaftar
        if (User::exists()) {
            return;
        }

        // Kredensial disamarkan (masked) secara default
        $maskedName = env('ADMIN_NAME', 'Admin (Identitas Disamarkan)');
        $maskedEmail = env('ADMIN_EMAIL', 'admin_***@example.internal');
        $maskedPassword = env('ADMIN_PASSWORD', 'Kredensial_Disamarkan_2026!');

        User::create([
            'name' => $maskedName,
            'email' => $maskedEmail,
            'password' => Hash::make($maskedPassword),
            'email_verified_at' => now(),
        ]);
    }
}

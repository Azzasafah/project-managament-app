<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('admin:set {email? : Email admin baru} {password? : Password admin baru}', function () {
    $email = $this->argument('email') ?: $this->ask('Masukkan email admin', 'muhammad.hafizh0408@gmail.com');
    $password = $this->argument('password') ?: $this->secret('Masukkan kata sandi baru');

    if (empty($password)) {
        $password = 'admin123';
        $this->warn("Kata sandi tidak diisi, menggunakan default: 'admin123'");
    }

    $user = \App\Models\User::first();
    if ($user) {
        $user->email = $email;
        $user->password = \Illuminate\Support\Facades\Hash::make($password);
        $user->save();
        $this->info("Berhasil memperbarui akun admin ID #{$user->id}!");
    } else {
        $user = \App\Models\User::create([
            'name' => 'Muhammad Hafizh Azzasafah',
            'email' => $email,
            'password' => \Illuminate\Support\Facades\Hash::make($password),
        ]);
        $this->info("Berhasil membuat akun admin baru ID #{$user->id}!");
    }

    $this->table(['Field', 'Value'], [
        ['Nama', $user->name],
        ['Email', $user->email],
        ['Status Password', 'Telah di-hash & aktif'],
    ]);
})->purpose('Atur email dan password admin secara instan');

Artisan::command('admin:show', function () {
    $user = \App\Models\User::first();
    if (!$user) {
        $this->error('Belum ada akun user di database.');
        return;
    }

    $this->table(['ID', 'Nama', 'Email', 'Created At'], [
        [$user->id, $user->name, $user->email, $user->created_at],
    ]);
})->purpose('Tampilkan informasi user admin');


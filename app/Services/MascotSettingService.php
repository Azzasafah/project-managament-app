<?php

namespace App\Services;

use Illuminate\Support\Facades\File;

class MascotSettingService
{
    protected static function getFilePath(): string
    {
        return storage_path('app/settings/mascot.json');
    }

    public static function defaults(): array
    {
        return [
            'name' => 'CHISA.SYS',
            'role' => 'AI // COMPANION',
            'avatar_url' => '/chisa.webp',
            'voice_url' => '/sounds/001_No7 Morning.wav',
            'dialogue' => 'Konnichiwa! Sistem neural azzasafah.my.id berjalan optimal. Senang bertemu denganmu!',
            'subtext' => 'HOLOGRAPHIC_UNIT',
            'badge_status' => 'ACTIVE',
            'tagline_left' => 'DATA_ENG..BACKEND',
            'tagline_right' => 'V2026.9',
            'updated_at' => null,
        ];
    }

    public static function get(): array
    {
        $path = self::getFilePath();
        if (File::exists($path)) {
            $json = json_decode(File::get($path), true);
            if (is_array($json)) {
                return array_merge(self::defaults(), $json);
            }
        }
        return self::defaults();
    }

    public static function update(array $data): array
    {
        $current = self::get();
        $merged = array_merge($current, $data);
        $merged['updated_at'] = now()->toIso8601String();

        $dir = dirname(self::getFilePath());
        if (!File::isDirectory($dir)) {
            File::makeDirectory($dir, 0755, true);
        }

        File::put(self::getFilePath(), json_encode($merged, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        return $merged;
    }
}

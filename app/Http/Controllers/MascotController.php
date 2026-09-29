<?php

namespace App\Http\Controllers;

use App\Services\MascotSettingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MascotController extends Controller
{
    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => ['nullable', 'string', 'max:50'],
            'role' => ['nullable', 'string', 'max:50'],
            'avatar_url' => ['nullable', 'string', 'max:500'],
            'voice_url' => ['nullable', 'string', 'max:500'],
            'dialogue' => ['nullable', 'string', 'max:500'],
            'subtext' => ['nullable', 'string', 'max:50'],
            'badge_status' => ['nullable', 'string', 'max:30'],
            'tagline_left' => ['nullable', 'string', 'max:50'],
            'tagline_right' => ['nullable', 'string', 'max:50'],
            'avatar_file' => ['nullable', 'file', 'mimes:png,jpg,jpeg,webp,gif,svg', 'max:5120'],
            'voice_file' => ['nullable', 'file', 'mimes:wav,mp3,ogg,m4a', 'max:10240'],
        ]);

        $updates = [];

        foreach (['name', 'role', 'dialogue', 'subtext', 'badge_status', 'tagline_left', 'tagline_right'] as $field) {
            if ($request->has($field) && $request->input($field) !== null) {
                $updates[$field] = $request->input($field);
            }
        }

        // Avatar handling
        if ($request->hasFile('avatar_file')) {
            $file = $request->file('avatar_file');
            $filename = 'mascot_' . time() . '_' . Str::random(6) . '.' . $file->getClientOriginalExtension();
            $destination = public_path('uploads/mascot');
            if (!File::isDirectory($destination)) {
                File::makeDirectory($destination, 0755, true);
            }
            $file->move($destination, $filename);
            $updates['avatar_url'] = '/uploads/mascot/' . $filename;
        } elseif ($request->filled('avatar_url')) {
            $updates['avatar_url'] = $request->input('avatar_url');
        }

        // Voice handling
        if ($request->hasFile('voice_file')) {
            $file = $request->file('voice_file');
            $filename = 'voice_' . time() . '_' . Str::random(6) . '.' . $file->getClientOriginalExtension();
            $destination = public_path('uploads/sounds');
            if (!File::isDirectory($destination)) {
                File::makeDirectory($destination, 0755, true);
            }
            $file->move($destination, $filename);
            $updates['voice_url'] = '/uploads/sounds/' . $filename;
        } elseif ($request->filled('voice_url')) {
            $updates['voice_url'] = $request->input('voice_url');
        }

        MascotSettingService::update($updates);

        return redirect()->back()->with('success', 'Konfigurasi Maskot & Voice AI berhasil diperbarui!');
    }

    public function reset()
    {
        $defaults = MascotSettingService::defaults();
        MascotSettingService::update($defaults);

        return redirect()->back()->with('success', 'Maskot & Voice AI berhasil dikembalikan ke default Chisa.');
    }
}

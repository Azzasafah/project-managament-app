<?php

namespace App\Http\Controllers;

use App\Models\RefreshingActivity;
use App\Models\SleepLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WellbeingController extends Controller
{
    public function storeSleep(Request $request)
    {
        $validated = $request->validate([
            'sleep_date' => 'required|date',
            'sleep_time' => 'nullable|string|max:10', // e.g. 22:30
            'wake_time' => 'nullable|string|max:10',  // e.g. 06:30
            'duration_hours' => 'nullable|numeric|min:0|max:24',
            'fall_asleep_time' => 'nullable|string|max:50',
            'wake_up_count' => 'nullable|string|max:50',
            'morning_feeling' => 'nullable|string|max:50',
            'score' => 'nullable|integer|min:0|max:100',
            'quality' => 'nullable|string|max:50',
            'recommendation' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        // Auto calculate duration from sleep_time & wake_time if provided
        $durationHours = $validated['duration_hours'] ?? null;
        if (!empty($validated['sleep_time']) && !empty($validated['wake_time'])) {
            try {
                $start = Carbon::createFromFormat('H:i', $validated['sleep_time']);
                $end = Carbon::createFromFormat('H:i', $validated['wake_time']);
                if ($end->lessThanOrEqualTo($start)) {
                    $end->addDay();
                }
                $durationHours = round($start->diffInMinutes($end) / 60, 1);
            } catch (\Exception $e) {
                // fallback to passed duration
            }
        }

        $durationHours = $durationHours ?: 7.5;

        // Auto calculate Sleep Score (0-100) if not explicitly supplied
        $score = $validated['score'] ?? null;
        if ($score === null) {
            $durationScore = 5;
            if ($durationHours >= 7.0 && $durationHours <= 9.0) {
                $durationScore = 45;
            } elseif ($durationHours >= 6.0) {
                $durationScore = 35;
            } elseif ($durationHours >= 5.0) {
                $durationScore = 25;
            } elseif ($durationHours >= 4.0) {
                $durationScore = 15;
            }

            $latencyScore = match ($validated['fall_asleep_time'] ?? '') {
                '≤15 menit' => 20,
                '16–30 menit' => 15,
                '31–60 menit' => 10,
                '>60 menit' => 3,
                default => 15,
            };

            $wakeUpScore = match ($validated['wake_up_count'] ?? '') {
                '0 kali' => 15,
                '1 kali' => 12,
                '2–3 kali' => 7,
                '>3 kali' => 2,
                default => 12,
            };

            $feelingScore = match ($validated['morning_feeling'] ?? '') {
                'Sangat segar', '😄 Sangat segar' => 20,
                'Cukup segar', '🙂 Cukup segar' => 15,
                'Lelah', '😐 Lelah' => 8,
                'Sangat lelah', '😫 Sangat lelah' => 2,
                default => 15,
            };

            $score = min(100, max(0, $durationScore + $latencyScore + $wakeUpScore + $feelingScore));
        }

        // Quality Category
        $quality = $validated['quality'] ?? null;
        if (!$quality) {
            if ($score >= 85) {
                $quality = 'EXCELLENT';
            } elseif ($score >= 70) {
                $quality = 'GOOD';
            } elseif ($score >= 50) {
                $quality = 'FAIR';
            } else {
                $quality = 'POOR';
            }
        }

        // Generate smart recommendation if not supplied
        $recommendation = $validated['recommendation'] ?? null;
        if (!$recommendation) {
            if ($score >= 85) {
                $recommendation = 'Kualitas tidurmu sangat optimal dan prima! Pertahankan jadwal tidur yang konsisten untuk menjaga stamina.';
            } elseif ($durationHours < 6.5) {
                $recommendation = 'Durasi tidurmu masih di bawah target 7 jam. Coba tidur 30–60 menit lebih awal malam ini untuk memulihkan energi.';
            } elseif (in_array($validated['wake_up_count'] ?? '', ['2–3 kali', '>3 kali'])) {
                $recommendation = 'Durasi tidurmu sudah cukup, namun kamu masih beberapa kali terbangun. Pastikan kamar sejuk dan hindari minuman berkafein menjelang tidur.';
            } elseif (in_array($validated['fall_asleep_time'] ?? '', ['31–60 menit', '>60 menit'])) {
                $recommendation = 'Kamu membutuhkan waktu agak lama untuk terlelap. Hindari layar biru/gadget 30 menit sebelum tidur dan coba teknik pernapasan relaksasi.';
            } else {
                $recommendation = 'Pola tidurmu tergolong baik. Jaga hidrasi air putih setelah bangun dan konsistensi waktu tidur.';
            }
        }

        SleepLog::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'sleep_date' => $validated['sleep_date'],
            ],
            [
                'duration_hours' => $durationHours,
                'sleep_time' => $validated['sleep_time'] ?? null,
                'wake_time' => $validated['wake_time'] ?? null,
                'fall_asleep_time' => $validated['fall_asleep_time'] ?? '16–30 menit',
                'wake_up_count' => $validated['wake_up_count'] ?? '0 kali',
                'morning_feeling' => $validated['morning_feeling'] ?? 'Cukup segar',
                'score' => $score,
                'quality' => $quality,
                'recommendation' => $recommendation,
                'notes' => $validated['notes'] ?? null,
            ]
        );

        return redirect()->back()->with('success', 'Log tidur & analisis Sleep Score berhasil disimpan.');
    }

    public function storeRefreshing(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'icon' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'last_done_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        RefreshingActivity::create([
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'category' => $validated['category'],
            'icon' => !empty($validated['icon']) ? $validated['icon'] : 'ph-game-controller',
            'color' => !empty($validated['color']) ? $validated['color'] : 'emerald',
            'last_done_date' => !empty($validated['last_done_date']) ? $validated['last_done_date'] : Carbon::today(),
            'notes' => $validated['notes'] ?? null,
        ]);

        return redirect()->back()->with('success', 'Aktivitas refreshing baru ditambahkan.');
    }

    public function markRefreshingDone(Request $request, RefreshingActivity $refreshingActivity)
    {
        $today = Carbon::today()->format('Y-m-d');
        $currentDate = $refreshingActivity->last_done_date 
            ? Carbon::parse($refreshingActivity->last_done_date)->format('Y-m-d') 
            : null;

        if ($currentDate === $today) {
            // Toggle kembali ke kemarin (belum selesai hari ini)
            $refreshingActivity->update([
                'last_done_date' => Carbon::yesterday(),
            ]);
            $message = 'Status aktivitas diubah menjadi belum selesai.';
        } else {
            // Tandai selesai hari ini
            $refreshingActivity->update([
                'last_done_date' => Carbon::today(),
            ]);
            $message = 'Aktivitas ditandai selesai hari ini!';
        }

        return redirect()->back()->with('success', $message);
    }

    public function destroyRefreshing(Request $request, RefreshingActivity $refreshingActivity)
    {
        $refreshingActivity->delete();

        return redirect()->back()->with('success', 'Aktivitas refreshing dihapus.');
    }
}

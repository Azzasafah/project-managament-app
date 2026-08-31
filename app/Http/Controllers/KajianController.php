<?php

namespace App\Http\Controllers;

use App\Models\KajianSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KajianController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'speaker' => 'nullable|string|max:255',
            'event_date' => 'required|date',
            'time_info' => 'required|string|max:100',
            'location' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        KajianSchedule::create([
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'speaker' => $validated['speaker'],
            'event_date' => $validated['event_date'],
            'time_info' => $validated['time_info'],
            'location' => $validated['location'],
            'notes' => $validated['notes'],
            'is_completed' => false,
        ]);

        return redirect()->back()->with('success', 'Jadwal / Catatan kajian berhasil disimpan.');
    }

    public function update(Request $request, KajianSchedule $kajianSchedule)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'speaker' => 'nullable|string|max:255',
            'event_date' => 'required|date',
            'time_info' => 'required|string|max:100',
            'location' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'is_completed' => 'nullable|boolean',
        ]);

        $kajianSchedule->update($validated);

        return redirect()->back()->with('success', 'Data kajian berhasil diperbarui.');
    }

    public function toggleComplete(Request $request, KajianSchedule $kajianSchedule)
    {
        $kajianSchedule->update([
            'is_completed' => !$kajianSchedule->is_completed,
        ]);

        return redirect()->back()->with('success', 'Status kajian diperbarui.');
    }

    public function destroy(Request $request, KajianSchedule $kajianSchedule)
    {
        $kajianSchedule->delete();

        return redirect()->back()->with('success', 'Kajian berhasil dihapus.');
    }
}

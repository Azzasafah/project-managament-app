<?php

namespace App\Http\Controllers;

use App\Models\LearningJournal;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LearningJournalController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'study_date' => 'required|date',
            'content' => 'required|string',
            'tags' => 'nullable|string',
        ]);

        $tagsArray = [];
        if (!empty($validated['tags'])) {
            $tagsArray = array_map('trim', explode(',', $validated['tags']));
        }

        $snippet = mb_strimwidth(strip_tags($validated['content']), 0, 240, '...');

        LearningJournal::create([
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'category' => $validated['category'],
            'study_date' => $validated['study_date'],
            'snippet' => $snippet,
            'content' => $validated['content'],
            'tags' => $tagsArray,
        ]);

        return redirect()->back()->with('success', 'Entri jurnal berhasil disimpan.');
    }

    public function show(LearningJournal $learningJournal)
    {
        return response()->json([
            'success' => true,
            'journal' => $learningJournal
        ]);
    }

    public function update(Request $request, LearningJournal $learningJournal)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'study_date' => 'required|date',
            'content' => 'required|string',
            'tags' => 'nullable|string',
        ]);

        $tagsArray = [];
        if (!empty($validated['tags'])) {
            $tagsArray = array_map('trim', explode(',', $validated['tags']));
        }

        $snippet = mb_strimwidth(strip_tags($validated['content']), 0, 240, '...');

        $learningJournal->update([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'study_date' => $validated['study_date'],
            'snippet' => $snippet,
            'content' => $validated['content'],
            'tags' => $tagsArray,
        ]);

        return redirect()->back()->with('success', 'Entri jurnal berhasil diperbarui.');
    }

    public function destroy(Request $request, LearningJournal $learningJournal)
    {
        $learningJournal->delete();

        return redirect()->back()->with('success', 'Entri jurnal berhasil dihapus.');
    }
}

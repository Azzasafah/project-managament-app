<?php

namespace App\Http\Controllers;

use App\Services\WorkExperienceService;
use Illuminate\Http\Request;

class WorkExperienceController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'company' => ['required', 'string', 'max:255'],
            'period' => ['nullable', 'string', 'max:100'],
            'badge' => ['nullable', 'string', 'max:100'],
            'tech' => ['nullable'],
            'project_url' => ['nullable', 'url', 'max:500'],
            'github_url' => ['nullable', 'url', 'max:500'],
            'points' => ['nullable'],
            'is_active' => ['nullable', 'boolean'],
            'order_index' => ['nullable', 'integer'],
        ]);

        WorkExperienceService::create($validated);

        return redirect()->back()->with('success', 'Pengalaman kerja & magang berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'company' => ['required', 'string', 'max:255'],
            'period' => ['nullable', 'string', 'max:100'],
            'badge' => ['nullable', 'string', 'max:100'],
            'tech' => ['nullable'],
            'project_url' => ['nullable', 'url', 'max:500'],
            'github_url' => ['nullable', 'url', 'max:500'],
            'points' => ['nullable'],
            'is_active' => ['nullable', 'boolean'],
            'order_index' => ['nullable', 'integer'],
        ]);

        WorkExperienceService::update($id, $validated);

        return redirect()->back()->with('success', 'Pengalaman kerja & magang berhasil diperbarui.');
    }

    public function toggle($id)
    {
        WorkExperienceService::toggle($id);

        return redirect()->back()->with('success', 'Status visibilitas pengalaman berhasil diubah.');
    }

    public function destroy($id)
    {
        WorkExperienceService::delete($id);

        return redirect()->back()->with('success', 'Pengalaman kerja & magang berhasil dihapus.');
    }
}

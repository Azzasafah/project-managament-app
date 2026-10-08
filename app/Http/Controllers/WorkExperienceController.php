<?php

namespace App\Http\Controllers;

use App\Services\WorkExperienceService;
use Illuminate\Http\Request;

class WorkExperienceController extends Controller
{
    protected function cleanData(Request $request): void
    {
        if (!$request->filled('project_url')) {
            $request->merge(['project_url' => null]);
        }
        if (!$request->filled('github_url')) {
            $request->merge(['github_url' => null]);
        }
        if (!$request->filled('period')) {
            $request->merge(['period' => null]);
        }
        if (!$request->filled('badge')) {
            $request->merge(['badge' => 'Experience']);
        }
        if ($request->has('tech')) {
            $tech = $request->input('tech');
            if (is_string($tech)) {
                $tech = array_values(array_filter(array_map('trim', explode(',', $tech))));
                $request->merge(['tech' => $tech]);
            } elseif (is_array($tech)) {
                $request->merge(['tech' => array_values(array_filter(array_map('trim', $tech)))]);
            }
        }
        if ($request->has('points') && is_string($request->input('points'))) {
            $pts = array_values(array_filter(array_map('trim', explode("\n", $request->input('points')))));
            $request->merge(['points' => $pts]);
        }
    }

    public function store(Request $request)
    {
        $this->cleanData($request);

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
        $this->cleanData($request);

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

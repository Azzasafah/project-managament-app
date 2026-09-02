<?php

namespace App\Http\Controllers;

use App\Models\FreelanceProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FreelanceProjectController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'client_name' => ['required', 'string', 'max:255'],
            'role_scope' => ['nullable', 'string', 'max:255'],
            'period' => ['nullable', 'string', 'max:100'],
            'tech_stack' => ['nullable', 'array'],
            'description' => ['nullable', 'string'],
            'project_url' => ['nullable', 'url', 'max:500'],
            'github_url' => ['nullable', 'url', 'max:500'],
            'status' => ['nullable', 'in:completed,ongoing'],
            'order_index' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order_index'] = $request->input('order_index', 0);
        $validated['status'] = $request->input('status', 'completed');

        Auth::user()->freelanceProjects()->create($validated);

        return redirect()->back()->with('success', 'Proyek freelance berhasil ditambahkan.');
    }

    public function update(Request $request, FreelanceProject $freelanceProject)
    {
        if ($freelanceProject->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'client_name' => ['required', 'string', 'max:255'],
            'role_scope' => ['nullable', 'string', 'max:255'],
            'period' => ['nullable', 'string', 'max:100'],
            'tech_stack' => ['nullable', 'array'],
            'description' => ['nullable', 'string'],
            'project_url' => ['nullable', 'url', 'max:500'],
            'github_url' => ['nullable', 'url', 'max:500'],
            'status' => ['nullable', 'in:completed,ongoing'],
            'order_index' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order_index'] = $request->input('order_index', 0);
        $validated['status'] = $request->input('status', 'completed');

        $freelanceProject->update($validated);

        return redirect()->back()->with('success', 'Proyek freelance berhasil diperbarui.');
    }

    public function toggle(FreelanceProject $freelanceProject)
    {
        if ($freelanceProject->user_id !== Auth::id()) {
            abort(403);
        }

        $freelanceProject->update([
            'is_active' => !$freelanceProject->is_active,
        ]);

        return redirect()->back()->with('success', 'Status visibilitas proyek freelance diperbarui.');
    }

    public function destroy(FreelanceProject $freelanceProject)
    {
        if ($freelanceProject->user_id !== Auth::id()) {
            abort(403);
        }

        $freelanceProject->delete();

        return redirect()->back()->with('success', 'Proyek freelance berhasil dihapus.');
    }
}

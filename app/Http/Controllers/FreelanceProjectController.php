<?php

namespace App\Http\Controllers;

use App\Models\FreelanceProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FreelanceProjectController extends Controller
{
    protected function cleanData(Request $request): void
    {
        if (!$request->filled('project_url')) {
            $request->merge(['project_url' => null]);
        }
        if (!$request->filled('github_url')) {
            $request->merge(['github_url' => null]);
        }
        if (!$request->filled('role_scope')) {
            $request->merge(['role_scope' => null]);
        }
        if (!$request->filled('period')) {
            $request->merge(['period' => null]);
        }
        if ($request->has('tech_stack')) {
            $tech = $request->input('tech_stack');
            if (is_string($tech)) {
                $tech = array_values(array_filter(array_map('trim', explode(',', $tech))));
                $request->merge(['tech_stack' => $tech]);
            } elseif (is_array($tech)) {
                $request->merge(['tech_stack' => array_values(array_filter(array_map('trim', $tech)))]);
            }
        }
    }

    public function store(Request $request)
    {
        $this->cleanData($request);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'client_name' => ['required', 'string', 'max:255'],
            'role_scope' => ['nullable', 'string', 'max:255'],
            'period' => ['nullable', 'string', 'max:100'],
            'tech_stack' => ['nullable'],
            'description' => ['nullable', 'string'],
            'project_url' => ['nullable', 'url', 'max:500'],
            'github_url' => ['nullable', 'url', 'max:500'],
            'status' => ['nullable', 'in:completed,ongoing'],
            'order_index' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $validated['user_id'] = Auth::id() ?? 1;
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order_index'] = (int) $request->input('order_index', 0);
        $validated['status'] = $request->input('status', 'completed');

        FreelanceProject::create($validated);

        return redirect()->back()->with('success', 'Proyek freelance berhasil ditambahkan.');
    }

    public function update(Request $request, FreelanceProject $freelanceProject)
    {
        $this->cleanData($request);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'client_name' => ['required', 'string', 'max:255'],
            'role_scope' => ['nullable', 'string', 'max:255'],
            'period' => ['nullable', 'string', 'max:100'],
            'tech_stack' => ['nullable'],
            'description' => ['nullable', 'string'],
            'project_url' => ['nullable', 'url', 'max:500'],
            'github_url' => ['nullable', 'url', 'max:500'],
            'status' => ['nullable', 'in:completed,ongoing'],
            'order_index' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $validated['user_id'] = Auth::id() ?? $freelanceProject->user_id ?? 1;
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order_index'] = (int) $request->input('order_index', 0);
        $validated['status'] = $request->input('status', 'completed');

        $freelanceProject->update($validated);

        return redirect()->back()->with('success', 'Proyek freelance berhasil diperbarui.');
    }

    public function toggle(FreelanceProject $freelanceProject)
    {
        $freelanceProject->update([
            'is_active' => !$freelanceProject->is_active,
        ]);

        return redirect()->back()->with('success', 'Status visibilitas proyek freelance diperbarui.');
    }

    public function destroy(FreelanceProject $freelanceProject)
    {
        $freelanceProject->delete();

        return redirect()->back()->with('success', 'Proyek freelance berhasil dihapus.');
    }
}

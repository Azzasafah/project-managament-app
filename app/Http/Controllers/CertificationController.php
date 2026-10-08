<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CertificationController extends Controller
{
    protected function cleanData(Request $request): void
    {
        if (!$request->filled('credential_url')) {
            $request->merge(['credential_url' => null]);
        }
        if (!$request->filled('credential_id')) {
            $request->merge(['credential_id' => null]);
        }
        if (!$request->filled('issue_date')) {
            $request->merge(['issue_date' => null]);
        }
        if ($request->has('skills')) {
            $skills = $request->input('skills');
            if (is_string($skills)) {
                $skills = array_values(array_filter(array_map('trim', explode(',', $skills))));
                $request->merge(['skills' => $skills]);
            } elseif (is_array($skills)) {
                $request->merge(['skills' => array_values(array_filter(array_map('trim', $skills)))]);
            }
        }
    }

    public function store(Request $request)
    {
        $this->cleanData($request);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'issuer' => ['required', 'string', 'max:255'],
            'type' => ['required', 'in:official,internship'],
            'issue_date' => ['nullable', 'string', 'max:100'],
            'credential_id' => ['nullable', 'string', 'max:255'],
            'credential_url' => ['nullable', 'url', 'max:500'],
            'skills' => ['nullable', 'array'],
            'description' => ['nullable', 'string'],
            'order_index' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $validated['user_id'] = Auth::id() ?? 1;
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order_index'] = (int) $request->input('order_index', 0);

        Certification::create($validated);

        return redirect()->back()->with('success', 'Kredensial sertifikasi berhasil ditambahkan.');
    }

    public function update(Request $request, Certification $certification)
    {
        $this->cleanData($request);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'issuer' => ['required', 'string', 'max:255'],
            'type' => ['required', 'in:official,internship'],
            'issue_date' => ['nullable', 'string', 'max:100'],
            'credential_id' => ['nullable', 'string', 'max:255'],
            'credential_url' => ['nullable', 'url', 'max:500'],
            'skills' => ['nullable', 'array'],
            'description' => ['nullable', 'string'],
            'order_index' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $validated['user_id'] = Auth::id() ?? $certification->user_id ?? 1;
        $validated['is_active'] = $request->boolean('is_active', true);

        $certification->update($validated);

        return redirect()->back()->with('success', 'Kredensial sertifikasi berhasil diperbarui.');
    }

    public function destroy(Certification $certification)
    {
        $certification->delete();

        return redirect()->back()->with('success', 'Kredensial sertifikasi berhasil dihapus.');
    }
}

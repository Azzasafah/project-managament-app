<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CertificationController extends Controller
{
    public function store(Request $request)
    {
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

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order_index'] = $request->input('order_index', 0);

        Auth::user()->certifications()->create($validated);

        return redirect()->back()->with('success', 'Kredensial sertifikasi berhasil ditambahkan.');
    }

    public function update(Request $request, Certification $certification)
    {
        if ($certification->user_id !== Auth::id()) {
            abort(403);
        }

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

        $certification->update($validated);

        return redirect()->back()->with('success', 'Kredensial sertifikasi berhasil diperbarui.');
    }

    public function destroy(Certification $certification)
    {
        if ($certification->user_id !== Auth::id()) {
            abort(403);
        }

        $certification->delete();

        return redirect()->back()->with('success', 'Kredensial sertifikasi berhasil dihapus.');
    }
}

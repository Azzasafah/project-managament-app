<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FaqController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'question' => ['required', 'string', 'max:255'],
            'answer' => ['required', 'string'],
            'category' => ['required', 'string', 'max:100'],
            'order_index' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order_index'] = $request->input('order_index', 0);

        Auth::user()->faqs()->create($validated);

        return redirect()->back()->with('success', 'FAQ berhasil ditambahkan.');
    }

    public function update(Request $request, Faq $faq)
    {
        if ($faq->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'question' => ['required', 'string', 'max:255'],
            'answer' => ['required', 'string'],
            'category' => ['required', 'string', 'max:100'],
            'order_index' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $faq->update($validated);

        return redirect()->back()->with('success', 'FAQ berhasil diperbarui.');
    }

    public function toggle(Faq $faq)
    {
        if ($faq->user_id !== Auth::id()) {
            abort(403);
        }

        $faq->update([
            'is_active' => !$faq->is_active,
        ]);

        return redirect()->back()->with('success', 'Status visibilitas FAQ berhasil diubah.');
    }

    public function destroy(Faq $faq)
    {
        if ($faq->user_id !== Auth::id()) {
            abort(403);
        }

        $faq->delete();

        return redirect()->back()->with('success', 'FAQ berhasil dihapus.');
    }
}

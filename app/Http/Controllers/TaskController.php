<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:todo,in_progress,done',
            'tag' => 'required|string|max:50',
            'priority' => 'nullable|in:low,medium,high',
            'date_label' => 'nullable|string|max:50',
            'due_date' => 'nullable|date',
        ]);

        $validated['user_id'] = Auth::id();
        $validated['priority'] = $validated['priority'] ?? 'medium';
        $validated['date_label'] = $validated['date_label'] ?: 'Hari Ini';
        $validated['order_index'] = Task::where('status', $validated['status'])->count();

        Task::create($validated);

        return redirect()->back()->with('success', 'Task berhasil ditambahkan.');
    }

    public function updateStatus(Request $request, Task $task)
    {
        $validated = $request->validate([
            'status' => 'required|in:todo,in_progress,done',
            'order_index' => 'nullable|integer',
        ]);

        $task->update([
            'status' => $validated['status'],
            'order_index' => $validated['order_index'] ?? $task->order_index,
        ]);

        return redirect()->back()->with('success', 'Status tugas diperbarui.');
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:todo,in_progress,done',
            'tag' => 'required|string|max:50',
            'priority' => 'nullable|in:low,medium,high',
            'date_label' => 'nullable|string|max:50',
            'due_date' => 'nullable|date',
            'is_portfolio' => 'nullable|boolean',
            'portfolio_summary' => 'nullable|string',
            'github_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'tech_stack' => 'nullable|array',
        ]);

        $task->update($validated);

        return redirect()->back()->with('success', 'Task berhasil diperbarui.');
    }

    public function togglePortfolio(Request $request, Task $task)
    {
        $validated = $request->validate([
            'is_portfolio' => 'required|boolean',
            'portfolio_summary' => 'nullable|string',
            'github_url' => 'nullable|string',
            'live_url' => 'nullable|string',
            'tech_stack' => 'nullable|string',
        ]);

        $techStackArray = null;
        if (!empty($validated['tech_stack'])) {
            $techStackArray = array_map('trim', explode(',', $validated['tech_stack']));
        }

        $task->update([
            'is_portfolio' => $validated['is_portfolio'],
            'portfolio_summary' => $validated['portfolio_summary'] ?? $task->portfolio_summary,
            'github_url' => $validated['github_url'] ?? $task->github_url,
            'live_url' => $validated['live_url'] ?? $task->live_url,
            'tech_stack' => $techStackArray ?? $task->tech_stack,
        ]);

        return redirect()->back()->with('success', $task->is_portfolio ? 'Proyek ditambahkan ke portofolio publik.' : 'Proyek dihapus dari portofolio.');
    }

    public function destroy(Request $request, Task $task)
    {
        $task->delete();

        return redirect()->back()->with('success', 'Task berhasil dihapus.');
    }
}

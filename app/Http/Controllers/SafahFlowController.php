<?php

namespace App\Http\Controllers;

use App\Models\BootcampAttendance;
use App\Models\BootcampSession;
use App\Models\ChoreLog;
use App\Models\DailyLog;
use App\Models\Project;
use App\Models\ProjectMilestone;
use App\Models\SpiritualLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SafahFlowController extends Controller
{
    /**
     * Toggle or cycle session attendance status
     * SCHEDULED -> ATTENDED -> WATCHED_RECORDING -> SCHEDULED
     */
    public function toggleSessionAttendance(Request $request, BootcampSession $session)
    {
        $user = Auth::user();

        $attendance = BootcampAttendance::firstOrCreate(
            ['user_id' => $user->id, 'bootcamp_session_id' => $session->id],
            ['status' => 'SCHEDULED']
        );

        $requestedStatus = $request->input('status');
        if ($requestedStatus) {
            $attendance->status = $requestedStatus;
        } else {
            // Cycle status
            if ($attendance->status === 'SCHEDULED') {
                $attendance->status = 'ATTENDED';
            } elseif ($attendance->status === 'ATTENDED') {
                $attendance->status = 'WATCHED_RECORDING';
            } else {
                $attendance->status = 'SCHEDULED';
            }
        }

        if ($request->has('summary_notes')) {
            $attendance->summary_notes = $request->input('summary_notes');
        }

        $attendance->save();

        return back()->with('success', "Status sesi {$session->session_number} berhasil diperbarui.");
    }

    /**
     * Update session details (Master Admin / HQ)
     */
    public function updateSession(Request $request, BootcampSession $session)
    {
        $validated = $request->validate([
            'session_name' => 'nullable|string|max:255',
            'scheduled_date' => 'required|date',
            'day_name' => 'required|string|max:50',
            'start_time' => 'required|string|max:20',
            'mentor_name' => 'nullable|string|max:255',
            'topic' => 'required|string',
            'target_project' => 'nullable|string|max:255',
            'zoom_url' => 'nullable|url|max:500',
            'recording_url' => 'nullable|url|max:500',
        ]);

        $session->update($validated);

        return back()->with('success', "Data Sesi {$session->session_number} berhasil diperbarui.");
    }

    /**
     * Store new session (Dynamic bootcamp session)
     */
    public function storeSession(Request $request)
    {
        $validated = $request->validate([
            'session_number' => 'required|integer|unique:bootcamp_sessions,session_number',
            'session_name' => 'required|string|max:255',
            'phase' => 'nullable|string|max:50',
            'scheduled_date' => 'required|date',
            'day_name' => 'required|string|max:50',
            'start_time' => 'required|string|max:20',
            'mentor_name' => 'nullable|string|max:255',
            'topic' => 'required|string',
            'target_project' => 'nullable|string|max:255',
            'zoom_url' => 'nullable|url|max:500',
            'recording_url' => 'nullable|url|max:500',
        ]);

        if (empty($validated['phase'])) {
            $validated['phase'] = 'CORE';
        }

        $session = BootcampSession::create($validated);

        $user = Auth::user();
        if ($user) {
            BootcampAttendance::create([
                'user_id' => $user->id,
                'bootcamp_session_id' => $session->id,
                'status' => 'SCHEDULED',
            ]);
        }

        return back()->with('success', "Sesi baru #{$session->session_number} berhasil ditambahkan.");
    }

    /**
     * Delete a session
     */
    public function destroySession(BootcampSession $session)
    {
        $num = $session->session_number;
        $session->delete();

        return back()->with('success', "Sesi #{$num} berhasil dihapus.");
    }

    /**
     * Store new Project (Dynamic portfolio/practicum project)
     */
    public function storeProject(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:projects,slug',
            'weight_percentage' => 'required|integer|min:0|max:100',
            'description' => 'nullable|string',
            'status' => 'required|string|in:PLANNING,IN_PROGRESS,FROZEN,COMPLETED',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']) . '-' . time();
        }

        Project::create($validated);

        return back()->with('success', "Proyek '{$validated['name']}' berhasil ditambahkan.");
    }

    /**
     * Update existing Project
     */
    public function updateProject(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:projects,slug,' . $project->id,
            'weight_percentage' => 'required|integer|min:0|max:100',
            'description' => 'nullable|string',
            'status' => 'required|string|in:PLANNING,IN_PROGRESS,FROZEN,COMPLETED',
        ]);

        $project->update($validated);

        return back()->with('success', "Proyek '{$project->name}' berhasil diperbarui.");
    }

    /**
     * Delete a Project
     */
    public function destroyProject(Project $project)
    {
        $name = $project->name;
        $project->delete();

        return back()->with('success', "Proyek '{$name}' berhasil dihapus.");
    }

    /**
     * Toggle Project Milestone completion
     */
    public function toggleMilestone(ProjectMilestone $milestone)
    {
        $milestone->is_completed = !$milestone->is_completed;
        $milestone->completed_at = $milestone->is_completed ? Carbon::now() : null;
        $milestone->save();

        return back()->with('success', "Milestone '{$milestone->title}' diperbarui.");
    }

    /**
     * Store new milestone for a project
     */
    public function storeMilestone(Request $request, Project $project)
    {
        $validated = $request->validate([
            'week_number' => 'required|integer|min:1|max:20',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $project->milestones()->create($validated);

        return back()->with('success', 'Milestone baru berhasil ditambahkan.');
    }

    /**
     * Delete a milestone
     */
    public function destroyMilestone(ProjectMilestone $milestone)
    {
        $milestone->delete();

        return back()->with('success', 'Milestone berhasil dihapus.');
    }

    /**
     * Toggle today's spiritual habits
     */
    public function toggleSpiritual(Request $request)
    {
        $user = Auth::user();
        $date = $request->input('date', Carbon::today()->format('Y-m-d'));
        $field = $request->input('field');

        $allowed = ['tahajud_witir', 'dzikir_pagi', 'dzikir_petang', 'al_mulk', 'al_kahfi', 'kajian_pagi', 'kajian_malam'];
        if (!in_array($field, $allowed)) {
            return back()->withErrors(['field' => 'Field tidak valid']);
        }

        $log = SpiritualLog::firstOrCreate(
            ['user_id' => $user->id, 'log_date' => $date]
        );

        $log->$field = !$log->$field;
        $log->save();

        return back()->with('success', 'Ibadah berhasil dicatat.');
    }

    /**
     * Toggle today's chore habits & update pomodoro timer
     */
    public function toggleChore(Request $request)
    {
        $user = Auth::user();
        $date = $request->input('date', Carbon::today()->format('Y-m-d'));
        $field = $request->input('field');

        $allowed = ['morning_done', 'evening_done', 'weekly_deep_done'];
        if (!in_array($field, $allowed)) {
            return back()->withErrors(['field' => 'Field tidak valid']);
        }

        $log = ChoreLog::firstOrCreate(
            ['user_id' => $user->id, 'log_date' => $date],
            ['focus_area' => 'Rutin Rumah Tangga']
        );

        $log->$field = !$log->$field;
        $log->save();

        return back()->with('success', 'Catatan kebersihan rumah diperbarui.');
    }

    /**
     * Log completed Pomodoro chore session
     */
    public function logPomodoro(Request $request)
    {
        $user = Auth::user();
        $date = $request->input('date', Carbon::today()->format('Y-m-d'));
        $minutes = (int) $request->input('minutes', 25);

        $log = ChoreLog::firstOrCreate(
            ['user_id' => $user->id, 'log_date' => $date],
            ['focus_area' => 'Rutin Rumah Tangga']
        );

        $log->timer_minutes += $minutes;
        $log->save();

        return back()->with('success', "Timer pomodoro ({$minutes} menit) selesai dan tercatat!");
    }

    /**
     * Update Daily Mission Log
     */
    public function updateDailyLog(Request $request)
    {
        $user = Auth::user();
        $date = $request->input('log_date', Carbon::today()->format('Y-m-d'));

        $validated = $request->validate([
            'day_type' => 'nullable|string|in:FULL_LAB,LIVE_CLASS_NIGHT,STUDY_LIGHT,AUDIT_CLEAN,DEEP_WORK,LIVE_CLASS_AFT',
            'effective_study_minutes' => 'nullable|integer|min:0',
            'key_output' => 'nullable|string',
            'error_and_solution' => 'nullable|string',
            'git_commit_hash' => 'nullable|string|max:50',
            'energy_level' => 'nullable|integer|min:1|max:5',
        ]);

        DailyLog::updateOrCreate(
            ['user_id' => $user->id, 'log_date' => $date],
            $validated
        );

        return back()->with('success', 'Misi harian berhasil disimpan.');
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BootcampAttendance;
use App\Models\BootcampSession;
use App\Models\ChoreLog;
use App\Models\DailyLog;
use App\Models\Project;
use App\Models\ProjectMilestone;
use App\Models\SpiritualLog;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class SafahFlowApiController extends Controller
{
    /**
     * Allowed fields for spiritual habit toggle.
     */
    public const SPIRITUAL_FIELDS = [
        'tahajud_witir',
        'dzikir_pagi',
        'dzikir_petang',
        'al_mulk',
        'al_kahfi',
        'kajian_pagi',
        'kajian_malam',
    ];

    /**
     * Allowed fields for household chore toggle.
     */
    public const CHORE_FIELDS = [
        'morning_done',
        'evening_done',
        'weekly_deep_done',
    ];

    /**
     * Retrieve active authenticated user with fallback to first user for demo/testing.
     */
    protected function getActiveUser(Request $request): User
    {
        $user = $request->user() ?? Auth::user() ?? User::first();

        if (! $user) {
            abort(response()->json([
                'status' => 'error',
                'message' => 'No active user found in workspace.',
            ], 401));
        }

        return $user;
    }

    /**
     * GET /api/v1/dashboard/today
     * Consolidated daily telemetry & command center metrics.
     */
    public function today(Request $request): JsonResponse
    {
        $user = $this->getActiveUser($request);
        $today = Carbon::today()->format('Y-m-d');
        $now = Carbon::now();

        // 1. Next Live Class
        $nextLiveClass = BootcampSession::where('scheduled_date', '>=', $today)
            ->orderBy('scheduled_date', 'asc')
            ->orderBy('start_time', 'asc')
            ->first();

        // 2. Telemetry Logs
        $dailyLog = DailyLog::where('user_id', $user->id)->where('log_date', $today)->first();
        $spiritualLog = SpiritualLog::where('user_id', $user->id)->where('log_date', $today)->first();
        $choreLog = ChoreLog::where('user_id', $user->id)->where('log_date', $today)->first();

        // 3. Portfolio Projects
        $projects = Project::with(['milestones' => fn ($q) => $q->orderBy('week_number')->orderBy('id')])
            ->get()
            ->map(fn (Project $p) => $this->formatProjectSummary($p));

        // 4. Curriculum Progress
        $totalSessions = BootcampSession::count();
        $attendedCount = BootcampAttendance::where('user_id', $user->id)
            ->where('status', 'ATTENDED')
            ->count();

        return response()->json([
            'status' => 'success',
            'date' => $today,
            'day_name' => $now->locale('id')->isoFormat('dddd'),
            'mode' => $dailyLog?->day_type ?? 'FULL_LAB',
            'mode_title' => 'Hari Sekolah Praktikum Penuh (Telkom ETL + Azure)',
            'next_live_class' => $nextLiveClass ? $this->formatSession($nextLiveClass) : null,
            'curriculum_stats' => [
                'total_sessions' => $totalSessions,
                'attended_count' => $attendedCount,
                'progress_pct' => $totalSessions > 0 ? round(($attendedCount / $totalSessions) * 100) : 0,
            ],
            'spiritual_log' => $this->formatSpiritualLog($spiritualLog),
            'chore_log' => $this->formatChoreLog($choreLog),
            'projects' => $projects,
        ]);
    }

    /**
     * GET /api/v1/sessions
     * List all bootcamp sessions with current user attendance status.
     */
    public function sessions(Request $request): JsonResponse
    {
        $user = $this->getActiveUser($request);

        $sessions = BootcampSession::with(['attendances' => fn ($q) => $q->where('user_id', $user->id)])
            ->orderBy('session_number')
            ->get()
            ->map(function (BootcampSession $s) {
                $att = $s->attendances->first();
                return $this->formatSession($s, $att?->status ?? 'SCHEDULED', $att?->summary_notes);
            });

        return response()->json([
            'status' => 'success',
            'data' => $sessions,
        ]);
    }

    /**
     * POST /api/v1/sessions/{session}/toggle
     * Toggle or set session attendance status.
     */
    public function toggleSession(Request $request, BootcampSession $session): JsonResponse
    {
        $user = $this->getActiveUser($request);

        $validated = $request->validate([
            'status' => 'nullable|string|in:ATTENDED,SCHEDULED,WATCHED_RECORDING,ABSENT',
        ]);

        $att = BootcampAttendance::firstOrCreate(
            ['user_id' => $user->id, 'bootcamp_session_id' => $session->id],
            ['status' => 'SCHEDULED']
        );

        $targetStatus = $validated['status'] ?? ($att->status === 'ATTENDED' ? 'SCHEDULED' : 'ATTENDED');
        $att->status = $targetStatus;
        $att->save();

        return response()->json([
            'status' => 'success',
            'session_number' => $session->session_number,
            'attendance_status' => $att->status,
        ]);
    }

    /**
     * GET /api/v1/projects
     * List portfolio projects along with their detailed milestones.
     */
    public function projects(): JsonResponse
    {
        $projects = Project::with(['milestones' => fn ($q) => $q->orderBy('week_number')->orderBy('id')])
            ->get()
            ->map(fn (Project $p) => $this->formatProjectDetail($p));

        return response()->json([
            'status' => 'success',
            'data' => $projects,
        ]);
    }

    /**
     * POST /api/v1/milestones/{milestone}/toggle
     * Toggle milestone completion flag and timestamp.
     */
    public function toggleMilestone(ProjectMilestone $milestone): JsonResponse
    {
        $milestone->is_completed = ! $milestone->is_completed;
        $milestone->completed_at = $milestone->is_completed ? Carbon::now() : null;
        $milestone->save();

        return response()->json([
            'status' => 'success',
            'milestone_id' => $milestone->id,
            'is_completed' => (bool) $milestone->is_completed,
            'project_progress_pct' => $milestone->project->progress_percentage,
        ]);
    }

    /**
     * POST /api/v1/spiritual/toggle
     * Toggle spiritual habit checklist for given date.
     */
    public function toggleSpiritual(Request $request): JsonResponse
    {
        $user = $this->getActiveUser($request);

        $validated = $request->validate([
            'field' => ['required', 'string', Rule::in(self::SPIRITUAL_FIELDS)],
            'date' => ['nullable', 'date_format:Y-m-d'],
        ]);

        $field = $validated['field'];
        $date = $validated['date'] ?? Carbon::today()->format('Y-m-d');

        $log = SpiritualLog::firstOrCreate(
            ['user_id' => $user->id, 'log_date' => $date]
        );

        $log->$field = ! $log->$field;
        $log->save();

        return response()->json([
            'status' => 'success',
            'field' => $field,
            'value' => (bool) $log->$field,
        ]);
    }

    /**
     * POST /api/v1/chores/toggle
     * Toggle household chore checklist item for given date.
     */
    public function toggleChore(Request $request): JsonResponse
    {
        $user = $this->getActiveUser($request);

        $validated = $request->validate([
            'field' => ['required', 'string', Rule::in(self::CHORE_FIELDS)],
            'date' => ['nullable', 'date_format:Y-m-d'],
        ]);

        $field = $validated['field'];
        $date = $validated['date'] ?? Carbon::today()->format('Y-m-d');

        $log = ChoreLog::firstOrCreate(
            ['user_id' => $user->id, 'log_date' => $date],
            ['focus_area' => 'Rutin Rumah Tangga']
        );

        $log->$field = ! $log->$field;
        $log->save();

        return response()->json([
            'status' => 'success',
            'field' => $field,
            'value' => (bool) $log->$field,
        ]);
    }

    // ==========================================
    // PRIVATE FORMATTERS (CLEAN & DRY)
    // ==========================================

    /**
     * Format bootcamp session entity.
     */
    private function formatSession(BootcampSession $s, ?string $attendanceStatus = null, ?string $summaryNotes = null): array
    {
        $data = [
            'id' => $s->id,
            'session_number' => $s->session_number,
            'session_name' => $s->session_name,
            'phase' => $s->phase,
            'scheduled_date' => $s->scheduled_date->format('Y-m-d'),
            'day_name' => $s->day_name,
            'start_time' => $s->start_time,
            'mentor_name' => $s->mentor_name,
            'topic' => $s->topic,
            'target_project' => $s->target_project,
            'zoom_url' => $s->zoom_url,
            'recording_url' => $s->recording_url,
        ];

        if ($attendanceStatus !== null) {
            $data['attendance_status'] = $attendanceStatus;
            $data['summary_notes'] = $summaryNotes;
        }

        return $data;
    }

    /**
     * Format project summary for dashboard widget.
     */
    private function formatProjectSummary(Project $p): array
    {
        return [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->slug,
            'weight_percentage' => $p->weight_percentage,
            'progress_pct' => $p->progress_percentage,
            'status' => $p->status,
            'repo_url' => $p->repo_url,
            'milestones_count' => $p->milestones->count(),
            'completed_milestones' => $p->milestones->where('is_completed', true)->count(),
        ];
    }

    /**
     * Format project detail for project list screen.
     */
    private function formatProjectDetail(Project $p): array
    {
        return [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->slug,
            'weight_percentage' => $p->weight_percentage,
            'progress_pct' => $p->progress_percentage,
            'description' => $p->description,
            'repo_url' => $p->repo_url,
            'status' => $p->status,
            'milestones' => $p->milestones,
        ];
    }

    /**
     * Format spiritual log with fallback defaults.
     */
    private function formatSpiritualLog(?SpiritualLog $log): array
    {
        $result = [];
        foreach (self::SPIRITUAL_FIELDS as $field) {
            $result[$field] = $log ? (bool) $log->$field : false;
        }
        return $result;
    }

    /**
     * Format chore log with fallback defaults.
     */
    private function formatChoreLog(?ChoreLog $log): array
    {
        return [
            'focus_area' => $log?->focus_area ?? 'Rutin Rumah Tangga',
            'morning_done' => (bool) ($log?->morning_done ?? false),
            'evening_done' => (bool) ($log?->evening_done ?? false),
            'weekly_deep_done' => (bool) ($log?->weekly_deep_done ?? false),
            'timer_minutes' => (int) ($log?->timer_minutes ?? 0),
        ];
    }
}

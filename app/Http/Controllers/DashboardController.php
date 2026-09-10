<?php

namespace App\Http\Controllers;

use App\Models\KajianSchedule;
use App\Models\LearningJournal;
use App\Models\RefreshingActivity;
use App\Models\SleepLog;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Tasks grouped by status
        $todoTasks = Task::where('status', 'todo')->orderBy('order_index')->orderBy('created_at', 'desc')->get();
        $inProgressTasks = Task::where('status', 'in_progress')->orderBy('order_index')->orderBy('created_at', 'desc')->get();
        $doneTasks = Task::where('status', 'done')->orderBy('order_index')->orderBy('updated_at', 'desc')->get();

        // Active tasks count
        $activeTasksCount = $todoTasks->count() + $inProgressTasks->count();

        // Learning journals
        $journals = LearningJournal::orderBy('study_date', 'desc')->get();
        $journalCount = $journals->count();

        // Kajian schedules (upcoming & notes)
        $upcomingKajians = KajianSchedule::where('event_date', '>=', Carbon::today()->subDays(1))
            ->orderBy('event_date', 'asc')
            ->get();
        
        $nearestKajian = $upcomingKajians->first() ?? KajianSchedule::latest('event_date')->first();

        $kajianNotes = KajianSchedule::whereNotNull('notes')
            ->orderBy('event_date', 'desc')
            ->get();

        // Sleep logs (last 7 days)
        $sleepLogs = SleepLog::where('sleep_date', '>=', Carbon::today()->subDays(6))
            ->orderBy('sleep_date', 'asc')
            ->get();

        // Ensure 7 days labels & values for charts
        $chartLabels = [];
        $chartSleepData = [];
        $dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

        for ($i = 6; $i >= 0; $i--) {
            $d = Carbon::today()->subDays($i);
            $dayName = $dayNames[$d->dayOfWeek];
            $chartLabels[] = $dayName;
            $dateStr = $d->format('Y-m-d');
            
            $log = $sleepLogs->first(function ($item) use ($dateStr) {
                return Carbon::parse($item->sleep_date)->format('Y-m-d') === $dateStr;
            });

            $chartSleepData[] = $log ? (float) $log->duration_hours : 0.0;
        }

        // Calculate average & sleep debt accurately only based on logged days
        $loggedHours = array_values(array_filter($chartSleepData, fn($val) => $val > 0));
        $loggedDaysCount = count($loggedHours);

        if ($loggedDaysCount > 0) {
            $avgSleep = round(array_sum($loggedHours) / $loggedDaysCount, 1);
            $targetForLoggedDays = 7.5 * $loggedDaysCount;
            $sleepDebt = round(array_sum($loggedHours) - $targetForLoggedDays, 1);
        } else {
            $avgSleep = 0.0;
            $sleepDebt = 0.0;
        }

        // Refreshing activities
        $refreshingActivities = RefreshingActivity::orderBy('last_done_date', 'desc')->get();

        // Certifications, FAQs & Freelance Projects for Portfolio Management
        $certifications = $user->certifications()->get();
        $faqs = $user->faqs()->get();
        $freelanceProjects = $user->freelanceProjects()->get();

        // SafahFlow (ADE Bootcamp 36 Sesi, 5 DE Projects, Spiritual, Chores)
        $today = Carbon::today()->format('Y-m-d');

        $deProjects = \App\Models\Project::with(['milestones' => function ($q) {
            $q->orderBy('week_number')->orderBy('id');
        }])->get()->map(function ($p) {
            return [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'weight_percentage' => $p->weight_percentage,
                'progress_percentage' => $p->progress_percentage,
                'description' => $p->description,
                'repo_url' => $p->repo_url,
                'status' => $p->status,
                'milestones' => $p->milestones,
            ];
        });

        // Weighted overall DE portfolio progress
        $overallDeProgress = 0;
        foreach ($deProjects as $proj) {
            $overallDeProgress += ($proj['progress_percentage'] * $proj['weight_percentage']) / 100;
        }
        $overallDeProgress = round($overallDeProgress, 1);

        // 36 Sessions with attendance status
        $bootcampSessions = \App\Models\BootcampSession::with(['attendances' => function ($q) use ($user) {
            $q->where('user_id', $user->id);
        }])->orderBy('session_number')->get()->map(function ($s) {
            $att = $s->attendances->first();
            return [
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
                'attendance_status' => $att ? $att->status : 'SCHEDULED',
                'summary_notes' => $att ? $att->summary_notes : null,
            ];
        });

        $nextLiveClass = \App\Models\BootcampSession::where('scheduled_date', '>=', $today)
            ->orderBy('scheduled_date', 'asc')
            ->orderBy('start_time', 'asc')
            ->first();

        $todayDailyLog = \App\Models\DailyLog::firstOrCreate(
            ['user_id' => $user->id, 'log_date' => $today],
            [
                'day_type' => 'FULL_LAB',
                'effective_study_minutes' => 240,
                'key_output' => 'Kickoff Proyek Portofolio: Inisialisasi Repository, Environment & Data Profiling',
                'error_and_solution' => 'Memulai roadmap 15 pekan target proyek portofolio hingga bootcamp selesai.',
                'energy_level' => 5,
            ]
        );

        $todaySpiritualLog = \App\Models\SpiritualLog::firstOrCreate(
            ['user_id' => $user->id, 'log_date' => $today],
            [
                'tahajud_witir' => true,
                'dzikir_pagi' => true,
                'dzikir_petang' => false,
                'al_mulk' => false,
                'al_kahfi' => false,
                'kajian_pagi' => false,
                'kajian_malam' => false,
            ]
        );

        // Day of week Indonesian rotation
        $dayNamesId = [
            0 => 'Minggu', 1 => 'Senin', 2 => 'Selasa', 3 => 'Rabu', 4 => 'Kamis', 5 => 'Jumat', 6 => 'Sabtu'
        ];
        $choreFocusMap = [
            1 => 'Kamar Tidur & Meja Kerja (Jadwal Rutin Senin)',
            2 => 'Dapur & Area Kompor (Jadwal Rutin Selasa)',
            3 => 'Laundry Pakaian & Jemuran (Jadwal Rutin Rabu)',
            4 => 'Kamar Mandi & Wastafel (Jadwal Rutin Kamis)',
            5 => 'Deep Clean Mingguan (Jadwal Rutin Jumat)',
            6 => 'Pel Lantai Seluruh Area (Jadwal Rutin Sabtu)',
            0 => 'Ganti Sprei & Reset Ruangan (Jadwal Rutin Minggu)',
        ];
        $dow = Carbon::now()->dayOfWeek;
        $defaultChoreFocus = $choreFocusMap[$dow] ?? 'Rutin Rumah Tangga';

        $todayChoreLog = \App\Models\ChoreLog::firstOrCreate(
            ['user_id' => $user->id, 'log_date' => $today],
            [
                'focus_area' => $defaultChoreFocus,
                'morning_done' => false,
                'evening_done' => false,
                'weekly_deep_done' => false,
                'timer_minutes' => 0,
            ]
        );

        $totalSessions = $bootcampSessions->count();
        $attendedCount = $bootcampSessions->where('attendance_status', 'ATTENDED')->count();
        $watchedCount = $bootcampSessions->where('attendance_status', 'WATCHED_RECORDING')->count();
        $progressPct = $totalSessions > 0 ? round((($attendedCount + $watchedCount) / $totalSessions) * 100) : 0;

        return Inertia::render('Dashboard', [
            'projects' => [
                'todo' => $todoTasks,
                'inProgress' => $inProgressTasks,
                'done' => $doneTasks,
            ],
            'activeTasksCount' => $activeTasksCount,
            'journals' => $journals,
            'journalCount' => $journalCount,
            'upcomingKajians' => $upcomingKajians,
            'nearestKajian' => $nearestKajian,
            'kajianNotes' => $kajianNotes,
            'chartLabels' => $chartLabels,
            'chartSleepData' => $chartSleepData,
            'avgSleep' => $avgSleep,
            'sleepDebt' => $sleepDebt,
            'refreshingActivities' => $refreshingActivities,
            'certifications' => $certifications,
            'faqs' => $faqs,
            'freelanceProjects' => $freelanceProjects,

            // SafahFlow Props
            'deProjects' => $deProjects,
            'overallDeProgress' => $overallDeProgress,
            'bootcampSessions' => $bootcampSessions,
            'nextLiveClass' => $nextLiveClass ? [
                'id' => $nextLiveClass->id,
                'session_number' => $nextLiveClass->session_number,
                'session_name' => $nextLiveClass->session_name,
                'topic' => $nextLiveClass->topic,
                'scheduled_date' => $nextLiveClass->scheduled_date->format('Y-m-d'),
                'day_name' => $nextLiveClass->day_name,
                'start_time' => $nextLiveClass->start_time,
                'mentor_name' => $nextLiveClass->mentor_name,
                'target_project' => $nextLiveClass->target_project,
                'zoom_url' => $nextLiveClass->zoom_url,
                'recording_url' => $nextLiveClass->recording_url,
            ] : null,
            'todayDailyLog' => $todayDailyLog,
            'todaySpiritualLog' => $todaySpiritualLog,
            'todayChoreLog' => $todayChoreLog,
            'safahFlowStats' => [
                'total_sessions' => $totalSessions,
                'attended_count' => $attendedCount,
                'watched_count' => $watchedCount,
                'progress_pct' => $progressPct,
            ],
        ]);
    }
}

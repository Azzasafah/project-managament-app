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

        // Certifications & FAQs for Portfolio Management
        $certifications = $user->certifications()->get();
        $faqs = $user->faqs()->get();

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
        ]);
    }
}

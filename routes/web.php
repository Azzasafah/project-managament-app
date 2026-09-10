<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\FreelanceProjectController;
use App\Http\Controllers\KajianController;
use App\Http\Controllers\LearningJournalController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\WellbeingController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// Primary Public Landing Route: Portfolio Showcase
Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::get('/portfolio', [PortfolioController::class, 'index'])->name('portfolio.index');

// Authentication Routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Authenticated Workspace Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Tasks & Kanban Routes
    Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
    Route::post('/tasks/{task}/status', [TaskController::class, 'updateStatus'])->name('tasks.updateStatus');
    Route::post('/tasks/{task}/portfolio', [TaskController::class, 'togglePortfolio'])->name('tasks.togglePortfolio');
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');

    // Daily Learning Journal Routes
    Route::post('/journals', [LearningJournalController::class, 'store'])->name('journals.store');
    Route::get('/journals/{learningJournal}', [LearningJournalController::class, 'show'])->name('journals.show');
    Route::put('/journals/{learningJournal}', [LearningJournalController::class, 'update'])->name('journals.update');
    Route::delete('/journals/{learningJournal}', [LearningJournalController::class, 'destroy'])->name('journals.destroy');

    // Spiritual / Kajian Routes
    Route::post('/kajian', [KajianController::class, 'store'])->name('kajian.store');
    Route::put('/kajian/{kajianSchedule}', [KajianController::class, 'update'])->name('kajian.update');
    Route::post('/kajian/{kajianSchedule}/toggle', [KajianController::class, 'toggleComplete'])->name('kajian.toggle');
    Route::delete('/kajian/{kajianSchedule}', [KajianController::class, 'destroy'])->name('kajian.destroy');

    // Wellbeing & Balance Routes
    Route::post('/wellbeing/sleep', [WellbeingController::class, 'storeSleep'])->name('wellbeing.sleep.store');
    Route::post('/wellbeing/refreshing', [WellbeingController::class, 'storeRefreshing'])->name('wellbeing.refreshing.store');
    Route::post('/wellbeing/refreshing/{refreshingActivity}/done', [WellbeingController::class, 'markRefreshingDone'])->name('wellbeing.refreshing.done');
    Route::delete('/wellbeing/refreshing/{refreshingActivity}', [WellbeingController::class, 'destroyRefreshing'])->name('wellbeing.refreshing.destroy');

    // Certifications Management Routes
    Route::post('/certifications', [CertificationController::class, 'store'])->name('certifications.store');
    Route::put('/certifications/{certification}', [CertificationController::class, 'update'])->name('certifications.update');
    Route::delete('/certifications/{certification}', [CertificationController::class, 'destroy'])->name('certifications.destroy');

    // FAQs Management Routes
    Route::post('/faqs', [FaqController::class, 'store'])->name('faqs.store');
    Route::put('/faqs/{faq}', [FaqController::class, 'update'])->name('faqs.update');
    Route::post('/faqs/{faq}/toggle', [FaqController::class, 'toggle'])->name('faqs.toggle');
    Route::delete('/faqs/{faq}', [FaqController::class, 'destroy'])->name('faqs.destroy');

    // Freelance Projects Management Routes
    Route::post('/freelance-projects', [FreelanceProjectController::class, 'store'])->name('freelance-projects.store');
    Route::put('/freelance-projects/{freelanceProject}', [FreelanceProjectController::class, 'update'])->name('freelance-projects.update');
    Route::post('/freelance-projects/{freelanceProject}/toggle', [FreelanceProjectController::class, 'toggle'])->name('freelance-projects.toggle');
    Route::delete('/freelance-projects/{freelanceProject}', [FreelanceProjectController::class, 'destroy'])->name('freelance-projects.destroy');

    // SafahFlow (Bootcamp Sessions, Portfolio Projects, Spiritual & Chores)
    Route::post('/safahflow/sessions', [\App\Http\Controllers\SafahFlowController::class, 'storeSession'])->name('safahflow.sessions.store');
    Route::post('/safahflow/sessions/{session}/toggle', [\App\Http\Controllers\SafahFlowController::class, 'toggleSessionAttendance'])->name('safahflow.sessions.toggle');
    Route::put('/safahflow/sessions/{session}', [\App\Http\Controllers\SafahFlowController::class, 'updateSession'])->name('safahflow.sessions.update');
    Route::delete('/safahflow/sessions/{session}', [\App\Http\Controllers\SafahFlowController::class, 'destroySession'])->name('safahflow.sessions.destroy');

    Route::post('/safahflow/projects', [\App\Http\Controllers\SafahFlowController::class, 'storeProject'])->name('safahflow.projects.store');
    Route::put('/safahflow/projects/{project}', [\App\Http\Controllers\SafahFlowController::class, 'updateProject'])->name('safahflow.projects.update');
    Route::delete('/safahflow/projects/{project}', [\App\Http\Controllers\SafahFlowController::class, 'destroyProject'])->name('safahflow.projects.destroy');

    Route::post('/safahflow/milestones/{milestone}/toggle', [\App\Http\Controllers\SafahFlowController::class, 'toggleMilestone'])->name('safahflow.milestones.toggle');
    Route::post('/safahflow/projects/{project}/milestones', [\App\Http\Controllers\SafahFlowController::class, 'storeMilestone'])->name('safahflow.milestones.store');
    Route::delete('/safahflow/milestones/{milestone}', [\App\Http\Controllers\SafahFlowController::class, 'destroyMilestone'])->name('safahflow.milestones.destroy');
    Route::post('/safahflow/spiritual/toggle', [\App\Http\Controllers\SafahFlowController::class, 'toggleSpiritual'])->name('safahflow.spiritual.toggle');
    Route::post('/safahflow/chores/toggle', [\App\Http\Controllers\SafahFlowController::class, 'toggleChore'])->name('safahflow.chores.toggle');
    Route::post('/safahflow/chores/pomodoro', [\App\Http\Controllers\SafahFlowController::class, 'logPomodoro'])->name('safahflow.chores.pomodoro');
    Route::post('/safahflow/daily-log', [\App\Http\Controllers\SafahFlowController::class, 'updateDailyLog'])->name('safahflow.dailyLog.update');
});

// Fallback 404 Not Found Route
Route::fallback(function () {
    return Inertia\Inertia::render('Errors/404')->toResponse(request())->setStatusCode(404);
});

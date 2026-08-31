<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FaqController;
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
});

// Fallback 404 Not Found Route
Route::fallback(function () {
    return Inertia\Inertia::render('Errors/404')->toResponse(request())->setStatusCode(404);
});

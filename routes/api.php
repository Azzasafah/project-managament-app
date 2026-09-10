<?php

use App\Http\Controllers\Api\SafahFlowApiController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/dashboard/today', [SafahFlowApiController::class, 'today']);
    Route::get('/sessions', [SafahFlowApiController::class, 'sessions']);
    Route::post('/sessions/{session}/toggle', [SafahFlowApiController::class, 'toggleSession']);
    Route::get('/projects', [SafahFlowApiController::class, 'projects']);
    Route::post('/milestones/{milestone}/toggle', [SafahFlowApiController::class, 'toggleMilestone']);
    Route::post('/spiritual/toggle', [SafahFlowApiController::class, 'toggleSpiritual']);
    Route::post('/chores/toggle', [SafahFlowApiController::class, 'toggleChore']);
});

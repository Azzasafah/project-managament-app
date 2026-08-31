<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        $portfolioProjects = Task::where('is_portfolio', true)
            ->orderBy('order_index', 'asc')
            ->orderBy('updated_at', 'desc')
            ->get();

        $adminUser = User::first();

        return Inertia::render('Portfolio/Index', [
            'projects' => $portfolioProjects,
            'user' => $adminUser ? [
                'name' => $adminUser->name,
                'email' => $adminUser->email,
            ] : null,
        ]);
    }
}

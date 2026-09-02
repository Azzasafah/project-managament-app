<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use App\Models\Faq;
use App\Models\FreelanceProject;
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

        $freelanceProjects = FreelanceProject::where('is_active', true)
            ->orderBy('order_index', 'asc')
            ->orderBy('id', 'desc')
            ->get();

        $certifications = Certification::where('is_active', true)
            ->orderBy('order_index', 'asc')
            ->orderBy('id', 'desc')
            ->get();

        $faqs = Faq::where('is_active', true)
            ->orderBy('order_index', 'asc')
            ->orderBy('id', 'asc')
            ->get();

        $adminUser = User::first();

        return Inertia::render('Portfolio/Index', [
            'projects' => $portfolioProjects,
            'freelanceProjects' => $freelanceProjects,
            'certifications' => $certifications,
            'faqs' => $faqs,
            'user' => $adminUser ? [
                'name' => $adminUser->name,
                'email' => $adminUser->email,
            ] : null,
        ]);
    }
}

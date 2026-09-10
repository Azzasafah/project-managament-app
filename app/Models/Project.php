<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'weight_percentage',
        'description',
        'repo_url',
        'status',
    ];

    protected $casts = [
        'weight_percentage' => 'integer',
    ];

    public function milestones()
    {
        return $this->hasMany(ProjectMilestone::class)->orderBy('week_number')->orderBy('id');
    }

    public function getProgressPercentageAttribute()
    {
        $total = $this->milestones()->count();
        if ($total === 0) return 0;
        $completed = $this->milestones()->where('is_completed', true)->count();
        return (int) round(($completed / $total) * 100);
    }
}

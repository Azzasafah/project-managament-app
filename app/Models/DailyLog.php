<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'log_date',
        'day_type',
        'effective_study_minutes',
        'key_output',
        'error_and_solution',
        'git_commit_hash',
        'energy_level',
    ];

    protected $casts = [
        'log_date' => 'date:Y-m-d',
        'effective_study_minutes' => 'integer',
        'energy_level' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

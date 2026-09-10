<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChoreLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'log_date',
        'focus_area',
        'morning_done',
        'evening_done',
        'weekly_deep_done',
        'timer_minutes',
    ];

    protected $casts = [
        'log_date' => 'date:Y-m-d',
        'morning_done' => 'boolean',
        'evening_done' => 'boolean',
        'weekly_deep_done' => 'boolean',
        'timer_minutes' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

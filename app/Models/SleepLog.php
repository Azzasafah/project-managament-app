<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SleepLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'sleep_date',
        'duration_hours',
        'quality',
        'score',
        'fall_asleep_time',
        'wake_up_count',
        'morning_feeling',
        'recommendation',
        'sleep_time',
        'wake_time',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'sleep_date' => 'date:Y-m-d',
            'duration_hours' => 'decimal:1',
            'score' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

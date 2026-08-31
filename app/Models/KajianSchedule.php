<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KajianSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'speaker',
        'event_date',
        'time_info',
        'location',
        'notes',
        'is_completed',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'date:Y-m-d',
            'is_completed' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

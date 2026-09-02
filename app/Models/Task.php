<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'status',
        'tag',
        'priority',
        'date_label',
        'due_date',
        'order_index',
        'is_portfolio',
        'portfolio_summary',
        'github_url',
        'live_url',
        'button_display_mode',
        'thumbnail',
        'tech_stack',
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'date:Y-m-d',
            'is_portfolio' => 'boolean',
            'tech_stack' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

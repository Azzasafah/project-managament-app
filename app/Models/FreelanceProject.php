<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FreelanceProject extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'client_name',
        'role_scope',
        'period',
        'tech_stack',
        'description',
        'project_url',
        'github_url',
        'status',
        'order_index',
        'is_active',
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'is_active' => 'boolean',
        'order_index' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

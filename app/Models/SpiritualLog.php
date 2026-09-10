<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpiritualLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'log_date',
        'tahajud_witir',
        'dzikir_pagi',
        'dzikir_petang',
        'al_mulk',
        'al_kahfi',
        'kajian_pagi',
        'kajian_malam',
    ];

    protected $casts = [
        'log_date' => 'date:Y-m-d',
        'tahajud_witir' => 'boolean',
        'dzikir_pagi' => 'boolean',
        'dzikir_petang' => 'boolean',
        'al_mulk' => 'boolean',
        'al_kahfi' => 'boolean',
        'kajian_pagi' => 'boolean',
        'kajian_malam' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

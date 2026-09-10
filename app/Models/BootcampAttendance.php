<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BootcampAttendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bootcamp_session_id',
        'status',
        'summary_notes',
        'applied_learnings',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function session()
    {
        return $this->belongsTo(BootcampSession::class, 'bootcamp_session_id');
    }
}

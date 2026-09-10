<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BootcampSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_number',
        'session_name',
        'phase',
        'scheduled_date',
        'day_name',
        'start_time',
        'end_time',
        'mentor_name',
        'topic',
        'target_project',
        'zoom_url',
        'recording_url',
    ];

    protected $casts = [
        'session_number' => 'integer',
        'scheduled_date' => 'date:Y-m-d',
    ];

    public function attendances()
    {
        return $this->hasMany(BootcampAttendance::class);
    }

    public function attendanceForUser($userId)
    {
        return $this->hasOne(BootcampAttendance::class)->where('user_id', $userId);
    }
}

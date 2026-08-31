<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    public function learningJournals(): HasMany
    {
        return $this->hasMany(LearningJournal::class);
    }

    public function kajianSchedules(): HasMany
    {
        return $this->hasMany(KajianSchedule::class);
    }

    public function sleepLogs(): HasMany
    {
        return $this->hasMany(SleepLog::class);
    }

    public function refreshingActivities(): HasMany
    {
        return $this->hasMany(RefreshingActivity::class);
    }

    public function certifications(): HasMany
    {
        return $this->hasMany(Certification::class)->orderBy('order_index');
    }

    public function faqs(): HasMany
    {
        return $this->hasMany(Faq::class)->orderBy('order_index');
    }
}

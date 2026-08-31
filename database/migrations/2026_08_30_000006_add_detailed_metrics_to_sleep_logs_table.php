<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sleep_logs', function (Blueprint $table) {
            $table->integer('score')->nullable()->after('quality');
            $table->string('fall_asleep_time')->nullable()->after('score'); // ≤15 menit, 16–30 menit, etc.
            $table->string('wake_up_count')->nullable()->after('fall_asleep_time'); // 0 kali, 1 kali, etc.
            $table->string('morning_feeling')->nullable()->after('wake_up_count'); // Sangat segar, etc.
            $table->text('recommendation')->nullable()->after('morning_feeling');
        });
    }

    public function down(): void
    {
        Schema::table('sleep_logs', function (Blueprint $table) {
            $table->dropColumn(['score', 'fall_asleep_time', 'wake_up_count', 'morning_feeling', 'recommendation']);
        });
    }
};

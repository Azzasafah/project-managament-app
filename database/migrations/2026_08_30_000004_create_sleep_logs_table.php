<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sleep_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->date('sleep_date');
            $table->decimal('duration_hours', 4, 1)->default(7.0);
            $table->string('quality')->default('Cukup'); // Sangat Baik, Cukup, Kurang
            $table->string('sleep_time')->nullable(); // e.g. 23:00
            $table->string('wake_time')->nullable();  // e.g. 06:00
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sleep_logs');
    }
};

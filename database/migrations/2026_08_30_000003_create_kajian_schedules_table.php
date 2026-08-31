<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kajian_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('speaker')->nullable();
            $table->date('event_date');
            $table->string('time_info')->default('09:00 WIB');
            $table->string('location')->default('Masjid');
            $table->text('notes')->nullable();
            $table->boolean('is_completed')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kajian_schedules');
    }
};

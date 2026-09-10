<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Projects (Data Engineering 5 Berbobot)
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->unsignedTinyInteger('weight_percentage')->default(0);
            $table->text('description')->nullable();
            $table->string('repo_url')->nullable();
            $table->enum('status', ['PLANNING', 'IN_PROGRESS', 'FROZEN', 'COMPLETED'])->default('IN_PROGRESS');
            $table->timestamps();
        });

        // 2. Project Milestones (Target per pekan 1-15)
        Schema::create('project_milestones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
            $table->unsignedTinyInteger('week_number')->default(1);
            $table->string('title');
            $table->text('description')->nullable();
            $table->boolean('is_completed')->default(false);
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });

        // 3. Bootcamp Sessions (36 Sesi ADE Boost & Pra-Bootcamp)
        Schema::create('bootcamp_sessions', function (Blueprint $table) {
            $table->id();
            $table->unsignedSmallInteger('session_number')->unique();
            $table->string('session_name');
            $table->string('phase')->default('CORE');
            $table->date('scheduled_date');
            $table->string('day_name');
            $table->string('start_time')->default('19:30');
            $table->string('end_time')->nullable();
            $table->string('mentor_name')->nullable();
            $table->string('topic');
            $table->string('target_project')->nullable();
            $table->string('zoom_url')->nullable();
            $table->string('recording_url')->nullable();
            $table->timestamps();
        });

        // 4. Bootcamp Attendances
        Schema::create('bootcamp_attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('bootcamp_session_id')->constrained('bootcamp_sessions')->cascadeOnDelete();
            $table->enum('status', ['SCHEDULED', 'ATTENDED', 'WATCHED_RECORDING', 'MISSED'])->default('SCHEDULED');
            $table->text('summary_notes')->nullable();
            $table->text('applied_learnings')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'bootcamp_session_id']);
        });

        // 5. Daily Logs (Mode Harian & Output Belajar)
        Schema::create('daily_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->date('log_date');
            $table->enum('day_type', ['FULL_LAB', 'LIVE_CLASS_NIGHT', 'STUDY_LIGHT', 'AUDIT_CLEAN', 'DEEP_WORK', 'LIVE_CLASS_AFT'])->default('FULL_LAB');
            $table->unsignedSmallInteger('effective_study_minutes')->default(0);
            $table->text('key_output')->nullable();
            $table->text('error_and_solution')->nullable();
            $table->string('git_commit_hash')->nullable();
            $table->unsignedTinyInteger('energy_level')->default(5);
            $table->timestamps();

            $table->unique(['user_id', 'log_date']);
        });

        // 6. Spiritual Logs (Ibadah Sunnah Tetap)
        Schema::create('spiritual_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->date('log_date');
            $table->boolean('tahajud_witir')->default(false);
            $table->boolean('dzikir_pagi')->default(false);
            $table->boolean('dzikir_petang')->default(false);
            $table->boolean('al_mulk')->default(false);
            $table->boolean('al_kahfi')->default(false);
            $table->boolean('kajian_pagi')->default(false);
            $table->boolean('kajian_malam')->default(false);
            $table->timestamps();

            $table->unique(['user_id', 'log_date']);
        });

        // 7. Chore Logs (Rumah Tangga Stay-at-Home & Timer)
        Schema::create('chore_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->date('log_date');
            $table->string('focus_area');
            $table->boolean('morning_done')->default(false);
            $table->boolean('evening_done')->default(false);
            $table->boolean('weekly_deep_done')->default(false);
            $table->unsignedSmallInteger('timer_minutes')->default(0);
            $table->timestamps();

            $table->unique(['user_id', 'log_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chore_logs');
        Schema::dropIfExists('spiritual_logs');
        Schema::dropIfExists('daily_logs');
        Schema::dropIfExists('bootcamp_attendances');
        Schema::dropIfExists('bootcamp_sessions');
        Schema::dropIfExists('project_milestones');
        Schema::dropIfExists('projects');
    }
};

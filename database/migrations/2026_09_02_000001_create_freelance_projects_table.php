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
        Schema::create('freelance_projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('client_name');
            $table->string('role_scope')->nullable(); // e.g. 'Fullstack Developer', 'QA Tester', 'System Analyst'
            $table->string('period')->nullable(); // e.g. 'Jan 2026 - Feb 2026'
            $table->json('tech_stack')->nullable();
            $table->text('description')->nullable();
            $table->string('project_url')->nullable();
            $table->string('github_url')->nullable();
            $table->string('status')->default('completed'); // 'completed' | 'ongoing'
            $table->integer('order_index')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('freelance_projects');
    }
};

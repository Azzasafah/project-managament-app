<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('issuer'); // e.g. AWS, Dicoding, Google Cloud, PT Telkom
            $table->enum('type', ['official', 'internship'])->default('official');
            $table->string('issue_date')->nullable(); // e.g. "Aug 2026", "2025 - 2026"
            $table->string('credential_id')->nullable();
            $table->string('credential_url')->nullable();
            $table->json('skills')->nullable(); // Array of skills, e.g. ["Python", "Airflow", "ETL"]
            $table->text('description')->nullable();
            $table->integer('order_index')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certifications');
    }
};

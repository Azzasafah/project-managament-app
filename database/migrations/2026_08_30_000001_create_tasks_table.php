<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('status', ['todo', 'in_progress', 'done'])->default('todo');
            $table->string('tag')->default('General');
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->string('date_label')->nullable();
            $table->date('due_date')->nullable();
            $table->integer('order_index')->default(0);
            
            // Portfolio fields
            $table->boolean('is_portfolio')->default(false);
            $table->text('portfolio_summary')->nullable();
            $table->string('github_url')->nullable();
            $table->string('live_url')->nullable();
            $table->string('thumbnail')->nullable();
            $table->json('tech_stack')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};

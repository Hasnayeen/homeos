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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wallet_id')->constrained()->onDelete('cascade');
            $table->foreignId('budget_id')->nullable()->constrained()->onDelete('set null');
            $table->string('type');
            $table->bigInteger('amount'); // stored in cents
            $table->string('description');
            $table->text('notes')->nullable();
            $table->date('transaction_date');
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();

            $table->index(['category_id', 'transaction_date']);
            $table->index(['wallet_id', 'transaction_date']);
            $table->index(['type', 'transaction_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};

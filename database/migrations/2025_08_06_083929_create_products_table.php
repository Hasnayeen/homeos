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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('purchased_amount', 10, 2); // Amount purchased
            $table->decimal('current_amount', 10, 2); // Current available amount
            $table->string('unit')->default('pieces'); // Unit of measurement (pieces, kg, liters, etc.)
            $table->string('storage_location')->nullable(); // Where it's stored
            $table->decimal('threshold_amount', 10, 2)->default(0); // Threshold for reminder
            $table->date('last_purchased_at')->nullable(); // When last purchased
            $table->integer('last_purchase_price_cents')->nullable(); // Price of last purchase in cents
            $table->string('brand')->nullable(); // Brand name
            $table->text('notes')->nullable(); // Additional notes
            $table->boolean('is_active')->default(true); // Whether item is still being tracked
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

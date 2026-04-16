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
        // 1. Wallets
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->restrictOnDelete();
            $table->decimal('balance', 15, 2)->default(0.00);
            $table->timestamps();
        });

        // 2. Wallet Transactions (Tanpa updated_at)
        Schema::create('wallet_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wallet_id')->constrained('wallets')->restrictOnDelete();
            $table->decimal('amount', 15, 2);
            $table->enum('type', ['CREDIT', 'DEBIT']);
            $table->string('description');
            $table->timestamp('created_at')->useCurrent();
        });

        // 3. Properties
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id')->constrained('users')->restrictOnDelete();
            $table->string('name');
            $table->text('address');
            $table->string('city_name', 100)->index(); // Indexing untuk SEO/Filter
            $table->string('province_name', 100);
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 10, 8);
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });

        // 4. Rooms
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained('properties')->restrictOnDelete();
            $table->string('type_name');
            $table->integer('capacity')->default(1);
            $table->decimal('price_daily', 15, 2)->nullable();
            $table->decimal('price_monthly', 15, 2);
            $table->integer('stock_physical')->default(1);
            $table->timestamps();
            $table->softDeletes();
        });

        // 5. Bookings
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->restrictOnDelete();
            $table->foreignId('room_id')->constrained('rooms')->restrictOnDelete();
            $table->date('start_date');
            $table->date('end_date');
            $table->decimal('total_price', 15, 2);
            $table->enum('status', ['PENDING', 'PARTIAL_PAID', 'PAID', 'CANCELLED', 'COMPLETED'])->default('PENDING');
            $table->timestamps();
            
            $table->index(['start_date', 'end_date']); // Indexing DBA
        });

        // 6. Split Payments
        Schema::create('split_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('bookings')->restrictOnDelete();
            $table->foreignId('user_a_id')->constrained('users')->restrictOnDelete();
            $table->foreignId('user_b_id')->constrained('users')->restrictOnDelete();
            $table->decimal('amount_a', 15, 2);
            $table->decimal('amount_b', 15, 2);
            $table->enum('status_a', ['UNPAID', 'PAID'])->default('UNPAID');
            $table->enum('status_b', ['UNPAID', 'PAID'])->default('UNPAID');
            $table->timestamp('grace_period_end');
            $table->timestamps();

            $table->index(['grace_period_end', 'status_b']); // Indexing DBA
        });

        // 7. Reviews
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->unique()->constrained('bookings')->restrictOnDelete();
            $table->foreignId('user_id')->constrained('users')->restrictOnDelete();
            $table->tinyInteger('rating')->unsigned();
            $table->text('comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('split_payments');
        Schema::dropIfExists('bookings');
        Schema::dropIfExists('rooms');
        Schema::dropIfExists('properties');
        Schema::dropIfExists('wallet_transactions');
        Schema::dropIfExists('wallets');
    }
};
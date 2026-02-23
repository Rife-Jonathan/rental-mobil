<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('pricing_package_id')->nullable()->constrained()->onDelete('set null');
            $table->date('rental_date');
            $table->integer('quantity');
            $table->string('status')->default('Pending'); // Pending, Completed, Canceled
            $table->string('customer_name')->nullable();
            $table->string('customer_phone')->nullable();
            $table->text('message')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};

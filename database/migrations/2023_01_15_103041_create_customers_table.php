<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->integer('account_id')->index();
            $table->string('customer_id', 150)->unique()->nullable();
            $table->string('password')->nullable();
            $table->bigInteger('discount')->nullable();
            $table->string('name', 100);
            $table->string('email')->nullable();
            $table->string('phone_number', 200)->nullable();
            $table->string('address')->nullable();
            $table->date('start_date')->default(now()->format('Y-m-d'));
            $table->boolean('status')->default(false);
            $table->foreignId('plan_id');
            $table->foreign('plan_id')->references('id')->on('plans');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customers');
    }
}

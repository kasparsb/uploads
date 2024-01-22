<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('uploads', function (Blueprint $table) {
            $table->string('ip')->nullable();
            $table->json('ip_info')->nullable();
            $table->string('user_agent')->nullable();
            // pc, phone, tablet etc
            $table->string('device')->nullable();
        });
    }

    public function down()
    {
        Schema::table('uploads', function (Blueprint $table) {
            $table->dropColumn('ip');
            $table->dropColumn('ip_info');
            $table->dropColumn('user_agent');
            $table->dropColumn('device');
        });
    }
};

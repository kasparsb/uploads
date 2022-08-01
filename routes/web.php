<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AdminController;
use App\Http\Controllers\UploadsController;

Route::get('/', function () {
    return view('upload');
});

Route::post('/new', [UploadsController::class, 'create']);
Route::post('/upload', [UploadsController::class, 'upload']);

Route::get('/admin', [AdminController::class, 'index']);
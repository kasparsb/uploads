<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AdminController;
use App\Http\Controllers\UploadsController;
use App\Http\Controllers\Auth\LoginController;

Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [LoginController::class, 'login']);
Route::get('logout', [LoginController::class, 'logout'])->name('logout');

Route::group(['middleware' => 'cors'], function(){
    Route::get('/', function () {
        return view('upload');
    });
});

Route::post('/new', [UploadsController::class, 'create']);
Route::post('/upload', [UploadsController::class, 'upload']);

Route::group(['middleware' => 'auth'], function(){
    Route::get('/admin', [AdminController::class, 'index']);
    Route::get('/file/{id}', [AdminController::class, 'downloadFile'])->name('file-download');
});
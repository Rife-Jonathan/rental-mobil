<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\AdminController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Public API Endpoints
Route::get('/settings', [ClientController::class, 'getSettings']);
Route::get('/vehicles', [ClientController::class, 'getVehicles']);
Route::get('/vehicles/{id}', [ClientController::class, 'getVehicle']);
Route::get('/blogs', [ClientController::class, 'getBlogs']);
Route::get('/blogs/{id}', [ClientController::class, 'getBlog']);
Route::get('/faqs', [ClientController::class, 'getFaqs']);
Route::post('/leads', [ClientController::class, 'storeLead']);

// Admin API Endpoints
Route::prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    Route::post('/upload', [AdminController::class, 'uploadImage']);
    
    Route::put('/settings', [AdminController::class, 'updateSettings']);
    
    Route::get('/leads', [AdminController::class, 'getLeads']);
    Route::put('/leads/{id}/status', [AdminController::class, 'updateLeadStatus']);
    Route::delete('/leads/{id}', [AdminController::class, 'deleteLead']);
    
    Route::get('/vehicles', [AdminController::class, 'getVehicles']);
    Route::post('/vehicles', [AdminController::class, 'createVehicle']);
    Route::put('/vehicles/{id}', [AdminController::class, 'updateVehicle']);
    Route::delete('/vehicles/{id}', [AdminController::class, 'deleteVehicle']);
    
    Route::post('/blogs', [AdminController::class, 'createBlog']);
    Route::put('/blogs/{id}', [AdminController::class, 'updateBlog']);
    Route::delete('/blogs/{id}', [AdminController::class, 'deleteBlog']);
    
    Route::post('/faqs', [AdminController::class, 'createFaq']);
    Route::put('/faqs/{id}', [AdminController::class, 'updateFaq']);
    Route::delete('/faqs/{id}', [AdminController::class, 'deleteFaq']);
});

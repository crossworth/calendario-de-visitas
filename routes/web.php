<?php

use App\Http\Controllers\AppointmentController;
use Illuminate\Support\Facades\Route;

Route::get('/{path?}', function () {
    return view('app');
});

Route::group(['prefix' => 'api'], function () {
    Route::get('/appointments', [AppointmentController::class, 'data']);
    Route::get('/appointments/{appointment}', [AppointmentController::class, 'view']);
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::put('/appointments/{appointment}', [AppointmentController::class, 'update']);
});

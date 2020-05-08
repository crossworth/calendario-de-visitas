<?php

use App\Http\Controllers\AppointmentController;
use Illuminate\Support\Facades\Route;

Route::get('/download/{uuid}', [AppointmentController::class, 'downloadFile']);

Route::get('{reactRoutes}', function () {
    return view('app');
})->where('reactRoutes', '^((?!api).)*$');

Route::group(['prefix' => 'api'], function () {
    Route::get('/appointments', [AppointmentController::class, 'data']);
    Route::get('/appointments/{appointment}', [AppointmentController::class, 'view']);
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::put('/appointments/{appointment}', [AppointmentController::class, 'update']);
});

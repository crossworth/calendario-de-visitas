<?php

namespace App\Http\Controllers;

use App\Appointment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AppointmentController extends Controller
{
    public function view(Request $request, Appointment $appointment): JsonResponse
    {
        // TODO(Pedro): only my appointments?
        return response()->json($appointment->toArray());
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required',
        ]);

        $appointment = Appointment::create($request->only([
            'name', 'address', 'landline_phone_number', 'mobile_phone_number', 'email',
            'number_of_employees', 'date', 'return_date', 'due_date', 'observations'
        ]));

        return response()->json($appointment->toArray());
    }

    public function update(Request $request, Appointment $appointment): JsonResponse
    {
        $request->validate([
            'name' => 'required'
        ]);

        $appointment->fill($request->only([
            'name', 'address', 'landline_phone_number', 'mobile_phone_number', 'email',
            'number_of_employees', 'date', 'return_date', 'due_date', 'observations'
        ]));

        $appointment->save();
        return response()->json($appointment->toArray());
    }

    public function data(Request $request): JsonResponse
    {
        // TODO(Pedro): allows only authenticated users!
        if (auth()->check()) {
            $appointments = Appointment::where('user_id', auth()->id())->get();
        } else {
            $appointments = Appointment::all();
        }

        return response()->json($appointments->toArray());
    }
}

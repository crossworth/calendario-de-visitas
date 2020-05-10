<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\AppointmentFiles;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class AppointmentController extends Controller
{
    public function view(Request $request, Appointment $appointment): JsonResponse
    {
        // TODO(Pedro): only my appointments?
        return response()->json($appointment);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'mobile_phone_number' => 'required',
        ]);

        $appointment = Appointment::create($request->only([
            'name', 'address', 'landline_phone_number', 'mobile_phone_number', 'email',
            'number_of_employees', 'date', 'return_date', 'due_date', 'observations'
        ]));

        $files = $request->get('documents');

        foreach ($files as $file) {
            $fileName = time() . "_" . $file['name'];
            Storage::put($fileName, base64_decode($file['content']));

            AppointmentFiles::create([
                'appointment_id' => $appointment->id,
                'name' => $file['name'],
                'path' => $fileName
            ]);
        }

        $appointment->refresh();

        return response()->json($appointment->toArray());
    }

    public function data(Request $request): JsonResponse
    {
        $appointments = Appointment::select('*');

        if (auth()->check()) {
            $appointments->where('user_id', auth()->id());
        }

        if ($request->has('date')) {
            $appointments->whereDate('date', Carbon::parse($request->input('date'))->toDateString());
        }

        if ($request->has('return_date')) {
            $appointments->whereDate('return_date', Carbon::parse($request->input('return_date'))->toDateString());
        }

        if ($request->has('due_date')) {
            $appointments->whereDate('due_date', Carbon::parse($request->input('due_date'))->toDateString());
        }

        return response()->json($appointments->get()->toArray());
    }

    public function downloadFile(Request $request, $uuid): BinaryFileResponse
    {
        $file = AppointmentFiles::where('uuid', $uuid)->first();
        return response()->download(storage_path('/app/' . $file->path));
    }
}

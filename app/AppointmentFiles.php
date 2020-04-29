<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AppointmentFiles extends Model
{
    protected $fillable = [
        'appointment_id', 'name', 'path'
    ];

    public function Appointment(): BelongsTo
    {
        return $this->belongsTo(Appointment::class);
    }
}

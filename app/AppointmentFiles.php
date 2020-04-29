<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AppointmentFiles extends Model
{
    protected $fillable = [
        'name', 'path'
    ];

    public function Appointment(): BelongsTo
    {
        $this->belongsTo(Appointment::class);
    }
}

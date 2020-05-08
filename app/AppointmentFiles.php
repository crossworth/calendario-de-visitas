<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Ramsey\Uuid\Uuid;

class AppointmentFiles extends Model
{
    protected $fillable = [
        'appointment_id', 'uuid', 'name', 'path'
    ];

    public static function boot()
    {
        parent::boot();
        self::creating(function (AppointmentFiles $appointmentFiles) {
            $appointmentFiles->uuid = Uuid::uuid4();
        });
    }

    public function Appointment(): BelongsTo
    {
        return $this->belongsTo(Appointment::class);
    }

    public function toArray(): array
    {
        return [
            'uuid' => $this->uuid,
            'name' => $this->name,
            'url' => url('download/' . $this->uuid)
        ];
    }
}

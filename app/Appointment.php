<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Appointment extends Model
{
    protected $fillable = [
        'name', 'address', 'user_id',
        'landline_phone_number', 'mobile_phone_number', 'email',
        'number_of_employees', 'date', 'return_date', 'due_date',
        'observations'
    ];

    protected $dates = [
        'date', 'return_date', 'due_date'
    ];

    public static function boot(): void
    {
        parent::boot();
        self::creating(function (Appointment $appointment) {
            $appointment->user_id = auth()->check() ? auth()->id() : null;
        });
    }

    public function files(): HasMany
    {
        return $this->hasMany(AppointmentFiles::class);
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'address' => $this->address,
            'user_id' => $this->user_id,
            'landline_phone_number' => $this->landline_phone_number,
            'mobile_phone_number' => $this->mobile_phone_number,
            'email' => $this->email,
            'number_of_employees' => $this->number_of_employees,
            'date' => $this->date,
            'return_date' => $this->return_date,
            'due_date' => $this->due_date,
            'observations' => $this->observations
        ];
    }
}

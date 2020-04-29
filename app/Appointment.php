<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
        'name', 'address',
        'landline_phone_number', 'mobile_phone_number', 'email',
        'number_of_employees', 'date', 'return_date', 'due_date',
        'observations'
    ];

    protected $dates = [
        'date', 'return_date', 'due_date'
    ];
}

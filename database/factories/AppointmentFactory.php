<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Appointment;
use Faker\Generator as Faker;

$factory->define(Appointment::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'address' => $faker->streetName . ', ' . $faker->word,
        'landline_phone_number' => $faker->phoneNumber,
        'mobile_phone_number' => $faker->phoneNumber,
        'email' => $faker->unique()->safeEmail,
        'number_of_employees' => $faker->randomNumber(10, 500),
        'date' => $faker->dateTimeThisMonth,
        'return_date' => $faker->dateTimeThisMonth->add(new DateInterval('P1M')),
        'due_date' => $faker->dateTimeThisMonth,
        'observations' => '',
    ];
});

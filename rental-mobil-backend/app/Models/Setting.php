<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'colors' => 'array',
        'seo' => 'array',
        'landing_page' => 'array',
        'about_page' => 'array',
    ];
}

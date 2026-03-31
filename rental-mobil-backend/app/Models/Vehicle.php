<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PricingPackage;

class Vehicle extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'images' => 'array',
        'specs' => 'array',
        'content' => 'array',
        'is_available' => 'boolean',
    ];

    public function pricingPackages()
    {
        return $this->hasMany(PricingPackage::class);
    }
}

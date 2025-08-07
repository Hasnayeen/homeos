<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Storage extends Model
{
    protected $fillable = [
        'name',
        'location',
        'description',
    ];

    /**
     * Get all stuff stored in this storage.
     */
    public function stuffs(): HasMany
    {
        return $this->hasMany(Stuff::class);
    }
}

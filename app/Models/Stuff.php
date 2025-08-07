<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Stuff extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'storage_id',
    ];

    protected $casts = [
        'deleted_at' => 'datetime',
    ];

    /**
     * Get the storage where this stuff is stored.
     */
    public function storage(): BelongsTo
    {
        return $this->belongsTo(Storage::class);
    }

    /**
     * Get the tags for this stuff.
     */
    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}

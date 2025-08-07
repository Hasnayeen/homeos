<?php

namespace App\Models;

use App\Casts\MoneyCast;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Wallet extends Model
{
    protected $fillable = [
        'name',
        'description',
        'balance',
        'currency',
        'is_active',
    ];

    protected $casts = [
        'balance' => MoneyCast::class,
        'is_active' => 'boolean',
    ];

    /**
     * Get all transactions for this wallet.
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * Get all tags for this wallet.
     */
    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    /**
     * Scope to get active wallets.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}

<?php

namespace App\Models;

use App\Casts\MoneyCast;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Budget extends Model
{
    protected $fillable = [
        'name',
        'description',
        'amount',
        'spent',
        'period',
        'start_date',
        'end_date',
        'is_active',
    ];

    protected $casts = [
        'amount' => MoneyCast::class,
        'spent' => MoneyCast::class,
        'start_date' => 'date',
        'end_date' => 'date',
        'is_active' => 'boolean',
    ];

    /**
     * Get all transactions for this budget.
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * Get all tags for this budget.
     */
    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    /**
     * Get the remaining budget amount.
     */
    public function getRemainingAmount(): float
    {
        return $this->amount - $this->spent;
    }

    /**
     * Check if budget is exceeded.
     */
    public function isExceeded(): bool
    {
        return $this->spent > $this->amount;
    }
}

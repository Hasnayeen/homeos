<?php

namespace App\Models;

use App\Casts\MoneyCast;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'purchased_amount',
        'current_amount',
        'unit',
        'storage_location',
        'threshold_amount',
        'last_purchased_at',
        'last_purchase_price_cents',
        'brand',
        'notes',
        'is_active',
    ];

    protected $casts = [
        'purchased_amount' => 'decimal:2',
        'current_amount' => 'decimal:2',
        'threshold_amount' => 'decimal:2',
        'last_purchase_price_cents' => MoneyCast::class,
        'last_purchased_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'last_purchase_price',
        'last_purchased_date',
        'percentage_remaining_rounded',
    ];

    /**
     * Get the tags for this product.
     */
    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    /**
     * Check if the product needs to be restocked.
     */
    public function needsRestock(): bool
    {
        return $this->current_amount <= $this->threshold_amount;
    }

    /**
     * Get the percentage of the product remaining.
     */
    public function getPercentageRemaining(): float
    {
        if ($this->purchased_amount <= 0) {
            return 0;
        }

        return ($this->current_amount / $this->purchased_amount) * 100;
    }

    /**
     * Calculate consumption rate per day (if we have purchase date).
     */
    public function getConsumptionRate(): ?float
    {
        if (! $this->last_purchased_at) {
            return null;
        }

        $daysSincePurchase = $this->last_purchased_at->diffInDays(now());

        if ($daysSincePurchase <= 0) {
            return null;
        }

        $consumedAmount = $this->purchased_amount - $this->current_amount;

        return $consumedAmount / $daysSincePurchase;
    }

    /**
     * Estimate days until threshold is reached.
     */
    public function getDaysUntilThreshold(): ?int
    {
        $consumptionRate = $this->getConsumptionRate();

        if (! $consumptionRate || $consumptionRate <= 0) {
            return null;
        }

        $amountAboveThreshold = $this->current_amount - $this->threshold_amount;

        if ($amountAboveThreshold <= 0) {
            return 0; // Already at or below threshold
        }

        return (int) ceil($amountAboveThreshold / $consumptionRate);
    }

    /**
     * Scope to get products that need restocking.
     */
    public function scopeNeedsRestock($query)
    {
        return $query->whereColumn('current_amount', '<=', 'threshold_amount')
            ->where('is_active', true);
    }

    /**
     * Scope to get active products.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the last purchase price in dollars.
     */
    public function getLastPurchasePriceAttribute(): ?float
    {
        return $this->last_purchase_price_cents ? ($this->last_purchase_price_cents / 100) : null;
    }

    /**
     * Get the last purchased date formatted.
     */
    public function getLastPurchasedDateAttribute(): ?string
    {
        return $this->last_purchased_at?->format('Y-m-d');
    }

    /**
     * Get the percentage remaining rounded to 1 decimal.
     */
    public function getPercentageRemainingRoundedAttribute(): float
    {
        return round($this->getPercentageRemaining(), 1);
    }
}

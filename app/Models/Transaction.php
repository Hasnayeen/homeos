<?php

namespace App\Models;

use App\Casts\MoneyCast;
use App\Enums\TransactionType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Transaction extends Model
{
    protected $fillable = [
        'wallet_id',
        'budget_id',
        'category_id',
        'type',
        'amount',
        'description',
        'notes',
        'transaction_date',
    ];

    protected $casts = [
        'type' => TransactionType::class,
        'amount' => MoneyCast::class,
        'transaction_date' => 'date',
    ];

    /**
     * Get the wallet that owns the transaction.
     */
    public function wallet(): BelongsTo
    {
        return $this->belongsTo(Wallet::class);
    }

    /**
     * Get the budget associated with the transaction.
     */
    public function budget(): BelongsTo
    {
        return $this->belongsTo(Budget::class);
    }

    /**
     * Get the category associated with the transaction.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get all tags for this transaction.
     */
    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    /**
     * Check if transaction is an income.
     */
    public function isIncome(): bool
    {
        return $this->type === TransactionType::INCOME;
    }

    /**
     * Check if transaction is an expense.
     */
    public function isExpense(): bool
    {
        return $this->type === TransactionType::EXPENSE;
    }

    /**
     * Check if transaction is a transfer.
     */
    public function isTransfer(): bool
    {
        return $this->type === TransactionType::TRANSFER;
    }
}

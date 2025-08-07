<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Tag extends Model
{
    protected $fillable = [
        'name',
        'color',
        'description',
    ];

    /**
     * Get all the products that have this tag.
     */
    public function products(): MorphToMany
    {
        return $this->morphedByMany(Product::class, 'taggable');
    }

    /**
     * Get all the stuff that have this tag.
     */
    public function stuffs(): MorphToMany
    {
        return $this->morphedByMany(Stuff::class, 'taggable');
    }

    /**
     * Get all the wallets that have this tag.
     */
    public function wallets(): MorphToMany
    {
        return $this->morphedByMany(Wallet::class, 'taggable');
    }

    /**
     * Get all the budgets that have this tag.
     */
    public function budgets(): MorphToMany
    {
        return $this->morphedByMany(Budget::class, 'taggable');
    }

    /**
     * Get all the transactions that have this tag.
     */
    public function transactions(): MorphToMany
    {
        return $this->morphedByMany(Transaction::class, 'taggable');
    }

    /**
     * Get all the taggable models (polymorphic relationship).
     */
    public function taggables(): MorphToMany
    {
        return $this->morphToMany(Model::class, 'taggable');
    }
}

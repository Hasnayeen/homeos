<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            [
                'name' => 'Groceries',
                'color' => '#22c55e',
                'description' => 'Food and beverage items'
            ],
            [
                'name' => 'Pantry',
                'color' => '#f59e0b',
                'description' => 'Non-perishable food items'
            ],
            [
                'name' => 'Frozen',
                'color' => '#3b82f6',
                'description' => 'Frozen food items'
            ],
            [
                'name' => 'Spices',
                'color' => '#3b82f6',
                'description' => 'Herbs and spices for cooking'
            ],
            [
                'name' => 'Baking',
                'color' => '#eab308',
                'description' => 'Baking ingredients and supplies'
            ],
            [
                'name' => 'Dairy',
                'color' => '#fbbf24',
                'description' => 'Milk, cheese, yogurt, etc.'
            ],
            [
                'name' => 'Meat',
                'color' => '#ef4444',
                'description' => 'Fresh and processed meats'
            ],
            [
                'name' => 'Produce',
                'color' => '#10b981',
                'description' => 'Fresh fruits and vegetables'
            ],
            [
                'name' => 'Cleaning',
                'color' => '#8b5cf6',
                'description' => 'Cleaning supplies and detergents'
            ],
            [
                'name' => 'Personal Care',
                'color' => '#f97316',
                'description' => 'Toiletries and personal hygiene items'
            ],
            [
                'name' => 'Cleaning Supplies',
                'color' => '#ec4899',
                'description' => 'Household cleaning products'
            ],
            [
                'name' => 'Snacks',
                'color' => '#06b6d4',
                'description' => 'Chips, crackers, and other snacks'
            ],
            [
                'name' => 'Beverages',
                'color' => '#84cc16',
                'description' => 'Drinks and beverages'
            ],
            [
                'name' => 'Household',
                'color' => '#64748b',
                'description' => 'General household items'
            ],
            [
                'name' => 'Low Stock',
                'color' => '#dc2626',
                'description' => 'Items running low'
            ]
        ];

        foreach ($tags as $tag) {
            Tag::create($tag);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Milk',
                'description' => '2% milk gallon',
                'purchased_amount' => 1.00,
                'current_amount' => 0.30,
                'unit' => 'gallon',
                'storage_location' => 'Refrigerator',
                'threshold_amount' => 0.25,
                'last_purchased_at' => Carbon::now()->subDays(5),
                'last_purchase_price_cents' => 3.99, // $3.99
                'brand' => 'Organic Valley',
                'tags' => ['Dairy', 'Groceries'],
            ],
            [
                'name' => 'Bread',
                'description' => 'Whole wheat loaf',
                'purchased_amount' => 1.00,
                'current_amount' => 0.40,
                'unit' => 'loaf',
                'storage_location' => 'Kitchen Counter',
                'threshold_amount' => 0.20,
                'last_purchased_at' => Carbon::now()->subDays(3),
                'last_purchase_price_cents' => 2.49, // $2.49
                'brand' => 'Wonder',
                'tags' => ['Groceries', 'Pantry'],
            ],
            [
                'name' => 'Rice',
                'description' => 'Jasmine white rice',
                'purchased_amount' => 5.00,
                'current_amount' => 2.20,
                'unit' => 'lbs',
                'storage_location' => 'Pantry Cabinet',
                'threshold_amount' => 1.00,
                'last_purchased_at' => Carbon::now()->subDays(15),
                'last_purchase_price_cents' => 8.99, // $8.99
                'brand' => 'Mahatma',
                'tags' => ['Pantry', 'Groceries'],
            ],
            [
                'name' => 'Chicken Breast',
                'description' => 'Boneless skinless chicken breast',
                'purchased_amount' => 2.50,
                'current_amount' => 1.20,
                'unit' => 'lbs',
                'storage_location' => 'Freezer',
                'threshold_amount' => 0.50,
                'last_purchased_at' => Carbon::now()->subDays(7),
                'last_purchase_price_cents' => 12.99, // $12.99
                'brand' => 'Perdue',
                'tags' => ['Meat', 'Frozen', 'Groceries'],
            ],
            [
                'name' => 'Toilet Paper',
                'description' => '12-pack toilet paper',
                'purchased_amount' => 12.00,
                'current_amount' => 4.00,
                'unit' => 'rolls',
                'storage_location' => 'Linen Closet',
                'threshold_amount' => 3.00,
                'last_purchased_at' => Carbon::now()->subDays(20),
                'last_purchase_price_cents' => 15.99, // $15.99
                'brand' => 'Charmin',
                'tags' => ['Household', 'Personal Care'],
            ],
            [
                'name' => 'Apples',
                'description' => 'Honeycrisp apples',
                'purchased_amount' => 3.00,
                'current_amount' => 1.50,
                'unit' => 'lbs',
                'storage_location' => 'Refrigerator Crisper',
                'threshold_amount' => 0.50,
                'last_purchased_at' => Carbon::now()->subDays(4),
                'last_purchase_price_cents' => 4.99, // $4.99
                'brand' => null,
                'tags' => ['Produce', 'Groceries'],
            ],
            [
                'name' => 'Dish Soap',
                'description' => 'Liquid dish soap',
                'purchased_amount' => 1.00,
                'current_amount' => 0.15,
                'unit' => 'bottle',
                'storage_location' => 'Under Kitchen Sink',
                'threshold_amount' => 0.20,
                'last_purchased_at' => Carbon::now()->subDays(45),
                'last_purchase_price_cents' => 3.49, // $3.49
                'brand' => 'Dawn',
                'tags' => ['Cleaning', 'Household', 'Low Stock'],
            ],
            [
                'name' => 'Coffee',
                'description' => 'Ground coffee beans',
                'purchased_amount' => 1.00,
                'current_amount' => 0.35,
                'unit' => 'bag',
                'storage_location' => 'Kitchen Cabinet',
                'threshold_amount' => 0.25,
                'last_purchased_at' => Carbon::now()->subDays(12),
                'last_purchase_price_cents' => 8.99, // $8.99
                'brand' => 'Folgers',
                'tags' => ['Beverages', 'Pantry', 'Groceries'],
            ],
        ];

        foreach ($products as $productData) {
            $tags = $productData['tags'];
            unset($productData['tags']);

            $product = Product::create($productData);

            // Attach tags
            foreach ($tags as $tagName) {
                $tag = Tag::where('name', $tagName)->first();
                if ($tag) {
                    $product->tags()->attach($tag);
                }
            }
        }
    }
}

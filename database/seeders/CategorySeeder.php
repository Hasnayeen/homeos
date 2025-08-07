<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Salary', 'description' => 'Salary and wages'],
            ['name' => 'Investment Returns', 'description' => 'Returns from investments'],
            ['name' => 'Other Income', 'description' => 'Miscellaneous income sources'],
            ['name' => 'Food & Dining', 'description' => 'Groceries, restaurants, and food expenses'],
            ['name' => 'Transportation', 'description' => 'Car payments, gas, public transport'],
            ['name' => 'Housing', 'description' => 'Rent, mortgage, utilities, maintenance'],
            ['name' => 'Healthcare', 'description' => 'Medical bills, insurance, pharmacy'],
            ['name' => 'Entertainment', 'description' => 'Movies, games, hobbies, subscriptions'],
            ['name' => 'Shopping', 'description' => 'Clothing, electronics, general shopping'],
            ['name' => 'Education', 'description' => 'Courses, books, training, school fees'],
            ['name' => 'Bills & Utilities', 'description' => 'Electricity, water, internet, phone'],
            ['name' => 'Savings Transfer', 'description' => 'Transfer to savings account'],
            ['name' => 'Investment Transfer', 'description' => 'Transfer to investment account'],
            ['name' => 'Wallet Transfer', 'description' => 'Transfer between wallets'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['name' => $category['name']],
                $category
            );
        }
    }
}

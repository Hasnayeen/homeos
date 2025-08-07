<?php

use App\Http\Controllers\BudgetController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\StuffController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\WalletController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

Route::resource('/products', ProductController::class)->names('products');
Route::resource('/stuff', StuffController::class)->names('stuff');
Route::resource('/wallets', WalletController::class)->names('wallets');
Route::resource('/budgets', BudgetController::class)->names('budgets');
Route::resource('/transactions', TransactionController::class)->names('transactions');
Route::post('/storages', [StorageController::class, 'store'])->name('storages.store');

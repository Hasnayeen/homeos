<?php

namespace App\Http\Controllers;

use App\Enums\TransactionType;
use App\Models\Budget;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Transaction::with(['wallet', 'budget', 'category']);

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('description', 'like', '%'.$search.'%')
                    ->orWhere('notes', 'like', '%'.$search.'%')
                    ->orWhereHas('wallet', function ($q) use ($search) {
                        $q->where('name', 'like', '%'.$search.'%');
                    })
                    ->orWhereHas('category', function ($q) use ($search) {
                        $q->where('name', 'like', '%'.$search.'%');
                    });
            });
        }

        return Inertia::render('transactions', [
            'transactions' => $query->orderBy('transaction_date', 'desc')->paginate(15)->withQueryString(),
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('transactions/create', [
            'wallets' => Wallet::orderBy('name')->get(),
            'budgets' => Budget::orderBy('name')->get(),
            'categories' => Category::orderBy('name')->get(),
            'transactionTypes' => collect(TransactionType::cases())->map(fn ($type) => [
                'value' => $type->value,
                'label' => $type->getLabel(),
            ]),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'wallet_id' => 'required|exists:wallets,id',
            'budget_id' => 'nullable|exists:budgets,id',
            'category_id' => 'nullable|exists:categories,id',
            'type' => 'required|in:income,expense,transfer',
            'amount' => 'required|numeric|min:0',
            'description' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'transaction_date' => 'required|date',
        ]);

        Transaction::create($validated);

        return redirect()->route('transactions.index')->with('success', 'Transaction created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('transactions/show', [
            'transaction' => Transaction::with(['wallet', 'budget', 'category', 'tags'])->findOrFail($id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('transactions/edit', [
            'transaction' => Transaction::with(['wallet', 'budget', 'category'])->findOrFail($id),
            'wallets' => Wallet::orderBy('name')->get(),
            'budgets' => Budget::orderBy('name')->get(),
            'categories' => Category::orderBy('name')->get(),
            'transactionTypes' => collect(TransactionType::cases())->map(fn ($type) => [
                'value' => $type->value,
                'label' => $type->getLabel(),
            ]),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $transaction = Transaction::findOrFail($id);

        $validated = $request->validate([
            'wallet_id' => 'required|exists:wallets,id',
            'budget_id' => 'nullable|exists:budgets,id',
            'category_id' => 'nullable|exists:categories,id',
            'type' => 'required|in:income,expense,transfer',
            'amount' => 'required|numeric|min:0',
            'description' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'transaction_date' => 'required|date',
        ]);

        $transaction->update($validated);

        return redirect()->route('transactions.show', $transaction->id)->with('success', 'Transaction updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

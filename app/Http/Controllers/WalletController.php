<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WalletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Wallet::active();

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%');
            });
        }

        return Inertia::render('wallets', [
            'wallets' => $query->orderBy('name')->paginate(15)->withQueryString(),
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
        return Inertia::render('wallets/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'balance' => 'required|numeric|min:0',
            'currency' => 'required|string|max:3',
        ]);

        $validated['is_active'] = true;

        Wallet::create($validated);

        return redirect()->route('wallets.index')->with('success', 'Wallet created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('wallets/show', [
            'wallet' => Wallet::findOrFail($id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('wallets/edit', [
            'wallet' => Wallet::findOrFail($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $wallet = Wallet::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'balance' => 'required|numeric|min:0',
            'currency' => 'required|string|max:3',
        ]);

        $wallet->update($validated);

        return redirect()->route('wallets.show', $wallet->id)->with('success', 'Wallet updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

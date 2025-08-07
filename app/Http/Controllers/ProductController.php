<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::active();

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%')
                    ->orWhere('brand', 'like', '%'.$search.'%');
            });
        }

        return Inertia::render('products', [
            'products' => $query->orderBy('name')->paginate(15)->withQueryString(),
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
        return Inertia::render('products/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'purchased_amount' => 'required|numeric|min:0',
            'current_amount' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'storage_location' => 'nullable|string|max:255',
            'threshold_amount' => 'required|numeric|min:0',
            'last_purchased_at' => 'nullable|date',
            'last_purchase_price_cents' => 'nullable|integer|min:0',
            'brand' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $validated['is_active'] = true;

        Product::create($validated);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('products/show', [
            'product' => Product::findOrFail($id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $product = Product::findOrFail($id);

        return Inertia::render('products/edit', [
            'product' => $product,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'purchased_amount' => 'required|numeric|min:0',
            'current_amount' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'storage_location' => 'nullable|string|max:255',
            'threshold_amount' => 'required|numeric|min:0',
            'last_purchased_at' => 'nullable|date',
            'last_purchase_price_cents' => 'nullable|integer|min:0',
            'brand' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $product->update($validated);

        return redirect()->route('products.show', $product->id)->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

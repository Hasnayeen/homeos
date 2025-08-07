<?php

namespace App\Http\Controllers;

use App\Models\Storage;
use App\Models\Stuff;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StuffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('stuff', [
            'stuff' => Stuff::with('storage')
                ->orderBy('name')
                ->paginate(15),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('stuff/create', [
            'storages' => Storage::orderBy('name')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'storage_id' => 'nullable|exists:storages,id',
        ]);

        Stuff::create($validated);

        return redirect()->route('stuff.index')->with('success', 'Stuff created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('stuff/show', [
            'stuff' => Stuff::with('storage')->findOrFail($id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('stuff/edit', [
            'stuff' => Stuff::with('storage')->findOrFail($id),
            'storages' => Storage::orderBy('name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $stuff = Stuff::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'storage_id' => 'nullable|exists:storages,id',
        ]);

        $stuff->update($validated);

        return redirect()->route('stuff.show', $stuff->id)->with('success', 'Stuff updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

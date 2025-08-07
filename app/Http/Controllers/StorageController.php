<?php

namespace App\Http\Controllers;

use App\Models\Storage;
use Illuminate\Http\Request;

class StorageController extends Controller
{
    /**
     * Store a newly created storage in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $storage = Storage::create($validated);

        return response()->json([
            'success' => true,
            'storage' => $storage,
            'message' => 'Storage created successfully.'
        ]);
    }
}
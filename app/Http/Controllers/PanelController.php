<?php

namespace App\Http\Controllers;

use App\Http\Requests\PanelStoreRequest;
use App\Http\Requests\PanelUpdateRequest;
use App\Http\Resources\PanelCollection;
use App\Http\Resources\PanelResource;
use App\Models\panel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PanelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Panels/Index', [
            'filters' => Request::all('search', 'trashed'),
            'panels' => new PanelCollection(
                Auth::user()->account->panels()
                    ->orderByName()
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Panels/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PanelStoreRequest $request)
    {
        Auth::user()->account->panels()->create(
            $request->validated()
        );

        return Redirect::route('panels')->with('success', 'Panel created.');
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\panel  $panel
     * @return \Illuminate\Http\Response
     */
    public function edit(Panel $panel)
    {
        return Inertia::render('Panels/Edit', [
            'panel' => new PanelResource($panel),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\panel  $panel
     * @return \Illuminate\Http\Response
     */
    public function update(PanelUpdateRequest $request, panel $panel)
    {
        $panel->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Panel updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\panel  $panel
     * @return \Illuminate\Http\Response
     */
    public function destroy(panel $panel)
    {
        $panel->delete();

        return Redirect::back()->with('success', 'Panel deleted.');
    }

    public function restore(panel $panel)
    {
        $panel->restore();

        return Redirect::back()->with('success', 'Panel restored.');
    }
}

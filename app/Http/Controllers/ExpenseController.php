<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Http\Resources\ExpenseCategoryCollection;
use App\Http\Resources\ExpenseCollection;
use App\Http\Resources\ExpenseResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Expense/Index', [
            'filters' => Request::all('search', 'trashed'),
            'expense' => new ExpenseCollection(
                Auth::user()->account->expense()
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
        return Inertia::render('Expense/Create', [
            'category' => new ExpenseCategoryCollection(
                Auth::user()->account->expensecategory()
                    ->orderBy('name')
                    ->get()
            ),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreExpenseRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreExpenseRequest $request)
    {
        Auth::user()->account->expense()->create(
            $request->validated()
        );

        return Redirect::route('expense')->with('success', 'Expense created.');
    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function edit(Expense $expense)
    {
        return Inertia::render('Expense/Edit', [
            'expense' => new ExpenseResource($expense),
            'category' => new ExpenseCategoryCollection(
                Auth::user()->account->expensecategory()
                    ->orderBy('name')
                    ->get()
            ),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateExpenseRequest  $request
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateExpenseRequest $request, Expense $expense)
    {
        $expense->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Expense updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function destroy(Expense $expense)
    {
        $expense->delete();

        return Redirect::back()->with('success', 'Expense Category deleted.');
    }

    public function restore(Expense $expense)
    {
        $expense->restore();

        return Redirect::back()->with('success', 'Expense restored.');
    }
}

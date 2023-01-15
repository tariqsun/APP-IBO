<?php

namespace App\Http\Controllers;

use App\Models\ExpenseCategory;
use App\Http\Requests\StoreExpenseCategoryRequest;
use App\Http\Requests\UpdateExpenseCategoryRequest;
use App\Http\Resources\ExpenseCategoryCollection;
use App\Http\Resources\ExpenseCategoryResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class ExpenseCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Expense/Category/Index', [
            'filters' => Request::all('search', 'trashed'),
            'category' => new ExpenseCategoryCollection(
                Auth::user()->account->expensecategory()
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
        return Inertia::render('Expense/Category/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreExpenseCategoryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreExpenseCategoryRequest $request)
    {
        Auth::user()->account->expensecategory()->create(
            $request->validated()
        );

        return Redirect::route('expense.category')->with('success', 'Expense Category created.');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ExpenseCategory  $expenseCategory
     * @return \Illuminate\Http\Response
     */
    public function edit(ExpenseCategory $expenseCategory)
    {
        return Inertia::render('Expense/Category/Edit', [
            'category' => new ExpenseCategoryResource($expenseCategory),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateExpenseCategoryRequest  $request
     * @param  \App\Models\ExpenseCategory  $expenseCategory
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateExpenseCategoryRequest $request, ExpenseCategory $expenseCategory)
    {
        $expenseCategory->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Expense Category updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ExpenseCategory  $expenseCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(ExpenseCategory $expenseCategory)
    {
        $expenseCategory->delete();

        return Redirect::back()->with('success', 'Expense Category deleted.');
    }

    public function restore(ExpenseCategory $expenseCategory)
    {
        $expenseCategory->restore();

        return Redirect::back()->with('success', 'Expense Category restored.');
    }
}

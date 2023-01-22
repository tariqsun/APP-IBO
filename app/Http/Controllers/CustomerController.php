<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Resources\CustomerCollection;
use App\Http\Resources\CustomerResource;
use App\Http\Resources\PlanCollection;
use App\Models\Plan;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Customer/Index', [
            'filters' => Request::all('search', 'trashed'),
            'customers' => new CustomerCollection(
                Auth::user()->account->customers()
                    ->with('plans')
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
        return Inertia::render('Customer/Create', [
            'plans' => new PlanCollection(
                Auth::user()->account->plans()
                    ->orderBy('name')
                    ->get()
            ),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCustomerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCustomerRequest $request)
    {
       $carbon = new Carbon($request->start_date);
       $customer = Auth::user()->account->customers()->create(
            $request->validated()
        );

        $plan = Plan::where('id', $request->plan_id)->first();

        $customer->payments()->create([
            'balance'=>$plan->price,
            'start_date'=>$carbon->format('Y-m-d H:i:s'),
            'due_date'=>$carbon->addMonth()->format('Y-m-d H:i:s'),
            'account_id'=>auth()->user()->id,
            'status'=>0
        ]);

        return Redirect::route('customers')->with('success', 'Customer created.');
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Customer $customer)
    {
        return Inertia::render('Customer/Edit', [
            'customer' => new CustomerResource($customer),
            'plans' => new CustomerCollection(
                Auth::user()->account->plans()
                    ->orderBy('name')
                    ->get()
            ),
        ]);


    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCustomerRequest  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $customer->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Customer updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();

        return Redirect::back()->with('success', 'Customer deleted.');
    }

    public function restore(Customer $customer)
    {
        $customer->restore();

        return Redirect::back()->with('success', 'Customer restored.');
    }
}

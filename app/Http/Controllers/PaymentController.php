<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use App\Http\Resources\CustomerCollection;
use App\Http\Resources\PaymentCollection;
use App\Http\Resources\PaymentResource;
use App\Models\Customer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Payment/Index', [
            'filters' => Request::all('search', 'trashed'),
            'payments' => new PaymentCollection(
                Auth::user()->account->payments()
                    ->where('status', 0)
                    ->orderBy('balance')
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
        return Inertia::render('Payment/Create', [
            'customers'=>new CustomerCollection(
                Auth::user()->account->customers()
                    ->orderBy('name')
                    ->get()
            )
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePaymentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePaymentRequest $request)
    {
        $request->validated();
        $balance = 0;
        $payment = Payment::where('customer_id', $request->customer_id)
                            ->where('status', 0);

        $customer_payment = $payment->first();

        if(!$customer_payment){
            return Redirect::route('payments')->with('error', 'Customer not found created.');
        }
        $rbalance = (int)$request->balance;
        $cbalance = (int)$customer_payment->balance;

        Auth::user()->account->payments()->create([
            'customer_id'=>$request->customer_id,
            'balance'=>($cbalance-$rbalance),
            'start_date'=>$customer_payment->start_date,
            'due_date'=>$customer_payment->due_date,
            'status'=>0
        ]);

        $payment->update([
            'status'=>1,
            'balance'=>$rbalance
        ]);

        return Redirect::route('payments')->with('success', 'Payments Added.');
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function edit(Payment $payment)
    {
        return Inertia::render('Payment/Edit', [
            'payment' => new PaymentResource($payment),
            'customers'=>new CustomerCollection(
                Auth::user()->account->customers()
                    ->orderBy('name')
                    ->get()
            )
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePaymentRequest  $request
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePaymentRequest $request, Payment $payment)
    {

        $payment->where('customer_id', $request->customer_id)->update(
            $request->only('balance', 'start_date', 'due_date')
        );

        return Redirect::back()->with('success', 'Payment  updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Payment $payment)
    {
        //
    }
}

@component('mail::message')
# Pending Payments

{{ count($data) }} Customer Payments in Pending.

@component('mail::table')
| Customer Name | Due Date      | Left Days| Plan     | Discount | balance  |
| ------------- |:-------------:| --------:| --------:| --------:| --------:|
@foreach ($data as $payment)
| {{ $payment['customer']['name'] }}     | {{ $payment['due_date'] }}  | {{ $payment['date_diff'] }}   | {{ $payment['plan_name'] }}   | {{ $payment['customer']['discount'] }}   | {{ $payment['ballance']  }}      |
@endforeach
@endcomponent


@component('mail::button', ['url' => route('payments')])
    Payments
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent

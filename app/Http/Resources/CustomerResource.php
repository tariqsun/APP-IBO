<?php

namespace App\Http\Resources;

use App\Models\Payment;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $payment = Payment::where('customer_id', $this->id)
            ->where('status', 1)
            ->get();
        return [
            'id' => $this->id,
            'customer_id' => $this->customer_id,
            'password' => $this->password,
            'discount' => $this->discount,
            'name' => $this->name,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'address' => $this->address,
            'start_date' => $this->start_date,
            'status' => $this->status,
            'deleted_at' => $this->deleted_at,
            'plan_id' => $this->plan_id,
            'payments'=>$this->payments()->where('status', 1)->get()->map->only( 'id', 'balance', 'start_date', 'due_date', 'status', 'created_at', 'deleted_at'),
        ];
    }
}

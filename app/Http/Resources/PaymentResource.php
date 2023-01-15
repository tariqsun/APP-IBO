<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'customer_id' => $this->customer_id,
            'balance' => $this->balance,
            'start_date' => $this->start_date,
            'due_date' => $this->due_date,
            'status' => $this->status,
            'deleted_at' => $this->deleted_at,
        ];
    }
}

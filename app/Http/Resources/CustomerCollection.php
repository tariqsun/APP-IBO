<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CustomerCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->collection->map->only(
            'id', 'customer_id', 'password', 'discount', 'name', 'email', 'phone_number', 'address', 'start_date', 'status', 'deleted_at', 'plans', 'due_payment'
        );
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'=>'required',
            'plan_id'=>'required',
            'password'=>['required'],
            'customer_id'=>'required|unique:customers',
            'status'=>'required',
            'discount'=>['nullable'],
            'email'=>['nullable'],
            'phone_number'=>['nullable'],
            'address'=>['nullable'],
            'start_date'=>['required'],
            'status'=>['required']
        ];
    }
}

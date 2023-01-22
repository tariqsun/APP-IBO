<?php


namespace App\Services;

use App\Mail\PaymentPending;
use App\Models\Customer;
use App\Models\Payment;
use App\Models\Plan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class PaymentNotification {

    public $customer;

    function __construct(Customer $customer)
    {
        $this->customer = $customer;
    }


    public function getPlan()
    {
        return Plan::where('id', $this->customer->plan_id)->first();
    }

    public function getPayment()
    {
        return Payment::where('status', 0)
                    ->where('customer_id', $this->customer->id)->first();
    }

    public function hasPayment()
    {
        if($this->getPayment()){
            return true;
        }
        return false;
    }

    public function hasPlan()
    {
        if($this->getPlan()){
            return true;
        }
        return false;
    }

    public function getBalance()
    {
        if($this->hasPayment()){
            return  (int)$this->getPayment()->balance;
        }

        return 0;
    }

    public function getPlanPrice()
    {
        if($this->hasPlan()){
            return (int)$this->getPlan()->price;
        }

        return 0;
    }

    public function getDiscount()
    {
        if($this->hasPlan()){
            return (int)$this->customer->discount;
        }

        return 0;
    }


    public function getFinalAmount()
    {
        return ($this->getPlanPrice()+$this->getBalance()-$this->getDiscount());
    }

    public function getStartDate()
    {
        if($this->hasPayment()){
            return Carbon::parse($this->getPayment()->start_date);
        }
    }

    public function getDueDate()
    {
        if($this->hasPayment()){
            return Carbon::parse($this->getPayment()->due_date);
        }
    }

    public function getCurrentDate()
    {
        return now();
    }


    public function run()
    {
        $response = [];
        if($this->hasPayment()){
            $diff = $this->getDueDate()->diffInDays($this->getCurrentDate());
            if($this->getBalance() > 0){
                if($diff > 0 && $diff < 5 ){
                    $response = [
                        'start_date'=>$this->getStartDate()->format('Y-m-d'),
                        'due_date'=>$this->getDueDate()->format('Y-m-d'),
                        'ballance'=>$this->getBalance(),
                        'date_diff'=>$diff,
                        'customer'=>$this->customer,
                        'plan_name'=>$this->getPlan()->name
                    ];
                }
            }

        }
        return $response;
    }

}

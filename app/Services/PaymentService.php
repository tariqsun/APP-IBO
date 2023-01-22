<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\Payment;
use App\Models\Plan;
use Carbon\Carbon;

class PaymentService {


    private $customer;

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
        if($this->hasPayment()){
            if($this->getDueDate()->format('Y-m-d') == $this->getCurrentDate()->format('Y-m-d')){

                if($this->getBalance() == 0){
                    Payment::where('id', $this->getPayment()->id)->update([
                        'start_date'=>$this->getDueDate()->format('Y-m-d'),
                        'due_date'=>$this->getDueDate()->addMonth()->format('Y-m-d'),
                        'balance'=>$this->getFinalAmount()
                    ]);
                }else{
                    Payment::where('id', $this->getPayment()->id)->update([
                        'due_date'=>$this->getDueDate()->addMonth()->format('Y-m-d'),
                        'balance'=>$this->getFinalAmount()
                    ]);
                }

            }
        }

    }


}

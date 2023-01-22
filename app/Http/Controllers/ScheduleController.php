<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Payment;
use App\Models\Plan;
use App\Services\PaymentService;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index()
   {
        date_default_timezone_set("Asia/Karachi");
         $response = [];
         $customers =  Customer::where('status', 1)->get();
         foreach($customers as $customer){

            try{
                $paymentService = new PaymentN($customer);
                $paymentService->run();
            }catch(Exception $e){
                $response[] = [
                    'res'=>'err'
                ];
            }
         }

         return response()->json([
            'res'=>$response,
        ]);
   }
}

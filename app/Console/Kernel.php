<?php

namespace App\Console;

use App\Mail\PaymentPending;
use App\Models\Payment;
use App\Models\User;
use App\Services\PaymentNotification;
use App\Services\PaymentService;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
        $schedule->call(function () {
            date_default_timezone_set("Asia/Karachi");

            $users = User::get();
            foreach($users as $user){
                $payments = [];
                foreach($user->account->customers() as $customer){
                    try {
                        $paymentService = new PaymentService($customer);
                        $paymentService->run();
                        $PaymentNotification = new PaymentNotification($customer);
                        $payment = $PaymentNotification->run();
                        if(count($payment) > 0){
                            $payments[] = $payment;
                        }
                    } catch (\Exception $th) {
                        Log::error($th->getMessage());
                    }
                }
                if(count($payments) > 0){
                    Mail::to($user->email)
                     ->cc('ehsan@sunlink.net.pk')
                     ->cc('zohaib.dev2@gmail.com')
                     ->send(new PaymentPending($payments));
                 }
            }
        })->daily();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}

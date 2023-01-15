<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = new UserResource(User::where('id', Auth::id())->first());
        return Inertia::render('Dashboard/Index', compact('user'));
    }
}

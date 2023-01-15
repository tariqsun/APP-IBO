<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenseCategoryController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\OrganizationsController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\PanelController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PlanController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth
Auth::routes();
Route::post('login', [LoginController::class, 'login'])->name('login.attempt')->middleware('guest');
Route::post('logout', [LoginController::class, 'login'])->name('logout');


Route::middleware('auth')->group(function(){

    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        // Users
    Route::prefix('users')->group(function(){
        Route::get('/', [UsersController::class, 'index'])->name('users')->middleware('remember');
        Route::get('/create', [UsersController::class, 'create'])->name('users.create');
        Route::post('/', [UsersController::class, 'store'])->name('users.store');
        Route::get('/{user}/edit', [UsersController::class, 'edit'])->name('users.edit');
        Route::put('/{user}', [UsersController::class, 'update'])->name('users.update');
        Route::delete('/{user}', [UsersController::class, 'destroy'])->name('users.destroy');
        Route::put('/{user}/restore', [UsersController::class, 'restore'])->name('users.restore');
    });

    Route::prefix('panels')->group(function(){
        Route::get('/', [PanelController::class, 'index'])->name('panels')->middleware('remember');
        Route::get('/create', [PanelController::class, 'create'])->name('panels.create');
        Route::post('/', [PanelController::class, 'store'])->name('panels.store');
        Route::get('/{panel}/edit', [PanelController::class, 'edit'])->name('panels.edit');
        Route::put('/{panel}', [PanelController::class, 'update'])->name('panels.update');
        Route::delete('/{panel}', [PanelController::class, 'destroy'])->name('panels.destroy');
        Route::put('/{panel}/restore', [PanelController::class, 'restore'])->name('panels.restore');
    });

    Route::prefix('expense_categories')->group(function(){
        Route::get('/', [ExpenseCategoryController::class, 'index'])->name('expense.category')->middleware('remember');
        Route::get('/create', [ExpenseCategoryController::class, 'create'])->name('expense.category.create');
        Route::post('/', [ExpenseCategoryController::class, 'store'])->name('expense.category.store');
        Route::put('/{expense_category}', [ExpenseCategoryController::class, 'update'])->name('expense.category.update');
        Route::get('/{expense_category}/edit', [ExpenseCategoryController::class, 'edit'])->name('expense.category.edit');
        Route::delete('/{expense_category}', [ExpenseCategoryController::class, 'destroy'])->name('expense.category.destroy');
        Route::put('/{expense_category}/restore', [ExpenseCategoryController::class, 'restore'])->name('expense.category.restore');
    });

    Route::prefix('expense')->group(function(){
        Route::get('/', [ExpenseController::class, 'index'])->name('expense')->middleware('remember');
        Route::get('/create', [ExpenseController::class, 'create'])->name('expense.create');
        Route::post('/', [ExpenseController::class, 'store'])->name('expense.store');
        Route::put('/{expense}', [ExpenseController::class, 'update'])->name('expense.update');
        Route::get('/{expense}/edit', [ExpenseController::class, 'edit'])->name('expense.edit');
        Route::delete('/{expense}', [ExpenseController::class, 'destroy'])->name('expense.destroy');
        Route::put('/{expense}/restore', [ExpenseController::class, 'restore'])->name('expense.restore');
    });

    Route::prefix('plans')->group(function(){
        Route::get('/', [PlanController::class, 'index'])->name('plans')->middleware('remember');
        Route::get('/create', [PlanController::class, 'create'])->name('plans.create');
        Route::post('/', [PlanController::class, 'store'])->name('plans.store');
        Route::put('/{plan}', [PlanController::class, 'update'])->name('plans.update');
        Route::get('/{plan}/edit', [PlanController::class, 'edit'])->name('plans.edit');
        Route::delete('/{plan}', [PlanController::class, 'destroy'])->name('plans.destroy');
        Route::put('/{plan}/restore', [PlanController::class, 'restore'])->name('plans.restore');
    });

    Route::prefix('customers')->group(function(){
        Route::get('/', [CustomerController::class, 'index'])->name('customers')->middleware('remember');
        Route::get('/create', [CustomerController::class, 'create'])->name('customers.create');
        Route::post('/', [CustomerController::class, 'store'])->name('customers.store');
        Route::put('/{customer}', [CustomerController::class, 'update'])->name('customers.update');
        Route::get('/{customer}/edit', [CustomerController::class, 'edit'])->name('customers.edit');
        Route::delete('/{customer}', [CustomerController::class, 'destroy'])->name('customers.destroy');
        Route::put('/{customer}/restore', [CustomerController::class, 'restore'])->name('customers.restore');
    });

    Route::prefix('payments')->group(function(){
        Route::get('/', [PaymentController::class, 'index'])->name('payments')->middleware('remember');
        Route::get('/create', [PaymentController::class, 'create'])->name('payments.create');
        Route::post('/', [PaymentController::class, 'store'])->name('payments.store');
        Route::put('/{payment}', [PaymentController::class, 'update'])->name('payments.update');
        Route::get('/{payment}/edit', [PaymentController::class, 'edit'])->name('payments.edit');
        Route::delete('/{payment}', [PaymentController::class, 'destroy'])->name('payments.destroy');
        Route::put('/{payment}/restore', [PaymentController::class, 'restore'])->name('payments.restore');
    });


    // Organizations
    Route::prefix('organizations')->group(function(){
        Route::get('/', [OrganizationsController::class, 'index'])->name('organizations')->middleware('remember');
        Route::get('/create', [OrganizationsController::class, 'create'])->name('organizations.create');
        Route::post('/', [OrganizationsController::class, 'store'])->name('organizations.store');
        Route::get('/{organization}/edit', [OrganizationsController::class, 'edit'])->name('organizations.edit');
        Route::put('/{organization}', [OrganizationsController::class, 'update'])->name('organizations.update');
        Route::delete('/{organization}', [OrganizationsController::class, 'destroy'])->name('organizations.destroy');
        Route::put('/{organization}/restore', [OrganizationsController::class, 'restore'])->name('organizations.restore');
    });

    // Contacts
    Route::prefix('contacts')->group(function(){
        Route::get('/', [ContactsController::class, 'index'])->name('contacts')->middleware('remember');
        Route::get('/create', [ContactsController::class, 'create'])->name('contacts.create');
        Route::post('/', [ContactsController::class, 'store'])->name('contacts.store');
        Route::get('/{contact}/edit', [ContactsController::class, 'edit'])->name('contacts.edit');
        Route::put('/{contact}', [ContactsController::class, 'update'])->name('contacts.update');
        Route::delete('/{contact}', [ContactsController::class, 'destroy'])->name('contacts.destroy');
        Route::put('/{contact}/restore', [ContactsController::class, 'restore'])->name('contacts.restore');
    });

    // Reports
    Route::get('reports', [ReportsController::class, 'index'])->name('reports');

});



// Images
Route::get('/img/{path}', [ImagesController::class, 'show'])->where('path', '.*');






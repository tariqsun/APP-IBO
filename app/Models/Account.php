<?php

namespace App\Models;

class Account extends Model
{
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function organizations()
    {
        return $this->hasMany(Organization::class);
    }

    public function plans()
    {
        return $this->hasMany(Plan::class);
    }

    public function expense()
    {
        return $this->hasMany(Expense::class);
    }

    public function expensecategory()
    {
        return $this->hasMany(ExpenseCategory::class);
    }

    public function panels()
    {
        return $this->hasMany(panel::class);
    }

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }

    public function customers()
    {
        return $this->hasMany(Customer::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}

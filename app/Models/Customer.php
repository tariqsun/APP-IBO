<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory, SoftDeletes;


    public function scopeOrderByName($query)
    {
        return $query->orderBy('name');
    }

    public function plans()
    {
        return $this->hasOne(Plan::class, 'id', 'plan_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function due_payment()
    {
        return $this->hasMany(Payment::class)
                ->where('status', 0);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('customer_id', 'like', '%'.$search.'%')
                        ->orWhere('name', 'like', '%'.$search.'%')
                        ->orWhere('email', 'like', '%'.$search.'%')
                        ->orWhere('address', 'like', '%'.$search.'%')
                        ->orWhere('start_date', 'like', '%'.$search.'%')
                        ->orWhereHas('plans', function ($query) use ($search) {
                            $query->where('name', 'like', '%'.$search.'%');
                        });
            });
        })->when($filters['trashed'] ?? null, function ($query, $trashed) {
            if ($trashed === 'with') {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        });
    }
}

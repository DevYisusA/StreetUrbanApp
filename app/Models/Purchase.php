<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    protected $fillable = [
        'provider_id',
        'user_id',
        'purchase_date',
        'tax',
        'total',
        'status',
        'picture',
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function provider(){
        return $this->belongsTo(Provider::class);
    }
    public function details(){
        return $this->hasMany(PurchaseDetails::class);
    }
}

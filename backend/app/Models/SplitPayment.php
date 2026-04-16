<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SplitPayment extends Model
{
    protected $fillable = ['booking_id', 'user_a_id', 'user_b_id', 'amount_a', 'amount_b', 'status_a', 'status_b', 'grace_period_end'];
    
    // Casting agar waktu otomatis menjadi objek Carbon (mudah untuk dimanipulasi)
    protected $casts = [
        'grace_period_end' => 'datetime', 
    ];

    public function booking() { return $this->belongsTo(Booking::class); }
    public function userA() { return $this->belongsTo(User::class, 'user_a_id'); }
    public function userB() { return $this->belongsTo(User::class, 'user_b_id'); }
}
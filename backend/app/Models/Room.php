<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Room extends Model
{
    use SoftDeletes;

    protected $fillable = ['property_id', 'type_name', 'capacity', 'price_daily', 'price_monthly', 'stock_physical'];

    public function property() { return $this->belongsTo(Property::class); }
    public function bookings() { return $this->hasMany(Booking::class); }
}
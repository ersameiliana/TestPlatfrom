<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model
{
    use SoftDeletes;

    protected $fillable = ['owner_id', 'name', 'address', 'city_name', 'province_name', 'latitude', 'longitude', 'is_verified'];

    public function owner() { return $this->belongsTo(User::class, 'owner_id'); }
    public function rooms() { return $this->hasMany(Room::class); }
}
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Venues extends Model
{
	protected $table = 'venues';

	public function stands()
    {
        return $this->hasMany('App\VenueStands','venue_id');
    }
}

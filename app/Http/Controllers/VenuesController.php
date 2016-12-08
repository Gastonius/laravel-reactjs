<?php

namespace App\Http\Controllers;

use App\Venues;
use App\Http\Controllers\Controller;

class VenuesController extends Controller {
    public function index()
    {
        return Venues::all();
    }

    public function show($id)
    {
        return Venues::find($id);
    }

    public function stands($id)
    {
    	return Venues::with('stands')->find($id);
    }
}

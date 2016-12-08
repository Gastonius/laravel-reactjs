<?php

// Retrieve a list of Venues
Route::resource('venues', 'VenuesController');

// Retrieve all the stands for a specified venue
Route::resource('venuestands', 'VenuesController@stands');

// Creates a reservation
Route::resource('reserve', 'VenueStandsController@reserve');

// Stores the logo
Route::post('uploadLogo', ['as' => 'logo.store' , 'uses' => 'VenueStandsController@reserveLogo']);

// Stores Marketing Material
Route::post('uploadMkt', ['as' => 'mkt.store' , 'uses' => 'VenueStandsController@reserveMkt']);

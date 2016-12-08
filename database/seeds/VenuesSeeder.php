<?php

use Illuminate\Database\Seeder;

class VenuesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       	DB::table('venue_stands')->truncate();

       	$standInformation = Array(
       		Array(
       			'xpos' => 0,
	       		'ypos' => 0,
	       		'width' => 83,
	       		'height' => 47,
	       		'price' => 500,
	       		'status' => 'free'
       		),
       		Array(
       			'xpos' => 84,
	       		'ypos' => 0,
	       		'width' => 83,
	       		'height' => 47,
	       		'price' => 450,
	       		'status' => 'free'
       		),
       		Array(
       			'xpos' => 167,
	       		'ypos' => 0,
	       		'width' => 83,
	       		'height' => 47,
	       		'price' => 450,
	       		'status' => 'free'
       		),
       		Array(
       			'xpos' => 250,
	       		'ypos' => 0,
	       		'width' => 83,
	       		'height' => 47,
	       		'price' => 450,
	       		'status' => 'free'
       		),
       		Array(
       			'xpos' => 333,
	       		'ypos' => 0,
	       		'width' => 83,
	       		'height' => 47,
	       		'price' => 450,
	       		'status' => 'free'
       		),
       		Array(
       			'xpos' => 416,
	       		'ypos' => 0,
	       		'width' => 83,
	       		'height' => 47,
	       		'price' => 450,
	       		'status' => 'free'
       		),
       		Array(
       			'xpos' => 31,
	       		'ypos' => 74,
	       		'width' => 85,
	       		'height' => 94,
	       		'price' => 900,
	       		'status' => 'free'
       		),
       		Array(
       			'xpos' => 31,
	       		'ypos' => 168,
	       		'width' => 85,
	       		'height' => 94,
	       		'price' => 900,
	       		'status' => 'free'
       		),
       		Array(
       			'xpos' => 167,
	       		'ypos' => 74,
	       		'width' => 84,
	       		'height' => 188,
	       		'price' => 1200,
	       		'status' => 'free'
       		),
       		Array(
       			'xpos' => 251,
	       		'ypos' => 74,
	       		'width' => 84,
	       		'height' => 188,
	       		'price' => 1200,
	       		'status' => 'free'
       		),
       		Array(
       			'xpos' => 387,
	       		'ypos' => 74,
	       		'width' => 85,
	       		'height' => 94,
	       		'price' => 900,
	       		'status' => 'free'
       		),
       		Array(
       			'xpos' => 387,
	       		'ypos' => 168,
	       		'width' => 85,
	       		'height' => 94,
	       		'price' => 900,
	       		'status' => 'free'
       		),	
       		Array(
       			'xpos' => 0,
	       		'ypos' => 287,
	       		'width' => 83,
	       		'height' => 47,
	       		'price' => 500,
	       		'status' => 'free'
       		),
       		Array(
       			'xpos' => 84,
	       		'ypos' => 287,
	       		'width' => 83,
	       		'height' => 47,
	       		'price' => 450,
	       		'status' => 'free'
       		),
       		Array(
       			'xpos' => 167,
	       		'ypos' => 287,
	       		'width' => 83,
	       		'height' => 47,
	       		'price' => 450,
	       		'status' => 'free'
       		),
       		Array(
       			'xpos' => 250,
	       		'ypos' => 287,
	       		'width' => 83,
	       		'height' => 47,
	       		'price' => 450,
	       		'status' => 'free'
       		),
       		Array(
       			'xpos' => 333,
	       		'ypos' => 287,
	       		'width' => 83,
	       		'height' => 47,
	       		'price' => 450,
	       		'status' => 'free'
       		),
       		Array(
       			'xpos' => 416,
	       		'ypos' => 287,
	       		'width' => 83,
	       		'height' => 47,
	       		'price' => 450,
	       		'status' => 'free'
       		),
       	);

		for ( $I = 1; $I < 3; $I++) {
			for ( $O = 0; $O < count($standInformation); $O++ ) {
				$current = $standInformation[$O];
				$current['venue_id'] = $I;
				DB::table('venue_stands')->insert($current);
			}
		}
    }
}

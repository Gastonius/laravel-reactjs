<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('venues')->truncate();

        DB::table('venues')->insert([
            'name' => 'Empire State',
            'location' => 'Manhattan',
            'coordinates' => '{"lat": 40.690681, "lng": -74.0997919}',
            'phone' => '917 34 4567',
            'date_start' => '2017-03-12',
            'date_end' => '2017-03-25'
        ]);

        DB::table('venues')->insert([
            'name' => 'World of Coca Cola',
            'location' => 'Atlanta',
            'coordinates' => '{"lat": 33.7628386, "lng": -84.3949422}',
            'phone' => '217 22 4532',
            'date_start' => '2017-02-20',
            'date_end' => '2017-02-25'
        ]);

        DB::table('venues')->insert([
            'name' => 'Chicago Downtown',
            'location' => 'Illinois',
            'coordinates' => '{"lat": 41.8989843, "lng": -87.6463861}',
            'phone' => '123 34 9999',
            'date_start' => '2017-02-01',
            'date_end' => '2017-02-15'
        ]);
    }
}

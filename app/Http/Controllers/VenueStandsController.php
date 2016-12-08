<?php

namespace App\Http\Controllers;

use App\VenueStands;
use App\Http\Controllers\Controller;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Contracts\Filesystem\Factory as Storage;
use Illuminate\Filesystem\Filesystem;

class VenueStandsController extends Controller {
    public function index()
    {
        return VenueStands::all();
    }

    public function show($id)
    {
        return VenueStands::find($id);
    }

    public function reserve(Request $request)
    {
		$this->validate($request, [
        	'name' => 'required|max:255',
        	'lastname' => 'required|max:255',
        	'email' => 'required|email|max:255'
    	]);

		$id = $request->input('id');
    	$name = $request->input('name');
    	$lastname = $request->input('lastname');
    	$email = $request->input('email');

		$venuestand = VenueStands::find($id);
		$venuestand->status = 'used';
		$venuestand->name = $name;
		$venuestand->lastname = $lastname;
		$venuestand->email = $email;
		$venuestand->save();

    	return \Response::json(array(
			'success' => true,
			'data'   => $venuestand
		)); 
    }

    public function reserveLogo( Storage $storage, Request $request )
    {
    	$image = $request->file( 'file' );
		$timestamp = $this->getFormattedTimestamp();
        $savedImageName = $this->getSavedFileName( $timestamp, $image );

        $imageUploaded = $this->uploadImage( $image, $savedImageName, $storage );

        if ( $imageUploaded )
        {
        	$id = $request->input('id');
            $data = [
            	'id' => $id,
                'original_path' => asset( '/images/' . $savedImageName )
            ];

            $venuestand = VenueStands::find($id);
            $venuestand->logo = $data['original_path'];
            $venuestand->save();
            return json_encode( $data, JSON_UNESCAPED_SLASHES );
        }
        return "uploading failed";
    }

    public function reserveMkt( Storage $storage, Request $request )
    {
    	$file = $request->file( 'file' );
		$timestamp = $this->getFormattedTimestamp();
        $savedFileName = $this->getSavedFileName( $timestamp, $file );

        $fileUploaded = $this->uploadMkt( $file, $savedFileName, $storage );

        if ( $fileUploaded )
        {
        	$id = $request->input('id');
            $data = [
            	'id' => $id,
                'original_path' => asset( '/mkt/' . $savedFileName )
            ];

            $venuestand = VenueStands::find($id);
            $venuestand->mkt = $data['original_path'];
            $venuestand->save();
            return json_encode( $data, JSON_UNESCAPED_SLASHES );
        }
        return "uploading failed";
    }

    public function uploadImage( $image, $imageFullName, $storage )
    {
        $filesystem = new Filesystem;
        return $storage->disk( 'image' )->put( $imageFullName, $filesystem->get( $image ) );
    }

    public function uploadMkt( $file, $fileFullName, $storage )
    {
        $filesystem = new Filesystem;
        return $storage->disk( 'mkt' )->put( $fileFullName, $filesystem->get( $file ) );
    }

    /**
     * @return string
     */
    protected function getFormattedTimestamp()
    {
        return str_replace( [' ', ':'], '-', Carbon::now()->toDateTimeString() );
    }

    /**
     * @param $timestamp
     * @param $image
     * @return string
     */
    protected function getSavedFileName( $timestamp, $image )
    {
        return $timestamp . '-' . $image->getClientOriginalName();
    }
}

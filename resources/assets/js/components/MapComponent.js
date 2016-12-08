import React, { Component } from 'react';
import { connect, PromiseState } from 'react-refetch'

import { withGoogleMap,GoogleMap,Marker,SearchBox } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";

import MyMarker from "./MyMarkerComponent";

const WholePageGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat: 40.4363882, lng: -75.044922 }}>

    {props.markers.map((marker, index) => {
      return (
        <MyMarker
          key={marker.id}
          marker={marker}
        />
      );
    })}
  </GoogleMap>
));


class MapComponent extends Component {
  state = {
    markers: [],
  }

  handleMarkerClick = this.handleMarkerClick.bind(this);

  componentDidMount() {
    fetch('/api/venues')
      .then(res => res.json())
      .then(data => { 
        this.setState({ markers: data }) 
      });
  }

  render() {
    return <div>
      <WholePageGoogleMap 
        containerElement={ <div id="container" /> }
        mapElement={ <div id="map" /> }
        markers={this.state.markers}
        onMarkerClick={this.handleMarkerClick}
      />
    </div>
  }

  handleMarkerClick( marker ) {
    console.log( marker );
  }
}

export default MapComponent;
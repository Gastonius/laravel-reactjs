import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Layer, Rect, Stage, Group} from 'react-konva';
import Dialog from 'material-ui/Dialog';

import { Link } from 'react-router';
import PromiseStateContainer from './PromiseStateContainer';
import ExpoDetails from  './ExpoDetailsComponent';
import { withGoogleMap,GoogleMap,Marker,SearchBox } from "react-google-maps";

class MyMarker extends Component {
  constructor(props) {
    super();
    this.state = {open: false, dialogOpen: false};
  }

  handleToggle = () => {
    this.setState({open: !this.state.open});
  }

  handleClick = () => {
    this.setState({dialogOpen: !this.state.dialogOpen});
  }

  render() {
    const divStyle = {
      backgroundImage: 'url(http://lorempixel.com/400/200/city/)'
    };

    return (
        <Marker
          position={ JSON.parse(this.props.marker.coordinates) }
          key={this.props.marker.id}
          onClick={this.handleToggle}>
          <Drawer open={this.state.open}>
            <div className="venueImage" style={ divStyle } />
            <div className="venueName">{this.props.marker.name}</div>
            <div className="venueLocation">{this.props.marker.location}</div>
            <List>
              <ListItem primaryText={this.props.marker.date_start} secondaryText="Start Date" />
              <ListItem primaryText={this.props.marker.date_end} secondaryText="End Date" />
            </List>
            <Divider />
            <div className="venueBook">
              <RaisedButton onTouchTap={this.handleClick} label="Book your place" />
              <Dialog
                title="Exposition Hall Map"
                modal={false}
                open={this.state.dialogOpen}
                onRequestClose={this.handleClick}
                autoScrollBodyContent={false}
              >
                <ExpoDetails venue={this.props.marker} />
              </Dialog>
            </div>
          </Drawer>
        </Marker>
    )
  }
}

export default MyMarker
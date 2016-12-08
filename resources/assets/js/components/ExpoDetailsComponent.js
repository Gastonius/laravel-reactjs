import React, { Component } from 'react';
import {Layer, Rect, Stage, Group, Image} from 'react-konva';
import MyStand from './StandComponent';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Register from './RegisterComponent';
 
class ExpoDetails extends Component {
  constructor(props) {
    super();
    this.state = { stands: [], selectedStand: {}, registerOpen: false };
  }

  componentDidMount() {
    this.retrieveStands();
  }

  retrieveStands() {
    fetch('/api/venuestands/' + this.props.venue.id )
      .then(res => res.json())
      .then(data => { 
        this.setState({ stands: data.stands });
        if ( this.state.selectedStand ) this.selectStand( this.state.selectedStand );
      });
  }

  selectStand( selstand ) {
    this.state.stands.map( function( stand ) {
      stand.selected = false;
      if ( stand.id == selstand.id ) {
        stand.selected = true;
        this.state.selectedStand = stand;
      }
    }.bind(this));
    
  }

  reserveStand() {
    this.state.registerOpen = !this.state.registerOpen;
    this.retrieveStands();
  }
  
  render() {
    const image = new window.Image();
    image.src = '/img/venuemap001.png';
      image.onload = () => {
        this.setState({
          image: image
        });
      };

    var stands = this.state.stands.map( function( stand ) {
        return <MyStand key={stand.id} stand={stand} selectStand={this.selectStand.bind(this)} />
    }.bind(this));

    return (
        <div className="venueDetails">
          <div className="canvasHolder">
            <Stage width={500} height={333}>
              <Layer>
                <Image image={this.state.image} width="500" height="333" />
                {stands}
              </Layer>
            </Stage>
          </div>
          <div className="venueInfo">
            { this.state.selectedStand.status == 'free' ? <div>
              <List>
                <ListItem
                  primaryText={this.state.selectedStand.price?this.state.selectedStand.price:'Select a stand first'}
                  secondaryText="Stand Price"
                />
              </List>
              <FlatButton
                label="Reserve"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.reserveStand.bind(this)}
              />
              <Dialog
                title="Register"
                modal={true}
                open={this.state.registerOpen}
                onRequestClose={this.reserveStand}
                autoScrollBodyContent={true}
              ><Register closeregister={this.reserveStand.bind(this)} standid={this.state.selectedStand.id}></Register>
              </Dialog>
            </div> : null }
            { this.state.selectedStand.status == 'used' ? <div>
              <List>
                <ListItem
                  primaryText={this.state.selectedStand.name}
                  secondaryText="Reserved by"
                />
                <a href={this.state.selectedStand.mkt} download>
                <ListItem
                  primaryText="Marketing Material"
                  secondaryText="Download"
                />
                </a>
              </List>
            </div> : null }
          </div>
        </div>
    );
  }
}

export default ExpoDetails
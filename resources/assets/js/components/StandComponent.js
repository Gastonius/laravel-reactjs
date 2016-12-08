import React, { Component } from 'react';
import {Layer, Rect, Stage, Group, Circle, Text, Image} from 'react-konva';1
 
class MyStand extends Component {
  constructor(props) {
    super();
    this.state = props.stand;
    this.state.selected = false;
    this.state.logoImage = false;

    this.handleClick = this.handleClick.bind(this);
  }

  // Updated when there's a new registration.
  componentWillReceiveProps( nextProps) {
    this.state = nextProps.stand;
  }

  handleClick() {
    this.props.selectStand( this.props.stand );
  }

  buildImage() {
    const image = new window.Image();
    image.src = this.state.logo;
    return <Image image={image} width="40" height="40" x={this.state.width / 2 - 20} y={this.state.height / 2 - 20} />
  }
    
  render() {
    return (
      <Group x={this.state.xpos} y={this.state.ypos} onClick={this.handleClick}>
        <Rect
          width={this.state.width} height={this.state.height}
          fill={this.state.selected?'rgba(255,0,0,.5)':'rgba(120,120,120,.5)'}
        >        
        </Rect>
        <Circle
          x = { (this.state.width / 2) }
          y = { (this.state.height / 2) }
          radius='20'
          fill="yellow"
        >        
        </Circle>
          <Text text={ this.state.id } fill="black" align="center" y={ (this.state.height / 2) } width={this.state.width}/>
        { this.state.status == 'free' ? <Text text={ this.state.price } fill="black" width={this.state.width} align="center" y={ (this.state.height / 2) - 15 }/> : null }
        { this.state.logo ? this.buildImage(this.state.logo): null }
      </Group>
    );
  }
}

export default MyStand
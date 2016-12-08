import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dropzone from 'react-dropzone';
import Snackbar from 'material-ui/Snackbar';

class Register extends Component {
  constructor(props) {
    super();
    this.state = { saved: false, id: props.standid, name: '', lastname: '', email: '', logo: [], mkt: [] };
  }

  componentDidMount() {
  }

  onDrop(logoFile) {
    this.setState({
      logo: logoFile
    });
  }

  onDropMkt(mktFile) {
    this.setState({
      mkt: mktFile
    });
  }

  handleChange(event) {
    this.state[ event.target.id ] = event.target.value;
  };

  handleRequestClose(event) {
    this.setState({ saved: false });
    this.props.closeregister();
  };

  reserveStand() {
    var data = {
      id: this.state.id,
      name: this.state.name,
      lastname: this.state.lastname,
      email: this.state.email
    }

    fetch('/api/reserve', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if ( responseJson.success ) { // Verify we got a good response from Server

        if ( this.state.logo.length ) { // Send the logo.
          var filedata = new FormData()
          filedata.append('file', this.state.logo[0]);
          filedata.append('id', data.id);

          fetch('/api/uploadLogo', {
            method: 'POST',
            body: filedata
          }).then((responseJson) => {
            if ( this.state.mkt.length ) { // Send mkt material.
              var filedata = new FormData()
              filedata.append('file', this.state.mkt[0]);
              filedata.append('id', data.id);

              fetch('/api/uploadMkt', {
                method: 'POST',
                body: filedata
              }).then( (responseJson) => {

              })
            }
          })
        }
        this.state.saved = true;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  render() {
    const style = {
      input: {
        marginLeft: 20  
      },
      fileinput: {
        cursor: 'pointer',
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: '0',
        left: '0',
        width: '100%',
        opacity: '0'
      },
      dropbox: {
        width: 'auto',
        position: 'relative',
        marginLeft: '20px',
        borderWidth: '0px',
        fontSize: '16px',
        lineHeight: '24px',
        height: '48px',
        display: 'inline-block',
        color: 'rgba(0,0,0,0.3)',
        display: 'flex'
      },
      dropboxDiv: {
        alignSelf: 'center'
      },
      button: {
        float: 'right',
        margin: '20px 25px'
      }
    };

    return (
        <div className="registerForm">
            <TextField id="name" value={this.state.name} hintText="First name" style={style.input} onChange={this.handleChange.bind(this)} />
            <Divider />
            <TextField id="lastname" value={this.state.lastname} hintText="Last name" style={style.input} onChange={this.handleChange.bind(this)} />
            <Divider />
            <TextField id="email" value={this.state.email} hintText="Email address" style={style.input} onChange={this.handleChange.bind(this)} />
            <Divider />
            <Dropzone  multiple={false} accept="image/*" style={style.dropbox} onDrop={this.onDrop.bind(this)}>
              <div style={style.dropboxDiv}>{this.state.logo.length > 0 ?this.state.logo[0].name.length > 30?this.state.logo[0].name.substr(0,27) + '...':this.state.logo[0].name:'Drop your company logo (or click to select)'}</div>
              {this.state.logo.length > 0 ? <div className="previews">
                <div>{this.state.logo.map((file) => <img key={file.lastModified} src={file.preview} /> )}</div>
                </div> : null}
            </Dropzone>
            <Divider />
            <Dropzone  multiple={false} style={style.dropbox} onDrop={this.onDropMkt.bind(this)}>
              <div style={style.dropboxDiv}>{this.state.mkt.length > 0 ?this.state.mkt[0].name.length > 30?this.state.mkt[0].name.substr(0,27) + '...':this.state.mkt[0].name:'Drop your marketing material (or click to select)'}</div>
            </Dropzone>
            <Divider />
            <FlatButton
              label="Confirm Reservation"
              style={style.button}
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.reserveStand.bind(this)}
            />
            <Snackbar
              open={this.state.saved}
              message="Reservation Created!"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose.bind(this)}
        />
        </div>
    );
  }
}

export default Register;
import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import { Paper } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';

import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

import * as firebase from 'firebase'

const styles = {

  paper: {
    padding: 20,
    margin: 20,
    width: 450,
    height: 400,
  },
  size: {
    width: 50,
    height: 50,
  },
  pad: {
    paddingLeft: 30,
    paddingRight: 30
  }
}

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {
        uid: null,
        username: null,
        email: null,
        account: null,
      },
      open: false,
    }
  }
  handletoggle = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(() => {
      if (firebase.auth().currentUser) {
        var userRef = firebase.database().ref().child("users/" + firebase.auth().currentUser.uid);
        userRef.on("value", snap => {
          let objCurrentuser = snap.val()
          this.setState({
            users: objCurrentuser
            // console.log(user)
          })
        })
      }

    });
  }
  render() {
    const { open } = this.state;
    return (
      <Fragment>
        <IconButton
          onClick={this.handletoggle}
          color="inherit"
          style={styles.pad}
        >
          <AccountCircle style={styles.size} />
        </IconButton >

        <Dialog
          open={open}
          onClose={this.handletoggle}
        >
          <Paper style={styles.paper} Align="center" >
            {/* <DialogTitle>
            Profile
          </DialogTitle> */}
            <DialogContent color="inherit"  >
              <Typography variant="display1" >
                {this.state.users.username}
              </Typography>
              <Typography variant="title"  >
                Account :
                {this.state.users.account}
              </Typography>
              <Typography variant="title"  >
                Email :
                {this.state.users.email}
              </Typography>

            </DialogContent>
          </Paper>
        </Dialog>
      </Fragment>
    )
  }
}
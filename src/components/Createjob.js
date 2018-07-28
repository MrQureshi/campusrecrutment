import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Add } from '@material-ui/icons';

import * as firebase from 'firebase';

import { TextField } from '@material-ui/core';
import { FormControl } from '@material-ui/core';

// import withMobileDialog from '@material-ui/core/withMobileDialog';

const styles = {
  ctr: {
    paddingLeft: '40%'
  },
  FormControl: {
    width: 500
  }
}

const initilaState = {
  jobTitle: '',
  salary: '',
  discription: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initilaState,
      open: false,
    };
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
          })
        })
      }
    })
  }

  onSubmit = (event) => {

    event.preventDefault();
    const {
      jobTitle,
      salary,
      discription,
    } = this.state;

    var userID = firebase.auth().currentUser.uid;

    var job = {
      jobTitle: jobTitle,
      salary: salary,
      discription: discription,
      uid: userID,
      username: this.state.users.username,
      email: this.state.users.email
    }

    // const postKey = firebase.database().ref().child('jobs').push().key;
    // console.log("postkey..." + postKey )

    firebase.database().ref().child('jobs/').push(
      job
    ).then(() => {
      this.setState(() => ({ ...initilaState }));
    }).catch(error => {
      this.setState(byPropKey('error', error))
    })
  }
  render() {
    const { open } = this.state;
    const {
      jobTitle,
      salary,
      discription,
      error,
    } = this.state;

    const isInvalid = jobTitle === '' || salary === '' || discription === '';

    return (
      <Fragment>
        <span style={styles.ctr} >
          <Button variant="fab" color="primary" onClick={this.handletoggle} mini>
            <Add />
          </Button>
        </span>
        <Dialog
          open={open}
          onClose={this.handletoggle}
        >
          <DialogTitle>
            Create Job
        </DialogTitle>
          <DialogContent>
            <form
              onSubmit={this.onSubmit}
            >
              <FormControl style={styles.FormControl}  >
                <TextField
                  value={jobTitle}
                  // onChange ={event => this.setState({jobTitle : event.target.value })}
                  onChange={event => this.setState(byPropKey('jobTitle', event.target.value))}
                  label="Job Title"
                  margin="normal"
                /><br />
                <TextField
                  value={salary}
                  // onChange ={event => this.setState({salary : event.target.value })}
                  onChange={event => this.setState(byPropKey('salary', event.target.value))}
                  label="Salary"
                  margin="normal"
                  type="number"
                /><br />
                <TextField
                  value={discription}
                  // onChange ={event => this.setState({discription : event.target.value })}
                  onChange={event => this.setState(byPropKey('discription', event.target.value))}
                  label="Discription"
                  margin="normal"
                  multiline
                  rows="4"
                /><br />
                <Button
                  disabled={isInvalid}
                  // onClick={this.onSubmit}
                  onClick={this.handletoggle}
                  type="submit"
                  color="primary"
                  variant="raised" >Create</Button>
              </FormControl>
              {error && <p>{error.message}</p>}
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>)
  }
}

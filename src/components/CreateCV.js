import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
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
    education: '',
    skills: '',
    experience: '',
    discription: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = { ...initilaState, open: false, };

        // this.state = {
        //     users: {
        //         uid: null,
        //         username: null,
        //         email: null,
        //         account: null,
        //     }
        // }
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
                    console.log("A", this.state.users);
                })
            }
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        // console.log("clicked");
        const {
            education,
            skills,
            experience,
            discription,
        } = this.state;

        var userID = firebase.auth().currentUser.uid;

        firebase.database().ref('cv/' + userID).set({
            uid: userID,
            username: this.state.users.username,
            email: this.state.users.email,
            education: education,
            skills: skills,
            experience: experience,
            discription: discription
        }).then(() => {
            this.setState(() => ({ ...initilaState }));
        }).catch(error => {
            this.setState(byPropKey('error', error))
        });
    }
    render() {
        const { open } = this.state;
        const {
            education,
            skills,
            experience,
            discription,
            error,
    } = this.state;

        const isInvalid = education === '' || skills === '' ||
            experience === '' || discription === '';

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
                        Create CV
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            if you have already created your cv. this attamp will update your CV.
                        </DialogContentText>
                        <form onSubmit={this.onSubmit} >
                            <FormControl style={styles.FormControl}  >
                                <TextField
                                    value={education}
                                    onChange={event => this.setState(byPropKey('education', event.target.value))}
                                    label="Education"
                                    margin="normal"
                                /><br />
                                <TextField
                                    value={skills}
                                    onChange={event => this.setState(byPropKey('skills', event.target.value))}
                                    label="Skills"
                                    margin="normal"
                                /><br />
                                <TextField
                                    value={experience}
                                    onChange={event => this.setState(byPropKey('experience', event.target.value))}
                                    label="Experience"
                                    margin="normal"
                                
                                /><br />
                                <TextField
                                    value={discription}
                                    onChange={event => this.setState(byPropKey('discription', event.target.value))}
                                    label="Discription"
                                    margin="normal"
                                    multiline
                                    rows="4"
                                /><br />
                                <Button
                                    disabled={isInvalid}
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

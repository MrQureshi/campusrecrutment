import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Grid, Paper } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';

import * as firebase from 'firebase';


import { Link, withRouter } from 'react-router-dom';


const styles = {

    flex: {
        flex: 1,
    },
    paper: {
        padding: 20,
        paddingTop: 30,
        marginLeft: '50%',
        marginTop: 100,
        marginBottom: 10,
        // height: 330,
        // overflowY: 'auto',
    },

};


const Login = ({ history }) =>
    <Fragment>
        <AppBar position="static">
            <Toolbar>
                <Typography align="center" variant="display2" color="inherit" style={styles.flex}  >
                    Login
                </Typography>
            </Toolbar>
        </AppBar>
        <Grid container>
            <Grid style={styles.flex} item xs={8}>
                <Paper style={styles.paper} >
                    <Form history={history} />
                </Paper>
            </Grid>
        </Grid>
    </Fragment>

const initilaState = {
    email: '',
    password: '',
    erroe: null,
}

const byPropKey = (propertName, value) => () => ({
    [propertName]: value,
})

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = { ...initilaState };
    }

    onSubmit = (event) => {
        const {
            email,
            password
        } = this.state;

        const {
            history,
          } = this.props;

        const auth = firebase.auth();
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                if (email === "admin@gmail.com" && password === "1234567") {
                    history.push('/admin');
                }
                else {
                    var typeCheck;
                    var userId = firebase.auth().currentUser.uid;
                    const baseRef = firebase.database().ref();
                    const usersRef = baseRef.child('users/' + userId);

                    // alert(userId)
                    // alert(baseRef)
                    // alert(usersRef)

                    usersRef.on('value', snap => {
                        typeCheck = snap.val().account;


                        if (typeCheck === 'Student') {

                            history.push('/student');
                        }
                        else if (typeCheck === 'Company') {

                            history.push('/company');
                        }
                    })
                }
                //   this.setState(() => ({ ...initilaState }));
                //   history.push('/admin');
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });
        event.preventDefault();
    }

    render() {
        const {
            email, password,
            error
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <FormControl fullWidth >
                    <TextField
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        label="Email"
                        margin="normal"
                    /><br />
                    <TextField
                        value={password}
                        onChange={event => this.setState(byPropKey('password', event.target.value))}
                        label="Password"
                        margin="normal"
                        type="password"
                    />
                    <br />
                    <Link to="/forgetpassword">Forget Password</Link>
                    <br />
                    <Button
                        disabled={isInvalid}
                        type="submit"
                        color="primary"
                        variant="raised" >Login</Button>
                    <br />
                </FormControl>
                {error && <FormHelperText>{error.message} </FormHelperText>}

                <Link to="/Signup">Sign Up</Link>

            </form>


        )
    }
}

export default withRouter(Login);

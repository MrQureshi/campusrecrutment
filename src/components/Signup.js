import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Grid, Paper } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { auth, db } from '../firebase';
// import * as firebase from 'firebase';


import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';

import {
    withRouter,
} from 'react-router-dom';


const styles = {
    flex: {
        flex: 1,
    },
    paper: {
        padding: 20,
        paddingTop: 30,
        marginLeft: '50%',
        marginTop: 60,
        marginBottom: 10,
        // height: 350,
        // overflowY: 'auto',
    },

};
const Signup = ({ history }) =>
    <Fragment>
        <AppBar position="static">
            <Toolbar>
                <Typography align="center" variant="display2" color="inherit" style={styles.flex}  >
                    Signup
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
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    value: '',
    error: null,
};
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = { ...initilaState };
    }

    // handleChange = event => {
    //     this.setState({ value: event.target.value });
    //     console.log(event.target.value)
    //   };

    onSubmit = (event) => {
        console.log('Clicked');
        const {
            username,
            email,
            passwordOne,
            value,
        } = this.state;

        const {
            history,
          } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                db.doCreateUser(authUser.user.uid, username, email, passwordOne, value)
                    .then(() => {
                        this.setState(() => ({ ...initilaState }));
                        history.push('/');
                    })
                    .catch(error => {
                        this.setState(byPropKey('error', error))
                    });
            })
            .catch(error => {
                this.setState(byPropKey('error', error))
            })

        event.preventDefault();

    }

    render() {
        // const { classes } = this.props;

        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            value,
            error,
          } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '' ||
            value === '';
        //   {
        //     console.log(value)
        //   }
        return (
            <form onSubmit={this.onSubmit}>
                <FormControl fullWidth >
                    <TextField
                        value={username}
                        onChange={event => this.setState(byPropKey('username', event.target.value))}
                        label="User Name"
                        margin="normal"
                    /><br />
                    <TextField
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        label="Email"
                        margin="normal"
                    /><br />
                    
                    <TextField
                        value={passwordOne}
                        onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                        label="Password"
                        margin="normal"
                        type="password"
                    /><br />
                    <TextField
                        value={passwordTwo}
                        onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                        label="Confirm Password"
                        margin="normal"
                        type="password"
                    /><br />
                    {/* start */}
                    <RadioGroup
                        value={this.state.value}
                        onChange={event => this.setState(byPropKey('value', event.target.value))}
                    >
                        <FormControlLabel value="Company" name="user" control={<Radio color="primary" />} label="Company" />
                        <FormControlLabel value="Student" name="user" control={<Radio color="primary" />} label="Student" />

                    </RadioGroup>
                    {/* end */}
                    <Button
                        disabled={isInvalid}
                        type="submit"
                        color="primary"
                        variant="raised" >Signup</Button>
                    <br />
                </FormControl>
                {error && <p>{error.message}</p>}
            </form>


        )
    }
}

export default withRouter(Signup);


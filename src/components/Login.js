import React, {Component, Fragment } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Grid, Paper } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import {auth} from '../firebase'

import { Link, withRouter} from 'react-router-dom';


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


const Login = ({history}) =>
    <Fragment>
        <AppBar position="static">
            <Toolbar>
                <Typography align="center" variant="display2" color="inherit" style={styles.flex}  >
                    Login
                </Typography>
            </Toolbar>
        </AppBar>
        <Grid container>
            <Grid style={styles.flex} item  xs={8}>
                <Paper style={styles.paper} >
                  <Form  history={history} />
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

class Form extends Component{
    constructor(props){
        super(props);

        this.state = {...initilaState};
    }
    
    onSubmit =(event) => {
        console.log('click');
        const{
            email,
            password
        } = this.state;

        const {
            history,
          } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState(() => ({ ...initilaState }));
          history.push('/dashboard');
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
  
      event.preventDefault();
    }

    render(){ 
        const{
            email, password,
            error
        } = this.state;

        const isInvalid = 
        password === '' ||
        email === '';

        return(
            <form  onSubmit={this.onSubmit}>
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
            {error && <p>{error.message}</p>}
            
            <Link to="/Signup">Sign Up</Link>
        
        </form>
        
        
        )
    }
}

export default withRouter(Login);

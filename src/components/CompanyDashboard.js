import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, Typography, Grid, Paper, Button } from '@material-ui/core';

// import {Link} from 'react-router-dom';


import { firebase, auth } from '../firebase';

const styles = {
    flex: {
        flex: 1,
    },
    paper: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 6,
        marginRight: 6,
        height: 570,
        overflowY: 'auto'
    }
};
class Dashboard extends Component {

  

    render() {
        return (
            <Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="display2" color="inherit" style={styles.flex}  >
                            DASHBOARD
                        </Typography>
                        {/* <Link to="/" type="button"> */}
                            <Button type="button" onClick={auth.doSignOut} color="inherit" >Logout</Button>
                        {/* </Link> */}
                    </Toolbar>
                </AppBar>
                <Grid container>
                    <Grid item xs={4}>
                        <Paper style={styles.paper} >

                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper style={styles.paper} >

                        </Paper>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}


export default Dashboard;
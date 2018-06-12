import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, Typography, Grid, Paper, Button } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


import { firebase } from '../firebase';

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
    },
    size: {
        width: 25,
        height: 25
    }
};
class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            auth: true,
            authUser: null,
        };
    }

    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState(() => ({ authUser }))
                : this.setState(() => ({ authUser: null }));
        });
    }
    handleMenu = event => {
        this.setState({ authUser: event.currentTarget });
      };
      handleClose = () => {
        this.setState({ authUser: null });
      };

    render() {
        const { auth, authUser } = this.state;
        const open = Boolean(authUser);

        return (
            <Fragment>
                <AppBar position="static">
                    <Toolbar>
                        {auth && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle style={styles.size} />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    authUser={authUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top' ,
                                        horizontal: 'left',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        )}

                        <Typography variant="headline" color="inherit" style={styles.flex}  >
                            DASHBOARD
                        </Typography>
                        <Button type="button" onClick={auth.doSignOut} color="inherit" >Logout</Button>
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
import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, Typography, Grid, Paper, Button, Tabs, Tab } from '@material-ui/core';

import * as firebase from 'firebase'


const styles = {
    root: {
        flexGrow: 1,
    },
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

    constructor(props) {
        super(props);

        this.state = {
            users: {
                uid: null,
                username: null,
                email: null,
                account: null,

            },
            value: 0,
        };
    }

    handleChange = (event, value) => {

        this.setState({ value });

    };

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
        return (
            <Fragment authUser={this.state.authUser}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="display2" color="inherit" style={styles.flex}  >
                            {this.state.users.username}
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={() => firebase.auth().signOut().then(() => this.props.history.push("/"))}>
                            Sign out
                        </Button>
                    </Toolbar>
                </AppBar>

                <Grid container>
                    <Grid item xs={6}>
                        <Paper style={styles.paper} >
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={styles.paper} >
                        </Paper>
                    </Grid>
                </Grid>
                <Paper  style={styles.root}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="View Students" />
                        <Tab label="View CVs" />
                        <Tab label="Create Job" />
                    </Tabs>
                </Paper>
            </Fragment>
        )
    }
}


export default Dashboard;

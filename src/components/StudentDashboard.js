import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, Typography, Grid, Paper, Button, Tabs, Tab } from '@material-ui/core';


import Jobslist, { ShowJobList } from './JobsList'
import Userprofile from './UserProfile'
import CompanyList, { ShowComapnyDeatils } from './CompanyList'
import Createcv from './CreateCV'
import Mycv, { ShowCV } from './MyCV'

import * as firebase from 'firebase'

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

                    })

                })
            }
        })
    }
    sendCurrentData = (currentData) => {
        this.setState({ currentData })
    }
    sendCL_currentData = (CL_currentData) => {
        this.setState({ CL_currentData })
    }

    sendJL_CurrentData = (JL_CurrentData) => {
        this.setState({ JL_CurrentData })
    }


    render() {
        return (
            <Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <Userprofile />
                        <Typography variant="display2" color="inherit" style={styles.flex}  >
                            {this.state.users.username}
                            <Typography variant="subheading" style={styles.flex} color="inherit"  >
                                {this.state.users.account}
                            </Typography>
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={() => firebase.auth().signOut().then(() => this.props.history.push("/"))}>
                            Sign out
                        </Button>
                    </Toolbar>
                </AppBar>
                <Grid container>
                    <Grid item xs={4}>
                        <Paper style={styles.paper} >
                            {this.state.value === 0 ? <CompanyList sendCL_currentData={this.sendCL_currentData} /> : null}
                            {this.state.value === 1 ? <Jobslist sendJL_CurrentData={this.sendJL_CurrentData} /> : null}
                            {this.state.value === 2 ? <Fragment> <Createcv /> <Mycv sendCurrentData={this.sendCurrentData} /></Fragment> : null}
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper style={styles.paper} >
                            {this.state.value === 0 ? <ShowComapnyDeatils CL_currentData={this.state.CL_currentData} /> : null}
                            {this.state.value === 1 ? <ShowJobList JL_CurrentData={this.state.JL_CurrentData} /> : null}
                            {this.state.value === 2 ? <ShowCV currentData={this.state.currentData} /> : null}
                        </Paper>
                    </Grid>
                </Grid>
                <Paper>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="View Company" />
                        <Tab label="View Jobs" />
                        <Tab label="Creat CV" />
                    </Tabs>
                </Paper>
            </Fragment>
        )
    }
}


export default Dashboard;
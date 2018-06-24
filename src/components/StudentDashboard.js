import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, Typography, Grid, Paper, Button, Tabs, Tab } from '@material-ui/core';
// import {  } from '@material-ui/core';
// import { TextField, Button } from '@material-ui/core';
// import { FormControl } from '@material-ui/core';
// import Signout from './Signout'

import Jobslist from './JobsList'
import Userprofile from './UserProfile'
import CompanyList from './CompanyList'
import Createcv from './CreateCV'
import Mycv, {Show} from './MyCV'

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
    sendCurrentData = (currentData) =>{
        this.setState({currentData})
    }

    render() {
        return (
            <Fragment>
                <AppBar position="static">
                    <Toolbar>
                    <Userprofile />
                    <Typography variant="display2" color="inherit" style={styles.flex}  >
                    {this.state.users.username }
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
                        {this.state.value === 0 ? <CompanyList/> : null}
                        {this.state.value === 1 ? <Jobslist/> : null}
                        {this.state.value ===2 ? <Fragment> <Createcv/> <Mycv sendCurrentData={this.sendCurrentData} /></Fragment> : null}
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper style={styles.paper} >
                            <Show currentData = {this.state.currentData}/>
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
                        {/* {console.log(this.state.value)} */}
                        <Tab label="View Company" />
                        <Tab label="View Jobs" />
                        <Tab label="Creat CV" />
                        {/* <Tab label="Create job" /> */}
                        {/* <Tab label={<Createjob />} /> */}
                    </Tabs>
                </Paper>
            </Fragment>
        )
    }
}


export default Dashboard;
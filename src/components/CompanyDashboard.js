import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, Typography, Grid, Paper, Button, Tabs, Tab } from '@material-ui/core';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import IconButton from '@material-ui/core/IconButton';

import Studentlist, { ShowStudentDeatils } from './StudentList'

import Createjob from './Createjob'
import Userprofile from './UserProfile'
import Createdjobs, { ShowMyJobs } from './CreatedJobs'
import Cvlist, { ShowCVList } from './CvsList'

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
    },
    list: {
        width: '100%',
    },
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

    // handleClick = () => {

    // };


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
    sendSL_currentData = (SL_currentData) => {
        this.setState({ SL_currentData })
    }
    sendCV_CurrentData = (CV_CurrentData) => {
        this.setState({ CV_CurrentData })
    }

    sendMJ_CurrentData = (MJ_CurrentData) => {
        this.setState({ MJ_CurrentData })
    }

    render() {
        return (
            <Fragment >
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

                            {/* {this.state.value === 0 ? <Studentlist sendSL_currentData={this.sendSL_currentData} /> : null}

                            {this.state.value === 1 ? <Cvlist sendCV_CurrentData={this.sendCV_CurrentData} /> : null} */}

                            {this.state.value === 0 ? <Fragment> <Createjob /> <Createdjobs sendMJ_CurrentData={this.sendMJ_CurrentData} /> </Fragment> : null}
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper style={styles.paper} >
                            {/* {this.state.value === 0 ? <ShowStudentDeatils SL_currentData={this.state.SL_currentData} /> : null}

                            {this.state.value === 1 ? <ShowCVList CV_CurrentData={this.state.CV_CurrentData} /> : null} */}

                            {this.state.value === 0 ? <ShowMyJobs MJ_CurrentData={this.state.MJ_CurrentData} /> : null}
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
                        {/* <Tab label="View Students" />
                        <Tab label="View CVs" /> */}
                        <Tab label="Created Jobs" />

                    </Tabs>
                </Paper>
            </Fragment >
        )
    }
}

export default Dashboard;

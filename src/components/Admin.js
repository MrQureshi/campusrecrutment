import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, Typography, Grid, Paper, Button, Tabs, Tab } from '@material-ui/core';

// import Userprofile from './UserProfile'
import Jobslist, { ShowJobList } from './AdminJobsList'
import CompanyList, { ShowComapnyDeatils } from './AdminCompanyList'
import Studentlist, { ShowStudentDeatils } from './AdminStudentList'

import Cvlist, { ShowCVList } from './AdminCvsList'

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
            value: 0
        };
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };

    sendSL_currentData = (SL_currentData) => {
        this.setState({ SL_currentData })
    };

    sendCV_CurrentData = (CV_CurrentData) => {
        this.setState({ CV_CurrentData })
    };
    sendCL_currentData = (CL_currentData, key) => {
        this.setState({ CL_currentData, key })
    }
    sendJL_CurrentData = (JL_CurrentData) => {
        this.setState({ JL_CurrentData })
    }

    render() {
        return (
            <Fragment>
                <AppBar position="static">
                    <Toolbar>
                        {/* <Userprofile /> */}
                        <Typography variant="display2" color="inherit" style={styles.flex}  >
                            admin  
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
                            {this.state.value === 0 ? 
                            <CompanyList 
                            sendCL_currentData={this.sendCL_currentData} /> : 
                            null}

                            {this.state.value === 1 ? <Studentlist sendSL_currentData={this.sendSL_currentData} /> : null}

                            {this.state.value === 2 ? <Jobslist sendJL_CurrentData={this.sendJL_CurrentData} /> : null}

                            {this.state.value === 3 ? <Cvlist sendCV_CurrentData={this.sendCV_CurrentData} /> : null}
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper style={styles.paper} >
                            {this.state.value === 0 ? <ShowComapnyDeatils CL_currentData={this.state.CL_currentData} /> : null}

                            {this.state.value === 1 ? <ShowStudentDeatils SL_currentData={this.state.SL_currentData} /> : null}

                            {this.state.value === 2 ? <ShowJobList JL_CurrentData={this.state.JL_CurrentData} /> : null}

                            {this.state.value === 3 ? <ShowCVList CV_CurrentData={this.state.CV_CurrentData} /> : null}

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
                        <Tab label="Companies" />
                        <Tab label="Students" />
                        <Tab label="Jobs" />
                        <Tab label="CVs" />
                    </Tabs>
                </Paper>
            </Fragment>
        )
    }
}

export default Dashboard;
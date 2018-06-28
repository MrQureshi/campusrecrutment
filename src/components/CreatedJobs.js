import React, { Component, Fragment } from 'react';
// import { Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';

import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';

import * as firebase from 'firebase';

const styles = {

    list: {
        width: '100%',
    },
    pos: {
        marginTop: 12,
    },
};

class joblist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobList: [],
            keys: [],
            MJ_CurrentData: []
        }
    }
    handleClick(key) {
        // console.log(key);
        firebase.database().ref(`jobs/${key}`).once('value').then((snap) => {
            var objGetMJ_CurrentData = snap.val();
            // console.log(objGetMJ_CurrentData);
            let MJ_CurrentData = [];

            MJ_CurrentData.push(objGetMJ_CurrentData)
            // console.log(MJ_CurrentData);
            this.setState({ MJ_CurrentData })
            this.props.sendMJ_CurrentData(this.state.MJ_CurrentData)
        })
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {    
                firebase.database().ref('jobs').orderByChild("uid").equalTo(firebase.auth().currentUser.uid).once('value').then((snap) => {
                    var objJobs = snap.val();
                    let jobList = [];
                    for (let key in objJobs) {
                        jobList.push({...objJobs[key], key});
                    }
                    this.setState({ jobList})
                })
            }
        })
    }
    render() {
        console.log(this.state.jobList)
        // console.log(this.state.keys)
        return (
            <div style={styles.list}>
                <List component="ul">
                    {/* <ListSubheader component="div">Students List</ListSubheader> */}
                    {
                        this.state.jobList
                            ?
                            this.state.jobList.map((job, index) => (
                                < ListItem button onClick={this.handleClick.bind(this, job.key)} key={index} >
                                    <ListItemText primary={job.jobTitle} />
                                    <ListItemText primary={job.salary} />
                                    {/* <ListItemText primary={job.discription} /> */}
                                </ListItem>
                            ))
                            :
                            < ListItem  >
                                <ListItemText primary="Not a single Student register yet" />
                            </ListItem>
                    }
                </List>
            </div>
        )
    }
}

export default joblist;

class ShowMyJobs extends Component {
    componentWillReceiveProps(nextProps) {

    }
    render() {
        console.log(this.props.MJ_CurrentData)
        return (
            <Fragment>
                <ul>
                    {this.props.MJ_CurrentData && this.props.MJ_CurrentData.length && this.props.MJ_CurrentData.map((data, index) => (
                        <Fragment key={index}>
                            <Toolbar color="primary">
                                <Typography variant="display3" >
                                    {data.jobTitle}
                                </Typography>
                            </Toolbar>

                            <Divider />

                            <Typography style={styles.pos} color="textSecondary">
                                Name
                                    </Typography>
                            <Typography variant="headline" component="h2">
                                {data.username}
                            </Typography>
                            <Typography style={styles.pos} color="textSecondary">
                                Email
                                    </Typography>
                            <Typography variant="headline" component="h2">
                                {data.email}
                            </Typography>

                            <Typography style={styles.pos} color="textSecondary">
                                Salary
                                    </Typography>
                            <Typography variant="headline" component="h2">
                                {data.salary}
                            </Typography>
                            <Typography style={styles.pos} color="textSecondary">
                                Discription
                                    </Typography>
                            <Typography variant="headline" component="h2">
                                {data.discription}
                            </Typography>
                            {/* <Typography style={styles.pos} color="textSecondary">
                                    Experience
                                    </Typography>
                                <Typography variant="headline" key={index} component="h2">
                                    {data.experience}
                                </Typography> */}

                        </Fragment>
                    ))}
                </ul>
            </Fragment>
        )
    }
}


export {
    ShowMyJobs
};
import React, { Component, Fragment } from 'react';
// import { Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

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
            // cvList: [],
            CV_CurrentData: [],
            appliedStudents: []

        }
    }

    handleClick(uid) {
        // const postKey = firebase.database().ref().child('jobs').push().key;
        // console.log("postkey..." + postKey )

        firebase.database().ref('cv/').orderByChild('uid').equalTo(uid).once('value').then((snap) => {
            var objGetCV_CurrentData = snap.val();
            // console.log(objGetCV_CurrentData);
            let CV_CurrentData = [];
            for (let getData in objGetCV_CurrentData) {
                CV_CurrentData.push(objGetCV_CurrentData[getData]);
            }
            // console.log(CV_CurrentData);
            this.setState({ CV_CurrentData })
            this.props.sendCV_CurrentData(this.state.CV_CurrentData)
        })
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                var userID = firebase.auth().currentUser.uid;

                // let appliedStudentsDetails = [];
                console.log("currentId", userID)

                var ref = firebase.database().ref("jobs/");
                ref.orderByChild("uid").equalTo(userID).on("value", snapshot => {
                    // console.log("Val", snapshot.val())
                    // console.log("key", snapshot.key)

                    let currentUserAllJobs = snapshot.val();

                    console.log("currentUserAllJobs", currentUserAllJobs)


                    let appliedJobs = {};
                    for (let key in currentUserAllJobs) {
                        if (currentUserAllJobs[key].apply) {
                            appliedJobs[key] = currentUserAllJobs[key].apply;
                            console.log('appliedJobs', appliedJobs);
                        }
                    }

                    // let appliedJobskeys = []
                    // for (let key in appliedJobs) {
                    //     appliedJobskeys.push({ ...appliedJobs[key] })
                    //     // appliedJobskeys = appliedJobs[key];
                    // }
                    
                    // console.log('appliedJobskeys', appliedJobskeys);
                    // let appliedJobsDetails= []
                    // for(let key in appliedJobskeys){
                    //     appliedJobsDetails.push({...appliedJobskeys[key]})
                    // } 
                    // console.log('appliedJobsDetails', appliedJobsDetails )


























                    // let appliedStudents = [];
                    // for (let key in objJobsAppliedDetails) {
                    //     // appliedStudents.push({...objJobsAppliedDetails[key]})
                    //     appliedStudents[key] = objJobsAppliedDetails[key]
                    // }

                    // console.log("B", appliedStudents)
                    // let appliedStudentsDetails = [];
                    // for(let key in appliedStudents){
                    //     appliedStudentsDetails.push({...appliedStudents[key], key})
                    // }

                    // console.log("C", appliedStudentsDetails)

                })
                // this.setState({ appliedStudents })
                // console.log("C", this.state.appliedStudents);
            }
        })
    }

    render() {
        return (
            <div style={styles.list}>
                <List component="ul">
                    {/* <ListSubheader component="div">Students List</ListSubheader> */}
                    {
                        this.state.appliedStudents
                            ?
                            this.state.appliedStudents.map((std, index) => (

                                < ListItem button onClick={this.handleClick.bind(this, std.key)} key={index} >
                                    <ListItemText primary={std.username} />
                                    <ListItemText primary={std.email} />

                                </ListItem>
                            ))
                            :
                            < ListItem  >
                                <ListItemText primary="Not a single Jobs created yet" />
                            </ListItem>
                    }
                </List>
            </div>
        )
    }
}
export default joblist;


class ShowCVList extends Component {

    componentWillReceiveProps(nextProps) {

    }
    render() {
        // console.log(this.props.CV_CurrentData)
        return (
            <Fragment>
                <ul>
                    {this.props.CV_CurrentData && this.props.CV_CurrentData.length && this.props.CV_CurrentData.map((data, index) => (

                        <Fragment>

                            <Toolbar color="primary">
                                <Typography variant="display3" key={index}>
                                    {data.username}
                                </Typography>
                            </Toolbar>

                            <Divider />

                            <Typography style={styles.pos} color="textSecondary">
                                Email
                            </Typography>
                            <Typography variant="headline" key={index} component="h2">
                                {data.email}
                            </Typography>

                            <Typography style={styles.pos} color="textSecondary">
                                Skills
                            </Typography>
                            <Typography variant="headline" key={index} component="h2">
                                {data.skills}
                            </Typography>
                            <Typography style={styles.pos} color="textSecondary">
                                Education
                            </Typography>
                            <Typography variant="headline" key={index} component="h2">
                                {data.education}
                            </Typography>
                            <Typography style={styles.pos} color="textSecondary">
                                Experience
                            </Typography>
                            <Typography variant="headline" key={index} component="h2">
                                {data.experience}
                            </Typography>
                            <Typography style={styles.pos} key={index} color="textSecondary">
                                Discription
                            </Typography>
                            <Typography variant="headline" component="h2">
                                {data.discription}
                            </Typography>
                        </Fragment>
                    ))}
                </ul>
            </Fragment>
        )
    }
}


export {
    ShowCVList
};
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
            jobList: [],
            keys: [],
            JL_CurrentData: []
        }
    }
    handleClick(key) {
        console.log("++ " + key);
        firebase.database().ref("jobs/").on("value", snap => {
            var objJL_CurrentData = snap.val();

            console.log("1 ", objJL_CurrentData);

            // let JL_CurrentData = []
            let childData = [];

            for (let parent in objJL_CurrentData) {
                var parentData = objJL_CurrentData[parent]
                console.log("2 ", parentData)
                for (let id in parentData) {
                    childData.push({...parentData[id], id})
                }
            }
            console.log("3 ", childData)
            if(childData.key == key){

            }
            





            // snap.forEach(parent => {
            //     // console.log(parent.val())
            //     parent.forEach(child => {
            //         // console.log(child.key)
            //         if (child.key == key) {
            //             var data = child.val();
            //             JL_CurrentData = data

            //             // console.log("* ", data)
            //             // console.log("**", JL_CurrentData);
            //             this.setState({ JL_CurrentData })
            //             console.log(this.state.JL_CurrentData)
            //             this.props.sendJL_CurrentData(this.state.JL_CurrentData)
            //         }
            //     })
            // })

        })
        //     firebase.database().ref('jobs/').orderByChild('uid').equalTo(uid).once('value').then((snap) => {
        //         var objGetJL_CurrentData = snap.val();
        //         // console.log(objGetJL_CurrentData);
        //         let JL_CurrentData = [];
        //         for (let getData in objGetJL_CurrentData) {
        //             JL_CurrentData.push(objGetJL_CurrentData[getData]);
        //         }
        //         // console.log(JL_CurrentData);
        //         this.setState({ JL_CurrentData })
        //         this.props.sendJL_CurrentData(this.state.JL_CurrentData)
        // })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                firebase.database().ref("jobs").on("value", snap => {

                    var objJobs = snap.val();
                    // console.log(objJobs);
                    // let keys = []

                    let jobList = [];
                    for (let key in objJobs) {
                        var obj = objJobs[key]
                        for (let key in obj) {
                            // console.log(obj[key])
                            jobList.push({ ...obj[key], key });
                        }
                    }
                    // console.log(jobList);

                    this.setState({ jobList })
                })
            }
        })
    }

    render() {
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
                                <ListItemText primary="Not a single Jobs created yet" />
                            </ListItem>
                    }
                </List>
            </div>
        )
    }
}
export default joblist;

class ShowJobList extends Component {

    componentWillReceiveProps(nextProps) {

    }
    render() {
        console.log("show", this.props.JL_CurrentData)
        return (
            <Fragment>
                <ul key={1}>
                    {this.props.JL_CurrentData && this.props.JL_CurrentData.length && this.props.JL_CurrentData.map((data, index) => (

                        <Fragment>

                            <Toolbar color="primary">
                                <Typography variant="display3" key={index}>
                                    {data.jobTitle}
                                </Typography>
                            </Toolbar>

                            <Divider />

                            <Typography style={styles.pos} color="textSecondary">
                                Name
                                </Typography>
                            <Typography variant="headline" key={index} component="h2">
                                {data.username}
                            </Typography>
                            <Typography style={styles.pos} color="textSecondary">
                                Email
                                </Typography>
                            <Typography variant="headline" key={index} component="h2">
                                {data.email}
                            </Typography>

                            <Typography style={styles.pos} color="textSecondary">
                                Salary
                                </Typography>
                            <Typography variant="headline" key={index} component="h2">
                                {data.salary}
                            </Typography>
                            <Typography style={styles.pos} color="textSecondary">
                                Discription
                                </Typography>
                            <Typography variant="headline" key={index} component="h2">
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
    ShowJobList
};
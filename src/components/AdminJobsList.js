import React, { Component, Fragment } from 'react';
// import { Paper } from '@material-ui/core';

import { Button, } from '@material-ui/core';
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
        // console.log("3 ", key)
        firebase.database().ref(`jobs/${key}`).once('value').then((snap) => {
            var objGetJL_CurrentData = snap.val();
            // console.log(objGetJL_CurrentData);
            let JL_CurrentData = [];

            JL_CurrentData.push({ ...objGetJL_CurrentData, key });

            // console.log(JL_CurrentData);
            this.setState({ JL_CurrentData })
            this.props.sendJL_CurrentData(this.state.JL_CurrentData);
            //    localStorage.setItem("key" , JSON.stringify(this.state.JL_CurrentData));
        })
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                firebase.database().ref("jobs").on("value", snap => {

                    var objJobs = snap.val();
                    // console.log("1", objJobs);
                    let jobList = [];

                    for (let key in objJobs) {
                        jobList.push({ ...objJobs[key], key });
                    }
                    // console.log("2 ", jobList)
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
    constructor() {
        super()

        this.state = {
            open: false,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.JL_CurrentData) {

            let key = nextProps.JL_CurrentData[0].key;
            let open = false;
            firebase.database().ref("jobs/" + key + "/apply/").on("value", snap => {
                // console.log("k", this.state.temporarykey)
                let objApply = snap.val();
                if (objApply) {
                    // console.log("oo", objApply);
                    for (let key in objApply) {
                        // console.log(objApply[key], key)
                        if (key === firebase.auth().currentUser.uid) {
                            open = true;
                        }
                    }
                }
                this.setState({ open })
            })
        }
    }

    handleDelete = (key) => {

        console.log("A", key)

        firebase.database().ref(`jobs/${key}`).remove();

    }

    render() {
        return (
            <Fragment>
                <ul>
                    {this.props.JL_CurrentData && this.props.JL_CurrentData.length && this.props.JL_CurrentData.map((data, index) => (
                        <Fragment key={index}>
                            <Toolbar color="primary">
                                <Typography variant="display3">
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
                            <Divider />
                            <Button style={styles.pos} color="primary" variant="raised"
                                onClick={this.handleDelete.bind(this, data.key)}
                            >Delete</Button>
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
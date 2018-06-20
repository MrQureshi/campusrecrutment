import React, { Component } from 'react';
// import { Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import * as firebase from 'firebase';

const styles = {

    list: {
        width: '100%',
    }
};

class joblist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobList: [],
            keys: []
        }
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(()=>{
            if(firebase.auth().currentUser){
                firebase.database().ref('jobs').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).once('value').then((snap) =>{
                    var objJobs = snap.val();
                    let keys = []
                    let jobList = [];
                    for(let key in objJobs){
                        keys.push(key);
                        jobList.push(objJobs[key]);
                    }
                    // console.log("1 "+keys);
                    // console.log("2 "+objJobs);
                    // console.log("3 "+jobList);
                    this.setState({jobList, keys})
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
                     this.state.state === null 
                     ?
                    < ListItem  >
                        <ListItemText primary="Not a single Student register yet"/>
                    </ListItem>
                    :
                    this.state.jobList.map((job, index) => (
                    < ListItem button key={index} >
                        <ListItemText primary={job.jobTitle} />
                        <ListItemText primary={job.salary} />
                        <ListItemText primary={job.discription} />
                    </ListItem>
                ))
                }
            </List>
        </div>
        )}
}

export default joblist;
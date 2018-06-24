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
            cvList: [],
            keys: []
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                firebase.database().ref("cv").on("value", snap => {
                    var Cvlist = snap.val();
                    let keys = []
                    let cvList = [];
                    for (let key in Cvlist) {
                        keys.push(key);
                        cvList.push(Cvlist[key]);
                    }
                    // console.log("1 "+keys);
                    // console.log("2 "+objJobs);
                    // console.log("3 "+jobList);
                    this.setState({ cvList, keys })
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
                        this.state.cvList
                            ?
                            this.state.cvList.map((cv, index) => (

                                < ListItem button key={index} >
                                    <ListItemText primary={cv.username} />
                                    <ListItemText primary={cv.email} />
                                    <ListItemText primary={cv.skills} />
                                    {/* <ListItemText primary={cv.experience} />
                                    <ListItemText primary={cv.education} />
                                    <ListItemText primary={cv.discription} /> */}
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
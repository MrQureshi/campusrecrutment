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
            cvList: [],
            keys: [],
            CV_CurrentData: []
        }
    }

    handleClick(key) {
        // const postKey = firebase.database().ref().child('jobs').push().key;
        // console.log("postkey..." + postKey )

        // firebase.database().ref('cv/').orderByChild('uid').equalTo(uid).once('value').then((snap) => {
        firebase.database().ref(`cv/${key}`).once('value').then((snap) => {
            var objGetCV_CurrentData = snap.val();
            console.log(objGetCV_CurrentData);
            let CV_CurrentData = [];
            
            CV_CurrentData.push({...objGetCV_CurrentData, key});

            console.log(CV_CurrentData);
            this.setState({ CV_CurrentData })
            this.props.sendCV_CurrentData(this.state.CV_CurrentData)
        })
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                firebase.database().ref("cv").on("value", snap => {
                    var Cvlist = snap.val();

                    let cvList = [];
                    for (let key in Cvlist) {

                        cvList.push({ ...Cvlist[key], key });
                    }
                    
                    this.setState({ cvList })
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

                                < ListItem button onClick={this.handleClick.bind(this, cv.key)} key={index} >
                                    <ListItemText primary={cv.username} />
                                    <ListItemText primary={cv.email} />

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
    handleDelete = (key) => {

        console.log("A", key)

        firebase.database().ref(`cv/${key}`).remove();

    }
    render() {
        console.log(this.props.CV_CurrentData)
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
    ShowCVList
};
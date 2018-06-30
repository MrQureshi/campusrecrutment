import React, { Component, Fragment } from 'react';


import { Button, } from '@material-ui/core';
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

class Students extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [],
            SL_currentData: []
        }
    }

    handleClick(key) {
        console.log("clik");
        firebase.database().ref(`users/${key}`).once('value').then((snap) => {
            var objGetSL_CurentData = snap.val();
            console.log(objGetSL_CurentData);

            let SL_currentData = [];

            SL_currentData.push({ ...objGetSL_CurentData, key });

            // console.log(currentData);
            this.setState({ SL_currentData })
            this.props.sendSL_currentData(this.state.SL_currentData)
        })
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                firebase.database().ref('users').on('value', (snap) => {
                    let obj = snap.val();
                    let objStudents = {};
                    for (let key in obj) {
                        if (obj[key].account === 'Student') {
                            objStudents[key] = obj[key];
                            // alert(objStudents);   
                        }
                    }

                    let students = [];
                    for (let key in objStudents) {
                        students.push({ ...objStudents[key], key })
                    }
                    this.setState({
                        students
                    })
                    // console.log(this.state.students)
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
                        this.state.students === null
                            ?
                            < ListItem  >
                                <ListItemText primary="Not a single Student register yet" />
                            </ListItem>
                            :
                            this.state.students.map((Slist, index) =>
                                < ListItem button onClick={this.handleClick.bind(this, Slist.key)} key={index} >
                                    <ListItemText primary={Slist.username} />
                                    <ListItemText primary={Slist.email} />
                                </ListItem>
                            )}
                </List>
            </div>
        )
    }
}
export default Students;

class ShowStudentDeatils extends Component {

    componentWillReceiveProps(nextProps) {
    }

    handleDelete = (key) => {

        console.log("A", key)

        var ref = firebase.database().ref("cv/");
        ref.orderByChild("uid").equalTo(key).once("value", function (snapshot) {
            // console.warn('------------', snapshot)
            const obj = snapshot.val();
            for (let key in obj) {
                ref.child(key).remove()

                // callback warns in case some error 
                // ref.child(k).remove((a) => console.warn('eeeeeeeeeeeeeeeeeeeeeee', a))  
            }
            firebase.database().ref(`users/${key}`).remove();
        });
    }

    render() {
        console.log(this.props.SL_currentData)
        return (
            <Fragment>
                <ul>
                    {this.props.SL_currentData && this.props.SL_currentData.length && this.props.SL_currentData.map((data, index) => (
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
                                Account
                                </Typography>
                            <Typography variant="headline" key={index} component="h2">
                                {data.account}
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
    ShowStudentDeatils
};
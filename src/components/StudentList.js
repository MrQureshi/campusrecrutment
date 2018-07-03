import React, {Component, Fragment}from 'react';
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
            SL_currentData:[]
        }
    }

    handleClick(email) {
        console.log("clik");
        firebase.database().ref('users/').orderByChild('email').equalTo(email).once('value').then((snap) => {
            var objGetSL_CurentData = snap.val();
            console.log(objGetSL_CurentData);

            let SL_currentData = [];
            for (let getData in objGetSL_CurentData) {
                SL_currentData.push(objGetSL_CurentData[getData]);
            }
            // console.log(currentData);
            this.setState({ SL_currentData })
            this.props.sendSL_currentData(this.state.SL_currentData)
        })
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                firebase.database().ref('users').once('value').then(snap => {
                    let obj = snap.val();
                    let objStudents = {};
                    for (let key in obj) {
                        if (obj[key].account === 'Student') {
                            objStudents[key] = obj[key];
                            // alert(objStudents);   
                        }
                    }
                    let students = [];
                    for (let a in objStudents) {
                        students.push(objStudents[a])
                    }
                    this.setState({
                        students
                    })
                    // console.log("SS", this.state.students)
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
                            <ListItemText primary="Not a single Student register yet"/>
                        </ListItem>
                        :
                        this.state.students.map((Slist, index) =>
                        < ListItem button onClick={this.handleClick.bind(this, Slist.email)} key={index} >
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
        render() {
            console.log(this.props.SL_currentData)
            return (
                <Fragment>
                    <ul>
                        {this.props.SL_currentData && this.props.SL_currentData.length && this.props.SL_currentData.map((data, index) => (
                            <Fragment>

                                <Toolbar color="primary">
                                    <Typography variant="display3"  key={index}>
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
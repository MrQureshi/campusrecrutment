import React, {Component}from 'react';
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


class Students extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
        }
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
                    // console.log(objStudents)

                    let students = [];
                    for (let a in objStudents) {
                        students.push(objStudents[a])
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
                            <ListItemText primary="Not a single Student register yet"/>
                        </ListItem>
                        :
                        this.state.students.map(({ username, email }) =>
                        < ListItem button >
                            <ListItemText primary={username} />
                            <ListItemText primary={email} />
                        </ListItem>
                    )}
                </List>
            </div>
        )
    }
}

export default Students;
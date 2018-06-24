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

class Company extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companies: [],
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                firebase.database().ref('users').once('value').then(snap => {
                    let obj = snap.val();
                    let objCompanies = {};
                    // const NoRecord = "No Record Found";
                    for (let key in obj) {
                        if (obj[key].account === 'Company') {
                            objCompanies[key] = obj[key];
                            // alert(objCompanies);
                        }
                        // else{
                        //    NoRecord
                        // }
                    }
                    // console.log(objCompanies)

                    let companies = [];
                    for (let a in objCompanies) {
                        companies.push(objCompanies[a])
                    }
                    this.setState({
                        companies
                    })
                    console.log(this.state.companies)
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
                        this.state.companies
                            ?
                            this.state.companies.map(({ username, email }) =>
                                < ListItem button >
                                    <ListItemText primary={username} />
                                    <ListItemText primary={email} />
                                </ListItem>)
                            :
                            < ListItem  >
                                <ListItemText primary="Not a single Company register yet" />
                            </ListItem>
                    }
                </List>
            </div>
        )
    }

}
export default Company;
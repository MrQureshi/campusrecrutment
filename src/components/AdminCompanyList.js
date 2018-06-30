import React, { Component, Fragment } from 'react';


import { Button, } from '@material-ui/core';
// import { Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';

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

class Company extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companies: [],
            CL_currentData: []
        }
    }
    
    handleClick(key) {
        // console.log("clik", key);
        firebase.database().ref(`users/${key}`).once('value').then((snap) => {
            var objGetCL_CurentData = snap.val();
            // console.log(objGetCL_CurentData);

            let CL_currentData = [];

            CL_currentData.push({ ...objGetCL_CurentData, key });

            // console.log(currentData);
            this.setState({ CL_currentData })
            this.props.sendCL_currentData(this.state.CL_currentData, )
        })
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                firebase.database().ref('users').on('value', (snap) => {
                    let obj = snap.val();
                    // console.log("A", obj)
                    let objCompanies = {};
                    for (let key in obj) {
                        if (obj[key].account === 'Company') {
                            objCompanies[key] = obj[key];
                        }
                    }
                    // console.log(objCompanies)
                    let companies = [];
                    // console.log("B", objCompanies)

                    for (let key in objCompanies) {
                        companies.push({ ...objCompanies[key], key })
                    }
                    // console.log("C", companies)
                    this.setState({
                        companies
                    })
                    // console.log("D", this.state.companies)
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
                            this.state.companies.map((clist, index) =>
                                < ListItem button onClick={this.handleClick.bind(this, clist.key)} key={index} >
                                    <ListItemText primary={clist.username} />
                                    <ListItemText primary={clist.email} />
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

class ShowComapnyDeatils extends Component {

    componentWillReceiveProps(nextProps) {
    }

    handleDelete = (key) => {

        console.log("A", key)

        var ref = firebase.database().ref("jobs/");
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
        // console.log("+*+", this.props.CL_currentData)
        return (
            <Fragment>
                <ul>
                    {this.props.CL_currentData && this.props.CL_currentData.length && this.props.CL_currentData.map((data, ) => (
                        <Fragment>

                            <Toolbar color="primary">
                                <Typography variant="display3">
                                    {data.username}
                                </Typography>
                            </Toolbar>

                            <Divider />

                            <Typography style={styles.pos} color="textSecondary">
                                Email
                                </Typography>
                            <Typography variant="headline" component="h2">
                                {data.email}
                            </Typography>
                            <Typography style={styles.pos} color="textSecondary">
                                Account
                                </Typography>
                            <Typography variant="headline" component="h2">
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
    ShowComapnyDeatils
};
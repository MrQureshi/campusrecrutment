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
    clr: {
        color: "Blue"
    }
};

class Company extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companies: [],
            keys:[],
            CL_currentData: []
        }
    }

    onSelectApply() {
        console.log("clickeeed ")
    }
    handleClick(keys) {
        console.log("clik", keys);
        // firebase.database().ref('users/').orderByChild('email').equalTo(email).once('value').then((snap) => {
        //     var objGetCL_CurentData = snap.val();
        //     console.log(objGetCL_CurentData);

        //     let CL_currentData = [];
        //     let CL_keys =[];
        //     for (let getData in objGetCL_CurentData) {
        //         CL_currentData.push(objGetCL_CurentData[getData]);
        //         CL_keys.push(getData)
        //     }
        //     // console.log(currentData);
        //     this.setState({ CL_currentData })
        //     this.props.sendCL_currentData(this.state.CL_currentData, CL_keys)
        // })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                firebase.database().ref('users').once('value').then(snap => {
                    let obj = snap.val();
                    let objCompanies = {};
                    for (let key in obj) {
                        if (obj[key].account === 'Company') {
                            objCompanies[key] = obj[key];
                            
                            // alert(objCompanies);
                        }
                    }
                    // console.log(objCompanies)

                    let companies = [];
                    let keys = [];
                    for (let a in objCompanies) {
                        companies.push(objCompanies[a])
                        keys.push(a);
                    }
                    this.setState({
                        companies, keys
                    })
                    // console.log(this.state.companies)
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
                            this.state.companies.map((clist, keys) =>
                                < ListItem button onClick={this.handleClick.bind(this, keys)} key={keys} >
                                    <ListItemText primary={clist.username} key={keys} />
                                    <ListItemText primary={clist.email} key={keys}/>
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

    handleDelete = (keys) => {

            var key = this.props.CL_currentData[key];
            console.log(key);
            // firebase.database().ref('users/' + key).remove();
    }

    
    render() {
        console.log(this.props.CL_currentData)
        return (
            <Fragment>
                <ul>
                    {this.props.CL_currentData && this.props.CL_currentData.length && this.props.CL_currentData.map((data, key) => (

                        <Fragment>

                            <Toolbar color="primary">
                                <Typography variant="display3" key={key}>
                                    {data.username}
                                </Typography>
                            </Toolbar>

                            <Divider />

                            <Typography style={styles.pos} color="textSecondary">
                                Email
                                </Typography>
                            <Typography variant="headline" key={key} component="h2">
                                {data.email}
                            </Typography>
                            <Typography style={styles.pos} color="textSecondary">
                                Account
                                </Typography>
                            <Typography variant="headline" key={key} component="h2">
                                {data.account}
                            </Typography>
                            <Divider />
                            <Button style={styles.pos} color="primary" sizeLarge variant="raised"
                                onClick={this.handleDelete.bind(this, key) } key={key}
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
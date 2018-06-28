import React, { Component,Fragment } from 'react';
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
            CL_currentData:[]
        }
    }

    handleClick(email) {
        console.log("clik");
        firebase.database().ref('users/').orderByChild('email').equalTo(email).once('value').then((snap) => {
            var objGetCL_CurentData = snap.val();
            console.log(objGetCL_CurentData);

            let CL_currentData = [];
            for (let getData in objGetCL_CurentData) {
                CL_currentData.push(objGetCL_CurentData[getData]);
            }
            // console.log(currentData);
            this.setState({ CL_currentData })
            this.props.sendCL_currentData(this.state.CL_currentData)
        })
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
                            
                        }
                       
                    }
                    // console.log(objCompanies)

                    let companies = [];
                    
                    for (let a in objCompanies) {
                        companies.push(objCompanies[a])
                        
                    }
                    this.setState({
                        companies,                    
                    })
                    // console.log("Whats that "+this.state.companies)
                    
                    
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
                        this.state.companies && this.state.companies.length 
                            ?
                            this.state.companies.map(( clist, index ) =>
                                < ListItem button onClick={this.handleClick.bind(this, clist.email)} key={index} >
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
        render() {
            console.log(this.props.CL_currentData)
            return (
                <Fragment>
                    <ul>
                        {this.props.CL_currentData && this.props.CL_currentData.length && this.props.CL_currentData.map((data, index) => (
    
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
        ShowComapnyDeatils
    };
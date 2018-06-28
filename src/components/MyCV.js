import React, { Component, Fragment } from 'react';
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

class userCV extends Component {
    constructor(props) {
        super(props);
        // this.handleClick = this.handleClick.bind(this);

        this.state = {
            myCV: [],
            keys: [],
            currentData: [],
        }
    }

    handleClick(uid) {
        // if(uid)
        firebase.database().ref('cv/').orderByChild('uid').equalTo(uid).once('value').then((snap) => {
            var objGetCuurentData = snap.val();
            // console.log(objGetCuurentData);
            let currentData = [];
            for (let getData in objGetCuurentData) {
                currentData.push(objGetCuurentData[getData]);
            }
            // console.log(currentData);
            this.setState({ currentData })
            this.props.sendCurrentData(this.state.currentData)
        })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                firebase.database().ref('cv/').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).once('value').then((snap) => {
                    var objCV = snap.val();
                    let keys = []
                    let myCV = [];
                    for (let key in objCV) {
                        keys.push(key);
                        myCV.push(objCV[key]);
                    }
                    // console.log("1 "+keys);
                    // // console.log("2 "+objCV);
                    // console.log("3 "+myCV);
                    this.setState({
                        myCV,
                        // myCV,
                        keys: keys
                    })
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
                        this.state.myCV
                            ?
                            this.state.myCV.map((
                                cv, index) => (
                                    < ListItem button onClick={this.handleClick.bind(this, cv.uid)} key={index} >

                                        <ListItemText primary={cv.username}
                                        // secondary={cv.uid} 
                                        />
                                        <ListItemText primary={cv.email} />
                                        <ListItemText primary={cv.experience} />
                                    </ListItem>
                                ))
                            :
                            < ListItem  >
                                <ListItemText primary="Not record found " />
                            </ListItem>
                    }
                </List>
            </div>
        )
    }
}
export default userCV;

class ShowCV extends Component {

    componentWillReceiveProps(nextProps) {

    }
    render() {
        console.log(this.props.currentData)
        return (
            <Fragment>

                <ul>
                    {this.props.currentData && this.props.currentData.length && this.props.currentData.map((data, index) => (

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
                        </Fragment>
                    ))}
                </ul>
            </Fragment>
        )
    }
}

export {
    ShowCV
};

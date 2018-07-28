import React, { Component, Fragment } from 'react';
// import { Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Button, } from '@material-ui/core';

import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';

import { TextField } from '@material-ui/core';

import * as firebase from 'firebase';

import EditCV from './EditCV'


import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

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
            currentData: [],
        }
    }

    handleClick(key) {
        firebase.database().ref(`cv/${key}`).once('value').then((snap) => {
            var objGetCuurentData = snap.val();
            // console.log(objGetCuurentData);
            let currentData = [];
            // for (let getData in objGetCuurentData) {
            //     currentData.push(objGetCuurentData[getData]);
            // }
            currentData.push({ ...objGetCuurentData, key });
            // console.log(currentData);
            this.setState({ currentData })
            this.props.sendCurrentData(this.state.currentData)
        })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                firebase.database().ref('cv/').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).on('value', (snap) => {
                    var objCV = snap.val();

                    let myCV = [];
                    for (let key in objCV) {
                        myCV.push({ ...objCV[key], key });
                    }
                    this.setState({
                        myCV,
                    })
                    console.log("CXC", myCV)
                })
            }
        })
    }

    render() {
        return (
            <div style={styles.list}>
                <List component="ul"
                    subheader={<ListSubheader component="div">My CV</ListSubheader>}
                >
                    {
                        this.state.myCV
                            ?
                            this.state.myCV.map((
                                cv, index) => (
                                    <Fragment>
                                        < ListItem button onClick={this.handleClick.bind(this, cv.key)} key={index} >

                                            <ListItemText primary={cv.username}
                                            // secondary="Name" 
                                            />
                                            <ListItemText primary={cv.email}
                                            // secondary="Email"
                                            />
                                            {/* <ListItemText primary={cv.experience}
                                            secondary="Experience"
                                            /> */}
                                            <ListItemSecondaryAction>
                                                {/* <IconButton aria-label="Edit"> */}
                                                    <EditCV getKeyForEdit={cv.key} />
                                                {/* </IconButton> */}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider />
                                    </Fragment>
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

                        <Fragment key={index}>

                            <Toolbar color="primary">
                                <Typography variant="display3"  >
                                    {data.username}
                                </Typography>
                            </Toolbar>

                            <Divider />

                            <Typography style={styles.pos} color="textSecondary">
                                Email
                            </Typography>
                            {/* <TextField
                                    value={data.email}
                                /><br /> */}
                            <Typography variant="headline" component="h2">
                                {data.email}
                            </Typography>

                            <Typography style={styles.pos} color="textSecondary">
                                Skills
                            </Typography>
                            <Typography variant="headline" component="h2">
                                {data.skills}
                            </Typography>
                            <Typography style={styles.pos} color="textSecondary">
                                Education
                            </Typography>
                            <Typography variant="headline" component="h2">
                                {data.education}
                            </Typography>
                            <Typography style={styles.pos} color="textSecondary">
                                Experience
                            </Typography>
                            <Typography variant="headline" component="h2">
                                {data.experience}
                            </Typography>
                            <Typography style={styles.pos} color="textSecondary">
                                Discription
                            </Typography>
                            <Typography variant="headline" component="h2">
                                {data.discription}
                            </Typography>

                            {/* <Button style={styles.pos} color="primary" variant="raised"
                                // onClick={this.handleDelete.bind(this, data.key)}
                            >Edit</Button>
                            
                            <Button style={styles.pos} color="primary" variant="raised"
                                // onClick={this.handleDelete.bind(this, data.key)}
                            >Update</Button> */}

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

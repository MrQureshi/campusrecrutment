import React, { Component, Fragment } from 'react';
// import { Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import { Typography } from '@material-ui/core';

import * as firebase from 'firebase';
// import currentDataService from '../services/currentDataService'
const styles = {

    list: {
        width: '100%',
    }
};

class userCV extends Component {
    constructor(props) {
        super(props);
        // this.handleClick = this.handleClick.bind(this);

        this.state = {
            myCV: [],
            keys: [],
            currentData: [],
            myname: ['Ab', 'Cd', 'Ef']
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
            console.log(currentData);
            this.setState({ currentData })
            this.props.sendCurrentData(this.state.currentData)
            // , ()=> currentDataService.addCurrentData(this.state.currentData));
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

class Show extends Component {

    componentWillReceiveProps(nextProps) {

    }
    render() {
        console.log(this.props.currentData)
        return (
            <Fragment>

                <ul>
                    {this.props.currentData && this.props.currentData.length && this.props.currentData.map((data, index) => {
                        return
                        <div><li key={index}>{data.username}</li>
                            <li key={index}>{data.email}</li>
                            </div>
                        })}

                    {/* </li> */}
                </ul>
                {/* {this.props.currentData} */}
                ETC
            </Fragment>
        )
    }
}


// const Show = () => {

// console.log(props.currentData)

//     return (
//         <Fragment>
//             ETCc
//         </Fragment>
//     )

// }

export {
    Show
};

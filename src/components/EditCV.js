import React, { Component, Fragment } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { Add } from '@material-ui/icons';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import * as firebase from 'firebase';

import { TextField } from '@material-ui/core';
import { FormControl } from '@material-ui/core';


const styles = {
    ctr: {
        paddingLeft: '40%'
    },
    FormControl: {
        width: 500
    }
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            // dataForEdit: [],
            username: '',
            email: '',
            education: '',
            experience: '',
            skills: '',
            discription: ''
        };
    }

    componentDidMount(){
        let getKey = this.props.getKeyForEdit;
        // console.log("AzA", getKey);
        
        firebase.database().ref('cv/').orderByChild('uid').equalTo(getKey).on('value', (snap) => {
            var objGetDataByKey = snap.val();
            console.log("000bj", objGetDataByKey)
            let dataForEdit = [];
            for (let key in objGetDataByKey) {
                dataForEdit.push(objGetDataByKey[key]);
            }
            if(dataForEdit.length){
                this.setState({
                    username: dataForEdit[0].username,
                    email: dataForEdit[0].email,
                    education: dataForEdit[0].education,
                    skills: dataForEdit[0].skills,
                    discription: dataForEdit[0].discription
                })
            }
                
            console.log("DtD", dataForEdit[0].email)
        })
    };
    handletoggle = () => {
        this.setState({
            open: !this.state.open,
        })
        
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
        let getKey = this.props.getKeyForEdit;

        console.log("hzhzh", getKey)
        // console.log("uzuzuz", this.state.username)

        let {
            username,
            email,
            education,
            skills,
            experience,
            discription,
        } = this.state;

        firebase.database().ref('cv/'+ getKey).update({
            uid: getKey,
            username:username,
            email: email,
            education: education,
            skills: skills,
            experience: experience,
            discription: discription
        }).then(() => {
            console.log('asdasdasdasdasdasdasdasdasd')
            // this.setState(() => ({ ...initilaState }));
        }).catch(error => {
            console.log('catchhhhhhhhhhhhhhhhhhhhhh')
            this.setState(byPropKey('error', error))
        });
    }

    render() {
        console.log(")0(", this.state.username)
        const { open } = this.state;

        let getData = this.state.dataForEdit;
        // console.log(")1(", getData)

        let {
            username,
            email,
            education,
            skills,
            experience,
            discription,
            error
        } = this.state;
        
        // console.log(")!(", this.state.username)
        // console.log(")@(", this.state.email)

        return (
            <Fragment>
                <IconButton aria-label="Edit" onClick={this.handletoggle} >
                    <EditIcon />
                </IconButton>
                <Dialog
                    open={open}
                    onClose={this.handletoggle}>
                    {/* <DialogTitle>
                        Hello
                    </DialogTitle> */}
                    <DialogContent>
                        <form action='javascript:void(0)'
                            onSubmit={this.onSubmit}
                        >
                            <FormControl style={styles.FormControl}  >
                                {/* {
                                    this.state.dataForEdit.map((data, index) => ( */}
                                        <Fragment>
                                        <TextField
                                            defaultValue={this.state.username}
                                            // value={this.state.username}
                                            onChange={event => this.setState({username: event.target.value})}
                                            label="Name"
                                            margin="normal"
                                        />
                                        <TextField
                                            defaultValue={this.state.email}
                                            // value={this.state.email}
                                            onChange={event => this.setState({email: event.target.value})}
                                            label="Email"
                                            margin="normal"
                                        />
                                        <TextField
                                            defaultValue={this.state.education}
                                            // value={this.state.education}
                                            onChange={event => this.setState({education: event.target.value})}
                                            label="Education"
                                            margin="normal"
                                        />
                                        <TextField
                                            defaultValue={this.state.skills}
                                            // value={this.state.skills}
                                            onChange={event => this.setState({skills: event.target.value})}
                                            label="Skills"
                                            margin="normal"
                                        />
                                        <TextField
                                            defaultValue={this.state.experience}
                                            // value={this.state.experience}
                                            onChange={event => this.setState({experience: event.target.value})}
                                            label="Experince"
                                            margin="normal"
                                        />
                                        <TextField
                                            defaultValue={this.state.discription}
                                            // value={this.state.discription}
                                            onChange={event => this.setState({discription: event.target.value})}
                                            label="Discription"
                                            margin="normal"
                                            multiline
                                            rows="4"
                                        />
                                    </Fragment>
                                    {/* ))
                                } */}
                                <Button
                                    onClick={this.handletoggle}
                                    type="submit"
                                    color="primary"
                                    variant="raised" >Update</Button>
                            </FormControl>
                            {error && <p>{error.message}</p>}
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}    

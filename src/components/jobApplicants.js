import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    pos: {
        marginTop: 12,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ApplicantStudents extends React.Component {
    constructor() {
        super()
        this.state = {
            open: false,
            AppleidStudentList: [],
        }
    }

    // state = {
    //     open: false,
    // };

    handletoggle = () => {
        this.setState({
            open: !this.state.open,
        })

        let AppleidStudent = this.props.applicents;
        // console.log("AA", AppleidStudent);
        
        let AppleidStudentList = [];
        for (let key in AppleidStudent) {
            AppleidStudentList.push({ ...AppleidStudent[key] })
        }
        // console.log("BB", AppleidStudentList)
        this.setState({
            AppleidStudentList
        })
        console.log("X",this.state.AppleidStudentList)
    }

    // componentDidMount() {
    //     let AppleidStudent = this.props.applicents;
    //     // console.log("AA", AppleidStudent)
    //     let AppleidStudentList = [];
    //     for (let key in AppleidStudent) {
    //         AppleidStudentList.push({ ...AppleidStudent[key] })
    //     }
    //     console.log("BB", AppleidStudentList)
    //     this.setState({
    //         AppleidStudentList
    //     })
    // }

    render() {
        // console.log("H", this.props.applicents)
        const { classes } = this.props;
        return (
            <div>
                <Button style={styles.pos} color="primary" variant="raised"
                    onClick={this.handletoggle}
                >Applicants</Button>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handletoggle} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Applicants
                            </Typography>
                            {/* <Button color="inherit" onClick={this.handletoggle}>
                                save
                            </Button> */}
                        </Toolbar>
                    </AppBar>
                    <List>
                        {
                            this.state.AppleidStudentList.map((data, index) => (
                                <ListItem button key={index}>
                                    <ListItemText primary={data.username} />
                                    <ListItemText primary={data.email} />
                                    <ListItemText primary={data.education} />
                                    <ListItemText primary={data.experience} />
                                    <ListItemText primary={data.discription} />
                                    
                                </ListItem>
                               
                            ))
                        }
                         <Divider/>
                        {/* <ListItem >
                            <ListItemText primary="Phone ringtone" secondary="Titania" />
                        </ListItem> */}
                        {/* <Divider /> */}
                        {/* <ListItem >
                            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                        </ListItem> */}
                    </List>
                </Dialog>
            </div>
        );
    }
}

ApplicantStudents.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApplicantStudents);
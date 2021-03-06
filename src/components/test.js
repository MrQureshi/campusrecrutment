import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const styles = theme => ({
 
  
  
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: 'Company',
    
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
    console.log(event.target.value)
  };

  render() {

    return (
      <div >
        <FormControl>
          <RadioGroup
           
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="Company" name="user" control={<Radio color="primary" />} label="Company" />
            <FormControlLabel value="Student" name="user" control={<Radio color="primary" />} label="Student" />
           
          </RadioGroup>
        </FormControl>
        
        
        
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
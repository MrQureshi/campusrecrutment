import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter as Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Forgetpassword from './components/Forgetpassword'
import Dashboard from './components/Dashboard'

class App extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        authUser: null,
      };
    }

  render() {
    return (
      
      <Routes>

        <div>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />

          <Route path="/forgetpassword" component={Forgetpassword} />
          <Route exact path="/dashboard" component={Dashboard} />

        </div>
      </Routes>
      

    );
  }
}

export default App;

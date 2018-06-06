import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter as Routes, Route} from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Forgetpassword from './components/Forgetpassword'
import Dashboard from './components/Dashboard'


class App extends Component {
  render() {
    return (
      
        <Routes>
          <div>
            {/* <switch> */}
              <Route exact path="/" component={Login} />
              <Route path="/signup" component={Signup} />

              <Route path="/forgetpassword" component={Forgetpassword} />
              <Route path="/dashboard" component={Dashboard} />
              {/* <Route path="/dashboard" component={Dashboard} /> */}
            {/* </switch> */}
          </div>
        </Routes>
      
    );
  }
}

export default App;

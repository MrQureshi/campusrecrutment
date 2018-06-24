import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// import { firebase } from './firebase';


import { BrowserRouter as Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Forgetpassword from './components/Forgetpassword'
import Companydashboard from './components/CompanyDashboard'
import Studentdashboard from './components/StudentDashboard'
import Admin from './components/Admin'
// import student from './components/StudentDetails'
// import Signout from './components/Signout';
// import { firebase } from '../firebase';
// import Createdjobs from './components/CreatedJobs'
// import Createcv from './components/CreateCV'
// import Mycv from './components/MyCV'
import Cvlist from './components/CvsList'

import test from './components/test'

class App extends Component {
 

  render() {
    return (
      <Routes>

        <div >
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />

          <Route path="/forgetpassword" component={Forgetpassword} />
          <Route exact path="/company" component={Companydashboard} />
          <Route exact path="/student" component={Studentdashboard} />
          <Route exact path="/admin" component={Admin} />
          {/* <Route exact path='/cv' component={Createcv}/> */}
          {/* <Route exact path='/Createdjobs' component={Createdjobs} /> */}
          {/* <Route exact path="/StudentDetails" component={student} /> */}
          {/* <Route exact path="/" component={Signout} /> */}
          {/* <Route exact path="/mycv" component={Mycv}></Route> */}
          <Route exact path="/cvlist" component={Cvlist} />


          <Route exact path="/test" component={test} />

        </div>
      </Routes>


    );
  }
}

export default App;

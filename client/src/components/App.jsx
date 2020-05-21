import React, { useState, useEffect } from 'react';
import './App.css';
import 'devextreme/dist/css/dx.common.css';
import Loginform from './Loginform';
import HomePage from './HomePage';
import Additem from './Additem';
import Searchitems from './SearchItems';
import Viewsalesreport from './Viewsalesreport';
import Createnewlist from './Createnewlist';
import Viewcurrentlists from './Viewcurrentlists';
import Viewcompletedlists from './Veiwcompletedlists';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const Newapp = () => {
    return (
     
    <Router> 
      <Switch>
      <Route path='/' exact component={Loginform}/>
      <Route path='/home/' component={HomePage}/>
      <Route path='/additem/' component={Additem}/>
      <Route path='/searchitems/' component={Searchitems}/>
      <Route path='/viewsalesreport' component={Viewsalesreport}/>
      <Route path='/createnewlist/' component={Createnewlist}/>
      <Route path='/viewcurrentlists/' component={Viewcurrentlists}/>
      <Route path='/viewcompletedlists/' component={Viewcompletedlists}/>
      </Switch>
        <div className='row'>
        </div>
       </Router>  
    );

};

export default Newapp;
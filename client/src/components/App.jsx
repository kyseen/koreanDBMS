import React, { useState, useEffect } from 'react';
import './App.css';
import 'devextreme/dist/css/dx.common.css';
import Loginform from './Loginform';
import HomePage from './HomePage';
import Additem from './Additem';
import Searchitems from './SearchItems';
import Createnewlist from './Createnewlist';
import Viewcurrentlists from './Viewcurrentlists';
import Viewcompletedlists from './Veiwcompletedlists';
import PrintList from './PrintList';
import EditList from './EditList';
import Admin from './Admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (

    <Router>
      <Switch>
        <Route path='/' exact component={Loginform} />
        <Route path='/home/' exact component={HomePage} />
        <Route path='/additem/' exact component={Additem} />
        <Route path='/searchitems/' component={Searchitems} />
        <Route path='/createnewlist/' component={Createnewlist} />
        <Route path='/viewcurrentlists/' component={Viewcurrentlists} />
        <Route path='/viewcompletedlists/' component={Viewcompletedlists} />
        <Route path='/list/print' component={PrintList} />
        <Route path='/list/edit' component={EditList} />
        <Route path='/admin' component={Admin} />
      </Switch>
      <div className='row'>
      </div>
    </Router>
  );

};

export default App;
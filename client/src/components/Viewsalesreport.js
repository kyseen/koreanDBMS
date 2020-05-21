import React from 'react';
import './App.css';
import { useHistory } from "react-router-dom";
import Logout from './Logout';

function Viewsalesreport() {
 
    return (
        <div className='header'>
           <h4 className='white-text'>View Sales Report</h4>
           <Logout/>
        </div>
    );

};

export default Viewsalesreport;
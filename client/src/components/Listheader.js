import React, { useState } from 'react';
import './App.css';
import { useHistory } from "react-router-dom";
import Logout from './Logout';

function Listheader(){
    return (
        <div className='list-header'>
            <div className='list-id'> ID </div>
            <div className='list-item'> Shipping Date </div>
            <div className='list-item'> Arrival Date </div>
            <div className='list-item'> Total Price </div>
        </div>
        
    );
};
export default Listheader;
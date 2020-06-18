import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import Logout from './Logout';
import { useHistory } from "react-router-dom";

function Homepage() {

   const history = useHistory();

   function handleClick(event){
      if(event.target.id==='1'){
         history.push('/additem')
      }
      if(event.target.id==='2'){
         history.push('/searchitems')
      }
      if(event.target.id==='4'){
         history.push('/createnewlist')
      }
      if(event.target.id==='5'){
         history.push('/viewcurrentlists')
      }
      if(event.target.id==='6'){
         history.push('/viewcompletedlists')
      }
   }


    return (
     <div>
        <div className='header'>
           <h4 className='white-text'> Home Page </h4>
        </div>
           <Logout/>
           <div>
               <div className='home-box-1'>
                   <div className='username-password'>
                       <h5>Item Database</h5>
                   </div>
                 <button className='home-box-button'
                 id = '1'
                 onClick={handleClick}>
                    Add Item
                 </button>
                 <button className='home-box-button'
                 id = '2'
                 onClick={handleClick}>
                    Search Items
                 </button>
               </div>
               <div className='home-box-2'>
               <div className='username-password'>
                   <h5>Shipping Lists</h5>
               </div>
               <button className='home-box-button'
               id = '4'
               onClick={handleClick}>
                  Create New List
               </button>
               <button className='home-box-button'
               id = '5'
               onClick={handleClick}>
                   View Current Lists
                 </button>
                 <button className='home-box-button'
                 id = '6'
                 onClick={handleClick}>
                  View Completed Lists
                 </button>
               </div>
           </div>
        </div>
    );

};

export default Homepage;
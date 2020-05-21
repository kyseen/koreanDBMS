import React from 'react';
import './App.css';
import { useHistory } from "react-router-dom";

function Logout() {

    const history = useHistory();

    function handleSubmit(event) {
        history.push('/')
      }

    return (
       <button
       className='logout-button'
       type='button'
       Go loginform
       onClick={handleSubmit}
       >
           Log Out
       </button>
    );

} ;
export default Logout;

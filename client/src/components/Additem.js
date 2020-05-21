import './App.css';
import { useHistory } from "react-router-dom";
import React, { useState, Component } from 'react';
import Logout from './Logout';
import notify from 'devextreme/ui/notify';
const axios = require('axios');

function Additem() {

    const history = useHistory();

    const [barcode, setBarcode] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [weight, setWeight] = useState("");
    const [description, setDesc] = useState("");
    const [error, setError] = useState("");

    function handleClick(event) {
        if (barcode === '' || name === '' || price === '' || weight === '') {
            notify('Could not add items to database', "error");
        } else {

            axios.post('http://localhost:3000/items/additem', {
                barcode, name, price, weight, description
            })
                .catch(err => notify("Item could not be added!", "error"))
                .then(notify("Item Added!", "success"));
            setError('')
            setBarcode('')
            setName('')
            setPrice('')
            setWeight('')
            setDesc('')
        }

    }

    function handleDone(event) {
        history.push('/home')
    }

    return (
        <div className='header'>
            <h4 className='white-text'>Add Item</h4>
            <Logout />
            <div className='additem-box'>
                <div className='gen-text'>
                    <h1>{error}</h1>
                   Barcode Scan:
                   <input className='text-input' id='add-barcode' type='number' value={barcode}
                        onChange={e => setBarcode(e.target.value)} placeholder='must enter'></input>
                </div>
                <div className='gen-text'>
                    Name:
                   <input className='text-input' id='add-name' type='text' value={name}
                        onChange={e => setName(e.target.value)} placeholder='must enter'></input>
                </div>
                <div className='gen-text'>
                    Price (in $):
                   <input className='text-input' id='add-price' type='number' value={price}
                        onChange={e => setPrice(e.target.value)} placeholder='must enter'></input>
                </div>
                <div className='gen-text'>
                    Weight (in kg):
                   <input className='text-input' id='add-weight' type='number' value={weight}
                        onChange={e => setWeight(e.target.value)} placeholder='must enter'></input>
                </div>
                <div className='gen-text'>
                    Description:
                   <input className='text-input' id='add-desc' type='text' value={description}
                        onChange={e => setDesc(e.target.value)} placeholder='optional'></input>
                </div>
                <button className='add-item-button'
                    onClick={handleClick}>
                    Add Item
               </button>
                <button className='add-item-button'
                    onClick={handleDone}>
                    Done
               </button>
            </div>
        </div>
    );

};

export default Additem;

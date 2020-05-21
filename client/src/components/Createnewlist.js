import React, { useState, Component } from 'react';
import './App.css';
import { useHistory } from "react-router-dom";
import Logout from './Logout';
import "react-datepicker/dist/react-datepicker.css";
import DataGrid, {
    Column,
    Pager,
    Paging,
    Button,
    Form,
    Position,
    SearchPanel,
    Editing,
    Popup,
    Sorting
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { TextBox } from 'devextreme-react';
import { Item } from 'devextreme-react/form';
import CustomStore from "devextreme/data/custom_store";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.css';

const axios = require('axios');

const URL = 'http://localhost:3000/api';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

class Createnewlist extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            currentitem: [],
            companyName: "",
            companyAddress: "",
            companyCity: "",
            companyPC: "",
            companyNumber: "",
            itemData: new CustomStore({
                key: 'id',
                load: () => {
                    return fetch(`${URL}/items/available`)
                        .then(handleErrors)
                        .then(response => response.json())
                        .catch(() => { throw 'Network error' })
                },
                update: (key, values) => {
                    const array = [{ id: key, quantity: values.quantity, weight: "0", price: "", name: "" }]
                    return (
                        this.setState({ items: [...this.state.items, ...array] })
                    );
                }
            }),
            refreshMode: 'reshape'
        };
        this.handleRefreshModeChange = this.handleRefreshModeChange.bind(this);
    }
    handleRefreshModeChange(e) {
        this.setState({ refreshMode: e.value });
    }

    render() {
        const { itemData, refreshMode, companyName, companyAddress, companyCity, companyNumber } = this.state;
        const { items } = this.state;
        function handleDone() {
            console.log(items)
            axios.post(`${URL}/list/newlist`, {
                items
            })
                .then(function (response) {
                    alert("Item Added");
                    console.log(response);
                })
                .catch(function (error) {
                    alert(error);
                    console.log(error);
                });
        }
        return (
            <React.Fragment>
                <div className='header'>
                    <h4 className='white-text'>Create New List</h4>
                    <Logout />
                    <div className='create-form-box'>
                        <div className="dx-field">
                            <div className="dx-field-value">
                                <TextBox
                                    value={this.companyName}
                                    showClearButton={true}
                                    width="200px"
                                    placeholder="Company Name"
                                    alignment="left" />
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-value">
                                <TextBox
                                    value={this.companyAddress}
                                    showClearButton={true}
                                    width="200px"
                                    placeholder="Company Address"
                                    alignment="right"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="create-table-box">
                        <DataGrid
                            dataSource={itemData}
                            showBorders={true}
                            repaintChangesOnly={true}
                            key="id" >
                            <Sorting mode="single" />
                            <Editing
                                mode="popup"
                                allowUpdating={true}
                                refreshMode={refreshMode}>
                                <Popup title={this.name} showTitle={false} width={400} height={200}>
                                    <Position my="center" at="center" of={window} />
                                </Popup>
                                <Form>
                                    <Item dataField="name" />
                                    <Item dataField="quantity"
                                        dataType="number" />
                                </Form>
                            </Editing>
                            <SearchPanel
                                visible={true}
                                width={250}
                                placeholder="Search..." />
                            <Paging defaultPageSize={10} />
                            <Pager
                                showPageSizeSelector={true}
                                allowedPageSizes={[10, 15, 20]}
                                showInfo={true} />
                            <Column dataField="id"
                                visible={false} />
                            <Column dataField="barcode"
                                dataType="number"
                                alignment="center" />
                            <Column dataField="name"
                                allowEditing={false} />
                            <Column dataField="description" />
                            <Column dataField="price"
                                dataType="number"
                                caption="Price ($)"
                                format={{ type: 'currency', precision: 2 }} />
                            <Column dataField="weight"
                                dataType="number"
                                caption="Weight (kg)" />
                            <Column dataField="quantity"
                                dataType="number"
                                caption="Added Quantity"
                                defaultSortOrder="asc" />
                            <Column type="buttons">
                                <Button name="edit" />
                                <Button text="A"
                                    onClick={handleDone} />
                            </Column>
                        </DataGrid>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}


export default Createnewlist;

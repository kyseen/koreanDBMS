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
import notify from 'devextreme/ui/notify';

const axios = require('axios');

const URL = 'https://us-central1-korean-export-dbms.cloudfunctions.net/app';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

class Createnewlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            currentitem: [],
            companyname: "",
            companyaddress: "",
            itemData: new CustomStore({
                key: 'id',
                load: () => {
                    return fetch(`${URL}/api/items/available`)
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

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        const { itemData, refreshMode } = this.state;
        const { companyname, address } = this.state;
        const { items } = this.state;

        function handleDone() {
            if (companyname == null || address == null || items == null) {
                notify("Either Company Name, Address or items is null", "error")
            }
            else {
                axios.post(`${URL}/api/list/newlist`, {
                    companyname, address, items
                })
                    .then(function (response) {
                        notify("List Created", 'success');
                        window.location.replace('https://korean-export-dbms.web.app/home')
                    })
                    .catch(function (error) {
                        notify(error, 'error');
                        console.log(error);
                    });

            }

        }
        return (
            <React.Fragment>
                <div className='header'>
                    <h4 className='white-text'>Create New List</h4>
                    <Logout />
                    <div className='create-form-box'>
                        <div className="dx-field">
                            <div className="dx-field-value">
                                <label for="companyname">Company Name</label>
                                <input type="text" value={companyname} onChange={this.onChange} class="form-control" id="companyname" placeholder="Company Name"></input>
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-value">
                                <label for="companyname">Address</label>
                                <input type="text" value={address} onChange={this.onChange} class="form-control" id="address" placeholder="Address"></input>
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
                            </Column>
                        </DataGrid>
                    </div>
                    <div>
                        <button className='add-item-button'
                            onClick={handleDone}>
                            Add List
                    </button>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}


export default Createnewlist;

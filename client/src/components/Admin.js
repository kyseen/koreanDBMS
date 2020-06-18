import React, { Component } from "react";
import Moment from 'react-moment';
import DataGrid, {
    Column,
    Editing,
    Position,
    Form,
    Popup
} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import './App.css';
import Logout from './Logout';
import CustomStore from "devextreme/data/custom_store";
import notify from 'devextreme/ui/notify';
const axios = require('axios');


//const URL = 'http://localhost:5001/korean-export-dbms/us-central1/app';
const URL = 'https://us-central1-korean-export-dbms.cloudfunctions.net/app'

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            itemData: new CustomStore({
                key: '_id',
                load: () => {
                    return fetch(`${URL}/api/user`)
                        .then(handleErrors)
                        .then(response => response.json())
                        .catch(() => { throw 'Network error' })
                },
                insert: (values) => {
                    return fetch(`${URL}/api/user/add`, {
                        method: "POST",
                        body: JSON.stringify(values),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(handleErrors)
                        .catch(err => notify("User was not added! Remember Username needs to be unique", "error"))
                        .then(notify("User was added!", "success"));

                },
                update: (key, values) => {
                    return fetch(`${URL}/api/user/update/${key}`, {
                        method: "PUT",
                        body: JSON.stringify(values),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(handleErrors)
                        .catch(err => notify("User could not be updated! Unique username required", "error"))
                        .then(notify("User updated!", "success"));
                }
            }),
            refreshMode: 'full'
        };
    }

    password_cover(cellInfo) {
        return '***********';
    }

    render() {
        const { refreshMode, itemData } = this.state;
        return (
            <React.Fragment>

                <div className="create-table-box">
                    <Logout />
                    <h2 align="center"
                    >Admin Portal</h2>
                </div>
                <DataGrid
                    dataSource={itemData}
                    showBorders={true}
                    repaintChangesOnly={true}
                    keyExpr="_id" >
                    <Editing
                        mode="popup"
                        allowUpdating={true}
                        allowAdding={true}
                        refreshMode={refreshMode}>
                        <Popup title='User Information' showTitle={true} width={700} height={525}>
                            <Position my="center" at="center" of={window} />
                        </Popup>
                        <Form>
                            <Item dataField="username" />
                            <Item dataField="password" />
                        </Form>
                    </Editing>
                    <Column dataField="_id"
                        alignment="center"
                        allowEditing={false}
                        caption="User Object ID" />
                    <Column dataField="username" />
                    <Column dataField="password"
                        customizeText={this.password_cover} />
                    <Column dataField="signUpDate"
                        dataType="date"
                        format="dd/MM/yyyy" />
                </DataGrid>
            </React.Fragment>
        )
    }

}

export default Admin;

import './App.css';
import Logout from './Logout';
import React, { useState, Component } from 'react';
import DataGrid, {
    Column,
    Pager,
    Paging,
    Editing,
    Form,
    Popup,
    Position,
    SearchPanel,
    Export
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
import CustomStore from "devextreme/data/custom_store";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.css';
import notify from 'devextreme/ui/notify';

const URL = 'http://localhost:3000/api';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

class Searchitems extends Component {
    constructor() {
        super();
        this.state = {
            itemData: new CustomStore({
                key: 'id',
                load: () => {
                    return fetch(`/api/items`)
                        .then(handleErrors)
                        .then(response => response.json())
                        .catch(() => { throw 'Network error' })
                },
                insert: (values) => {
                    return fetch(`${URL}/items/additem`, {
                        method: "POST",
                        body: JSON.stringify(values),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(handleErrors)
                        .catch(err => notify("Item could not be added!", "error"))
                        .then(notify("Item Added!", "success"));

                },
                update: (key, values) => {
                    return fetch(`${URL}/items/update/${key}`, {
                        method: "PUT",
                        body: JSON.stringify(values),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(handleErrors)
                        .catch(err => notify("Item could not be updated!", "error"))
                        .then(notify("Item Updated!", "success"));
                }
            }),
            refreshMode: 'full'
        };
        this.handleRefreshModeChange = this.handleRefreshModeChange.bind(this);
    }

    handleDone = (e) => {
        this.props.history.push('/home');
    }

    handleRefreshModeChange(e) {
        this.setState({ refreshMode: e.value });
    }

    render() {
        const { refreshMode, itemData } = this.state;
        return (
            <React.Fragment>
                <div className="create-table-box">
                    <h2 align="center"
                    >Item Database</h2>
                    <DataGrid
                        dataSource={itemData}
                        showBorders={true}
                        repaintChangesOnly={true}
                        keyExpr="id" >
                        <Editing
                            mode="popup"
                            allowUpdating={true}
                            allowAdding={true}
                            refreshMode={refreshMode}>
                            <Popup title='Item Information' showTitle={true} width={700} height={525}>
                                <Position my="center" at="center" of={window} />
                            </Popup>
                            <Form>
                                <Item itemType="group" colCount={3} colSpan={2}>
                                    <Item dataField="barcode" />
                                    <Item dataField="name" />
                                </Item>
                                <Item itemType="group" colCount={3} colSpan={2}>

                                    <Item dataField="price" />
                                    <Item dataField="weight" />
                                    <Item dataField="isAvailable"
                                        dataType="boolean" />
                                    <Item
                                        dataField="description"
                                        editorType="dxTextArea"
                                        colSpan={3}
                                        editorOptions={{ height: 100 }} />
                                </Item>
                            </Form>
                        </Editing>
                        <Export enabled={true} fileName="DatabaseItems" allowExportSelectedData={false} />
                        <SearchPanel
                            visible={true}
                            width={250}
                            placeholder="Search..." />
                        <Paging defaultPageSize={5} />
                        <Pager
                            showPageSizeSelector={true}
                            allowedPageSizes={[5, 10, 20]}
                            showInfo={true} />
                        <Column dataField="id"
                            dataType="number"
                            alignment="center"
                            allowEditing={false}
                            caption="Item ID" />
                        <Column dataField="barcode"
                            dataType="number"
                            alignment="center" />
                        <Column dataField="name" />
                        <Column dataField="description" />
                        <Column dataField="price"
                            dataType="number"
                            caption="Price ($)"
                            format={{ type: 'currency', precision: 2 }} />
                        <Column dataField="weight"
                            dataType="number"
                            caption="Weight (kg)" />
                        <Column dataField="isAvailable"
                            caption="Is Available"
                            alignment="center"
                            dataType="boolean" />
                    </DataGrid>
                </div>
                <div>
                    <button className='add-item-button'
                        onClick={this.handleDone}>
                        Done
               </button>

                </div>
            </React.Fragment>

        );
    }
}

export default Searchitems;

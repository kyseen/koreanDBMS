import React, { Component } from 'react';
import './App.css';
import notify from 'devextreme/ui/notify';
import Moment from 'react-moment';
import DataGrid, {
    Column,
    Pager,
    Paging,
    SearchPanel,
    MasterDetail,
    Selection,
    Summary,
    TotalItem,
    Lookup,
    Editing,
    Popup,
    Position,
    Form,
    Sorting,
    Button,
    Export
} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import CustomStore from "devextreme/data/custom_store";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.css';
const URL = 'https://us-central1-korean-export-dbms.cloudfunctions.net/app';


function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function renderDetail(props) {
    let { items = [], address, companyname } = props.data;

    return (
        <div align="center">
            <h6>Company: {companyname}</h6>
            <h6>Delivery Address: {address}</h6>
            <DataGrid
                dataSource={items}
                width="50%"
                align-items="center"
                showBorders={true}>
                <Column dataField="name" />
                <Column dataField="quantity" />
                <Column dataField="weight" />
                <Column dataField="price" />
                <Summary>
                    <TotalItem
                        column="quantity"
                        summaryType="sum"
                        displayFormat={'Total Quantity: {0}'} />
                    <TotalItem
                        column="weight"
                        summaryType="sum"
                        displayFormat={'Total Weight (kg): {0}'}
                        valueFormat={{ type: 'fixedPoint', precision: 2 }} />
                    <TotalItem
                        column="price"
                        summaryType="sum"
                        displayFormat={'Total Price: {0}'}
                        valueFormat={{ type: 'currency', precision: 2 }} />
                </Summary>
            </DataGrid>
        </div>

    );
}

const company = new CustomStore({
    key: '_id',
    loadMode: 'raw',
    load: () => {
        return fetch(`${URL}/api/tracking`)
            .then(handleErrors)
            .then(response => response.json())
            .catch((err) => { throw 'Network error' })
    }
});

class Viewcurrentlists extends Component {
    constructor() {
        super();
        this.state = {
            listData: new CustomStore({
                key: 'id',
                loadMode: 'raw',
                load: () => {
                    return fetch(`${URL}/api/list`)
                        .then(handleErrors)
                        .then(response => response.json())
                        .catch(() => { throw 'Network error' })
                },
                update: (key, values) => {
                    return fetch(`${URL}/api/list/update/${key}`, {
                        method: "PUT",
                        body: JSON.stringify(values),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(handleErrors);
                },
                remove: (key) => {
                    return fetch(`${URL}/api/list/delete/${key}`, {
                        method: "DELETE"
                    }
                    )
                }
            }),
            refreshMode: 'full'
        };
    }

    trackingwebsite(props) {
        let { trackingNumber, trackingCompany } = props.row.data;

        if (trackingNumber.length === 0) {
            notify("No Tracking Number", "error")
        }
        else
            company.byKey(trackingCompany).then(
                (company) => { window.open(`${company.websiteurl}${trackingNumber}`) },
                (error) => { notify("Erorr finding company", "error") }
            );
    }
    print = (props) => {
        this.props.history.push({
            pathname: `/list/print/${props.row.data.id}`,
            data: props.row.data
        })
    }

    edit = (props) => {
        this.props.history.push({
            pathname: `/list/edit/${props.row.data.id}`,
            data: props.row.data
        })
    }


    render() {
        const { listData } = this.state;
        const { refreshMode } = this.state;

        return (
            <React.Fragment>
                <div className="create-table-box">
                    <h2 align="center"
                    >Current Shipping Lists</h2>
                </div>
                <DataGrid
                    keyExpr="id"
                    dataSource={listData}
                    showBorders={true}>
                    <Editing
                        mode="popup"
                        allowDeleting={true}
                        allowUpdating={true}
                        refreshMode={refreshMode}>
                        <Popup title="Shipping List Edit" showTitle={true} width={600} height={600}>
                            <Position my="center" at="center" of={window} />
                        </Popup>
                        <Form>
                            <Item dataField="companyname" />
                            <Item dataField="address" />
                            <Item dataField="packingDate" />
                            <Item dataField="shippingDate" />
                            <Item dataField="trackingCompany" />
                            <Item dataField="trackingNumber" />
                            <Item dataField="shippingWeight" />
                            <Item dataField="complete" />
                        </Form>
                    </Editing>
                    <Selection mode="single" />
                    <Sorting mode="single" />
                    <Export enabled={true} fileName="Current_Shipping_List" allowExportSelectedData={false} />
                    <MasterDetail enabled={true} render={renderDetail} />
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
                        caption="List ID" />
                    <Column dataField="companyname"
                        caption="Company Name" />
                    <Column dataField="address"
                        visible={false} />
                    <Column dataField="packingDate"
                        dataType="date"
                        format="dd/MM/yyyy" />
                    <Column dataField="totalquantity"
                        caption="Total Quantity" />
                    <Column dataField="totalprice"
                        dataType="number"
                        caption="Total Price ($)"
                        format={{ type: 'currency', precision: 2 }} />
                    <Column dataField="shippingWeight"
                        dataType="number"
                        caption="Total Weight (kg)" />
                    <Column dataField="trackingCompany" caption="TrackingCompany">
                        <Lookup dataSource={company} valueExpr="_id" displayExpr="companyName" />
                    </Column>
                    <Column dataField="trackingNumber" />
                    <Column dataField="shippingDate"
                        dataType="date"
                        format="dd/MM/yyyy" />
                    <Column dataField="complete"
                        dataType="boolean" />
                    <Column type="buttons">
                        <Button name="edit" />
                        <Button text="T"
                            onClick={this.trackingwebsite} />
                        <Button text="P"
                            onClick={this.print} />
                        <Button text="E"
                            onClick={this.edit} />
                        <Button name="delete" />
                    </Column>
                </DataGrid>
            </React.Fragment>
        );
    }
}

export default Viewcurrentlists;
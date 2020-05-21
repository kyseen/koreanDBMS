import React, { useState, Component } from 'react';
import './App.css';
import Logout from './Logout';
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
   Sorting,
   FilterRow,
   Export
} from 'devextreme-react/data-grid';
import CustomStore from "devextreme/data/custom_store";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.css';
const URL = 'http://localhost:3000/api';

function handleErrors(response) {
   if (!response.ok) {
      throw Error(response.statusText);
   }
   return response;
}

function renderDetail(props) {
   let { items = [], address, companyname, company } = props.data;
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

class Viewcompletedlists extends Component {
   constructor() {
      super();
      this.state = {
         selectedItemKeys: [],
         selectTextOnEditStart: true,
         startEditAction: 'dblClick',
         listData: new CustomStore({
            key: 'id',
            loadMode: 'raw',
            load: () => {
               return fetch(`${URL}/list/completed`)
                  .then(handleErrors)
                  .then(response => response.json())
                  .catch(() => { throw 'Network error' })
            },
            update: (key, values) => {
               return fetch(`${URL}/list/update/${key}`, {
                  method: "PUT",
                  body: JSON.stringify(values),
                  headers: {
                     'Content-Type': 'application/json'
                  }
               }).then(handleErrors);
            }
         }),
         company: new CustomStore({
            key: '_id',
            loadMode: 'raw',
            load: () => {
               return fetch(`${URL}/tracking`)
                  .then(handleErrors)
                  .then(response => response.json())
                  .catch(() => { throw 'Network error' })
            }
         }),
         refreshMode: 'full'
      };
   }

   render() {
      const { listData } = this.state;
      const { company } = this.state;

      return (
         <React.Fragment>
            <div className="create-table-box">
               <h2 align="center"
               >Completed Shipping Lists</h2>
            </div>
            <DataGrid
               keyExpr="id"
               dataSource={listData}
               showBorders={true}
               repaintChangesOnly={true}
               onSelectionChanged={this.selectionChanged}
               onSelectionChanged={this.selectionChangedEdit}
               onContentReady={this.contentReady}>
               <Sorting mode="single" />
               <Export enabled={true} fileName="Completed_Shipping_List" allowExportSelectedData={false} />
               <FilterRow visible={true} />
               <Selection mode="single" />
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
               <Column dataField="packingDate"
                  dataType="date"
                  format="dd/MM/yyyy" />
               <Column dataField="totalquantity"
                  caption="Total Quantity" />
               <Column dataField="totalprice"
                  dataType="number"
                  caption="Total Price ($)"
                  format={{ type: 'currency', precision: 2 }} />
               <Column dataField="totalweight"
                  dataType="number"
                  caption="Total Weight (kg)" />
               <Column dataField="trackingCompany" caption="TrackingCompany">
                  <Lookup dataSource={company} valueExpr="_id" displayExpr="companyName" />
               </Column>
               <Column dataField="trackingNumber" />
               <Column dataField="shippingDate"
                  dataType="date"
                  format="dd/MM/yyyy" />
            </DataGrid>
         </React.Fragment>
      );
   }
}

export default Viewcompletedlists;
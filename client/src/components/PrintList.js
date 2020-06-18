import React, { Component } from "react";
import Moment from 'react-moment';
import DataGrid, {
    Column,
    Summary,
    TotalItem
} from 'devextreme-react/data-grid';
import './App.css';

class PrintList extends Component {

    renderWeight = (weight) => {
        if (weight === 0) {
            return ""
        }
        else {
            return `${weight} kg`;
        }
    }

    print() {
        window.print();
    }

    render() {
        const { data } = this.props.location;
        return (
            <React.Fragment>
                <br></br>
                <div class="no-printme">
                    <button className='print-button' onClick={this.print}>PRINT</button>
                </div>
                <br></br>
                <div className="printback">
                    <div>
                        <h4>Order ID: {data.id}</h4>
                        <h5>Company Name: {data.companyname}</h5>
                        <h5>Address: {data.address}</h5>
                        <br></br>
                        <br></br>
                        <h5>Shipping Date: <Moment format="DD/MM/YYYY">{data.shippingDate}</Moment></h5>
                        <h5>Shipping Weight: {this.renderWeight(data.totalweight)}</h5>
                        <br></br>
                        <DataGrid
                            dataSource={data.items}
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
                </div>
                
            </React.Fragment>

        );
    }
}

export default PrintList;
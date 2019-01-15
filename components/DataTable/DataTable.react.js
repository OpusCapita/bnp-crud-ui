import React, { Component } from 'react';
import request from 'superagent';

import { Components } from '@opuscapita/service-base-ui';

import DataTableBody from './DataTableBody';
import DataTableHeader from './DataTableHeader';
import DataTableSearchBar from './DataTableSearchBar';

import './DataTable.css';
//import './BootstrapOverwrite.css';

class DataTable extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        this.state = {
            tableData: [],
            showNumberOfRows: 10
        }

        this.handleAmountChange = this.handleAmountChange.bind(this);
    }

    loadData = () =>
    {
        const url = this.props.dataUrl;

        request.get(url).then(response =>
        {
            this.setState({
                tableData: response.body
            }) 
        })
        .catch(errors => null);
    }

    transformData = (content) => 
    {
        let result = [];
        for(let field in content) {
            result.push({field, value: (content[field] || "").toString()});
        }
        return result;
    }

    handleAmountChange = (event) => 
    {
        this.setState({
            showNumberOfRows: event.target.value
        });
    }
    
    componentDidMount = () => 
    {
        this.loadData();
    }

    render = () =>
    {
        const tableData = this.state.tableData;

        console.log(tableData);

        return(
            <div className="dataTableArea">
                <DataTableSearchBar />
                {
                    <div className="dataTableContent">
                        <table className="table table-striped table-hover table-bordered dataTableView">
                            <DataTableHeader headerData={this.transformData(tableData[0])}/>
                            <DataTableBody tableData={tableData} numberOfRows={this.state.showNumberOfRows} position={0} />
                        </table>
                    </div>
                }
                <div className="dataTablePagination">
                <div className="leftArrow">
                    <i className="glyphicon glyphicon-chevron-left"></i>
                </div>
                <div className="showPosition">
                    <span className="form-inline">
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-addon">Page 1 - Showing</div>
                                <select value={this.state.showNumberOfRows} onChange={this.handleAmountChange} className="form-control">
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <div className="input-group-addon">/ {tableData.length}</div>
                            </div>
                        </div>
                    </span>
                </div>
                <div className="rightArrow">
                    <i className="glyphicon glyphicon-chevron-right"></i>
                </div>
            </div>
            </div>
        );
    }
}

export default DataTable;
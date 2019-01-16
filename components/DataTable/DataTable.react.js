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

        this.state = 
        {
            tableData: [],
            showNumberOfRows: 10,
            currentPosition: 0,
            currentPage: 1
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

        for(let field in content) 
        {
            result.push({
                field, value: (content[field] || "").toString()
            });
        }

        return result;
    }

    handleAmountChange = (event) => 
    {
        this.setState({
            showNumberOfRows: parseInt(event.target.value)
        });
    }

    showPrevPage = () => 
    {
        this.setState({
            currentPosition: this.state.currentPosition - this.state.showNumberOfRows,
            currentPage: this.state.currentPage - 1
        }) 
    }
    
    showNextPage = () => 
    {
        this.setState({
            currentPosition: this.state.currentPosition + this.state.showNumberOfRows,
            currentPage: this.state.currentPage + 1
        }) 
    }

    showCurrentPage = (tableLength) => 
    {
        const shownRows = this.state.showNumberOfRows;
        const position = this.state.currentPosition;

        let minPosition = this.state.currentPosition + 1;
        let maxPosition = this.state.currentPosition + this.state.showNumberOfRows;
        
        let numberOfAvailiblePages = tableLength / this.state.showNumberOfRows;

        return (
            <div className="dataTablePagination">
                {
                    (Math.min(tableLength, Math.max(position, 0)) > 0) ? 
                    (
                        <div className="leftArrow" onClick={this.showPrevPage}>
                            <i className="glyphicon glyphicon-chevron-left"></i>
                        </div>
                    )
                    :
                    (
                        <div className="rightArrow inactive">
                            <i className="glyphicon glyphicon-chevron-left"></i>
                        </div>
                    )
                }
                <div className="showPosition">
                    <span className="form-inline">
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <span>
                                        <b>Page {this.state.currentPage} of {numberOfAvailiblePages}</b>&nbsp;
                                        ({minPosition} - {maxPosition})
                                    </span>
                                </div>

                                <select 
                                    className="form-control"
                                    value={shownRows} 
                                    onChange={this.handleAmountChange} 
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                    <option value={250}>250</option>
                                </select>

                                <div className="input-group-addon">/ {tableLength}</div>
                            </div>
                        </div>
                    </span>
                </div>
                {
                    (Math.min(tableLength, Math.max(maxPosition, 0)) < (tableLength)) ? 
                    (
                        <div className="rightArrow" onClick={this.showNextPage}>
                            <i className="glyphicon glyphicon-chevron-right" ></i>
                        </div>
                    )
                    :
                    (
                        <div className="rightArrow inactive">
                            <i className="glyphicon glyphicon-chevron-right"></i>
                        </div>
                    )
                }
            </div>
        );

    }
    
    componentDidMount = () => 
    {
        this.loadData();
    }

    render = () =>
    {
        const tableData = this.state.tableData;

        return(
            <div className="dataTableContainer">
                <DataTableSearchBar />
                {
                    <div className="dataTableContent">
                        <table 
                            className={`table ${this.props.striped ? 'table-striped' : ''} table-hover table-bordered dataTableView`}
                        >
                            <DataTableHeader 
                                headerData={this.transformData(tableData[0])}
                            />
                            <DataTableBody 
                                tableData={tableData} 
                                numberOfRows={this.state.showNumberOfRows} 
                                position={this.state.currentPosition} 
                            />
                        </table>
                    </div>
                }
                {this.showCurrentPage(tableData.length)}
            </div>
        );
    }
}

export default DataTable;
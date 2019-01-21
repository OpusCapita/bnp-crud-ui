import React, { Component } from 'react';
import request from 'superagent';

import { Components } from '@opuscapita/service-base-ui';


import DataTableBody from './DataTableBody';
import DataTableHeader from './DataTableHeader';
import DataTablePagination from './DataTablePagination';

import './DataTable.css';

class DataTable extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        this.state = 
        {
            tableData: [],
            showNumberOfRows: 10,
            currentPosition: 0
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
        }) 
    }
    
    showNextPage = () => 
    {
        this.setState({
            currentPosition: this.state.currentPosition + this.state.showNumberOfRows,
        }) 
    }
    
    componentDidMount = () => 
    {
        this.loadData();
    }

    render = () =>
    {
        const tableData = this.state.tableData;

        return(
            <div>
            <section className="dataTableContainer">
                {/* <DataTableSearchBar /> */}
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
        </section>
        <br />
        <DataTablePagination 
            tableLength={tableData.length}
            shownRowsAmount={this.state.showNumberOfRows}
            currentPosition={this.state.currentPosition}
            currentPage={this.state.currentPage}
            prevButtonClicked={this.showPrevPage.bind(this)}
            nextButtonClicked={this.showNextPage.bind(this)}
            shownRowsAmountChanged={this.handleAmountChange.bind(this)}
        />
        </div>
        );
    }
}

export default DataTable;
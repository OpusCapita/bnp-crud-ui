import React, { Component } from 'react';
import request from 'superagent';

import { Components } from '@opuscapita/service-base-ui';

import DataTableBody from './DataTableBody';
import DataTableHeader from './DataTableHeader';
import DataTableSearchBar from './DataTableSearchBar';
import DataTablePagination from './DataTablePagination';

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
                            <DataTableBody tableData={tableData} showAmount={this.state.showNumberOfRows} position={0} />
                        </table>
                    </div>
                }
                <DataTablePagination length={tableData.length} />
            </div>
        );
    }
}

export default DataTable;
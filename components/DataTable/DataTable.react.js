
import React, { Component } from 'react';
import request from 'superagent';

import { Components } from '@opuscapita/service-base-ui';

import DataTableBody from './DataTableBody';
import DataTableHeader from './DataTableHeader';
import DataTableView from './DataTableView';
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
            tableData: []
        }
    }

    loadTestData()
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

    componentDidMount () 
    {
        this.loadTestData();
    }

    render()
    {
        const tableData = this.state.tableData;

        return(
            <div className="dataTableArea">
                <DataTableSearchBar />
                {
                    <div className="dataTableContent">
                        <DataTableView>
                            <DataTableHeader headerData={tableData[0]}/>
                            <DataTableBody tableData={tableData} showAmount={100}/>
                        </DataTableView>
                    </div>
                }
                <DataTablePagination length={tableData.length} />
            </div>
        );
    }
}

export default DataTable;
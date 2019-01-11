
import React, { Component } from 'react';
import request from 'superagent';

import { Components } from '@opuscapita/service-base-ui';

import DataTableBody from './DataTableBody';
import DataTableColumn from './DataTableColumn';
import DataTableFooter from './DataTableFooter';
import DataTableHeader from './DataTableHeader';
import DataTableRow from './DataTableRow';
import DataTableView from './DataTableView';

import './DataTable.css';

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
            <div>
                {
                <DataTableView>
                    {/*<DataTableHeader columnData={userData}/>*/}
                    <DataTableBody>
                        
                    {
                        tableData.map((row, i) => 
                        {
                            return(
                                <DataTableRow rowData={row} />
                            )
                        })
                    }
                    </DataTableBody>
                    <DataTableFooter/>
                </DataTableView>
                }
            </div>
        );
    }
}

export default DataTable;
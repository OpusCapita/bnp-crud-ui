
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
                    <DataTableHeader headerData={tableData[0]}/>
                    <DataTableBody>
                        
                    {
                        tableData.map((row, i) => 
                        {
                            if(i >= 0 && i < 10) {
                            return(
                                <DataTableRow rowData={row} />
                            )
                        }
                        })
                    }
                    </DataTableBody>
                    <DataTableFooter>
                        <tr>
                            <td colSpan={tableData.length}>

                                <div className="tableDataPagination">
                                    <span>❮</span>
                                    <span>{tableData.length / 5} / {tableData.length}</span>
                                    <span>❯</span>
                                </div>
                            
                            </td>
                        </tr>
                    </DataTableFooter>
                </DataTableView>
                }
            </div>
        );
    }
}

export default DataTable;
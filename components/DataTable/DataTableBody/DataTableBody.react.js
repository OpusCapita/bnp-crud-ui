
import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

import DataTableRow from '../DataTableRow';

class DataTableBody extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        this.state = {
            amount: this.props.showAmount || 10
        }
    }

    render()
    {
        let tableData = this.props.tableData;

        return(
            <tbody className="dataTableBody">
                {
                    tableData.map((row, i) => 
                    {
                        if(i >= 0 && i < this.state.amount)
                        {
                            return(
                                <DataTableRow key={i} rowNum={i} rowData={row} />  
                            )
                        }
                    })
                }
            </tbody>
        )
    }
}

export default DataTableBody;
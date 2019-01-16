/* 
    DataTableBody
    --------------------------------------------------------------
    - Rendering of selected amount of DataTableRows
    - Sorting of DataTableRows
    - Showing element pages according to amount of DataTableRows
*/

import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

import DataTableRow from '../DataTableRow';

class DataTableBody extends Components.ContextComponent
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            position: this.props.position || 0
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
                        if(i >= this.props.position && i < (this.props.position + this.props.numberOfRows))
                        {
                            return(
                                <DataTableRow 
                                    key={i} 
                                    rowNum={i} 
                                    rowData={row} 
                                    isLocked={i === 2 ? true : false}
                                />  
                            )
                        }
                    })
                }
            </tbody>
        )
    }
}

export default DataTableBody;
/* 
    DataTableBody
    ------------------------------------------------------------
    - Rendering of selected amount of DataTableRows
    - Sorting of DataTableRows
    - Showing element pages according to amount of DataTableRows
*/

import React from 'react';

import { Components } from '@opuscapita/service-base-ui';

import DataTableRow from '../DataTableRow';

import './DataTableBody.less';

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
        const tableData = this.props.tableData;
        const checkShowingAmount = this.props.position + this.props.numberOfRows;
        const lockedRows = this.props.lockedRows;

        return(
            <tbody className="dataTableBody">
                {
                    tableData
                        .map((row, i) =>
                    {
                        return(
                            <DataTableRow
                                key={ i }
                                rowNum={ i }
                                rowData={ row }
                                isLocked={ (lockedRows.indexOf(i) != -1) ? true : false }
                                isHidden={ (i >= this.props.position) && (i < checkShowingAmount) ? false : true }
                            />
                        )
                    })
                }
            </tbody>
        )
    }
}

export default DataTableBody;

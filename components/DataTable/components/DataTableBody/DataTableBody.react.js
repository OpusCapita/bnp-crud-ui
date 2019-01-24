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
    static defaultProps =
    {
        position: 0
    }

    constructor(props)
    {
        super(props);

        this.state =
        {
            position: this.props.position
        }
    }

    render()
    {
        const tableData = this.props.tableData;

        const checkShowingAmount = this.props.position + this.props.numberOfRows;

        return(
            <tbody className="dataTableBody">
                {
                    tableData
                        .map((row, i) =>
                    {
                        return(
                            <DataTableRow
                                key={i}
                                rowNum={i}
                                rowData={row}
                                isLocked={i === 2 ? true : false}
                                isHidden={(i >= this.props.position) && (i < checkShowingAmount) ? false : true}
                            />
                        )
                    })
                }
            </tbody>
        )
    }
}

export default DataTableBody;

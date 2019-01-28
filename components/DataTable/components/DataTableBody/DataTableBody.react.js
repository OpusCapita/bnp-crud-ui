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
            sortedTableData: [  ],
            position: this.props.position || 0,
            lockedRowField: this.props.lockedRows.field || "id",
            lockedRowValues: this.props.lockedRows.value || [  ]
        }
    }

    sortData = (dataBody, dataKey, dataSorting) => 
    {   
        let dataList = Object
        .keys(dataBody)
        .filter(key => dataBody[key][dataKey])
        .map(key => dataBody[key]);
        
        if(dataSorting === "ascd")
        {
            dataList.sort((a, b) => a[dataKey].localeCompare(b[dataKey]));
        }
        else if(dataSorting === "desc")
        {
            dataList.sort((a, b) => b[dataKey].localeCompare(a[dataKey]));
        }

        return dataList
    }

    componentDidMount = () =>
    {
        this.setState({
            sortedTableData: this.sortData(this.props.tableData, this.props.currentlySorted, "ascd")
        })
    }

    componentWillReceiveProps = (nextprops) => 
    {
        this.setState({
            sortedTableData: this.sortData(this.props.tableData, nextprops.currentlySorted, "ascd")
        });
    }

    render()
    {
        const checkShowingAmount = this.props.position + this.props.numberOfRows;
        const lockedRows = this.props.lockedRows;

        const usedData = this.state.sortedTableData;

        return(
            <tbody className="dataTableBody">
                {
                    usedData.map((row, i) =>
                    {
                        return(
                            <DataTableRow
                                key={ i }
                                rowNum={ i }
                                rowData={ row }
                                isLocked={ (this.state.lockedRowValues.indexOf(row[this.state.lockedRowField]) != -1) ? true : false }
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

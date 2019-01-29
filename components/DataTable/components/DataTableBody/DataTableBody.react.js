/* 
    DataTableBody
    ------------------------------------------------------------
    - Rendering of selected amount of DataTableRows
    - Sorting of DataTableRows
    - Showing element pages according to amount of DataTableRows
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';

import DataTableRow from '../DataTableRow';
import './DataTableBody.less';

export default class DataTableBody extends Components.ContextComponent
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            sortedTableData: this.props.tableData,
            position: this.props.position,
            lockedRowField: this.props.lockedRows.field,
            lockedRowValues: this.props.lockedRows.value
        }
    }

    static propTypes =
    {
        currentlySorted: PropTypes.string.isRequired,
        tableData: PropTypes.array.isRequired,
        numberOfRows: PropTypes.number.isRequired,
        position: PropTypes.number.isRequired,
        lockedRows: PropTypes.object.isRequired,
        lockedColumns: PropTypes.array.isRequired,
        notEmptyColumns: PropTypes.array.isRequired
    }

    static defaultProps =
    {
        currentlySorted: [  ],
        tableData: [  ],
        numberOfRows: 10,
        position: 0,
        lockedRows: [ { field: "id", value: [  ] } ],
        lockedColumns: [  ],
        notEmptyColumns: [  ]
    }

    sortData = (dataKey, dataSorting) => 
    {   
        const dataBody = this.props.tableData;
        
        let dataList = Object
        .keys(dataBody)
        .filter(key => dataBody[ key ][ dataKey ])
        .map(key => dataBody[ key ]);
        
        if(dataSorting === "ascd")
        {
            dataList.sort((a, b) => a[ dataKey ].localeCompare(b[ dataKey ]));
        }
        else if(dataSorting === "desc")
        {
            dataList.sort((a, b) => b[ dataKey ].localeCompare(a[ dataKey ]));
        }

        return dataList
    }

    componentDidMount = () =>
    {
        this.setState({
            sortedTableData: this.sortData(this.props.currentlySorted, "ascd")
        })
    }

    componentWillReceiveProps = (nextProps) =>
    {
        if(nextProps.currentlySorted !== this.props.currentlySorted)
        {
            this.setState({
                sortedTableData: this.sortData(nextProps.currentlySorted, "ascd")
            });
        }
    }

    render()
    {
        const { position, numberOfRows, lockedColumns, notEmptyColumns } = this.props;
        const { sortedTableData, lockedRowField, lockedRowValues } = this.state;

        const checkShowingAmount = position + numberOfRows;
        const sortedData = sortedTableData;

        return(
            <tbody className="dataTableBody">
                {
                    sortedData.map((row, i) =>
                    {
                        return(
                            <DataTableRow
                                key={ i }
                                rowNum={ i }
                                rowData={ row }
                                isLocked={ (lockedRowValues.indexOf(row[ lockedRowField ]) != -1) ? true : false }
                                isHidden={ (i >= position) && (i < checkShowingAmount) ? false : true }
                                lockedColumns={ lockedColumns }
                                notEmptyColumns={ notEmptyColumns }
                            />
                        )
                    })
                }
            </tbody>
        )
    }
}

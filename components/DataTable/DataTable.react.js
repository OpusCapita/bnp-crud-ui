import React from 'react';
import request from 'superagent';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';

import DataTableHeader from './components/DataTableHeader';
import DataTableMenu from './components/DataTableMenu';
import DataTablePagination from './components/DataTablePagination';
import './DataTable.less';
import DataTableRow from './components/DataTableRow';

export default class DataTable extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);
        
        this.state =
        {
            tableData: [  ],
            sortedTableData: [  ],
            tableHeaderData: [  ],
            showNumberOfRows: this.props.shownRows,
            currentPosition: 0,
            currentSorting: this.props.initiallySortedColumn
        }
    }

    static propTypes =
    {
        dataUrl: PropTypes.string.isRequired,
        styles: PropTypes.object.isRequired,
        shownRows: PropTypes.number.isRequired,
        initiallySortedColumn: PropTypes.string.isRequired,
        lockedRows: PropTypes.object.isRequired,
        lockedColumns: PropTypes.array.isRequired,
        notEmptyColumns: PropTypes.array.isRequired
    }

    static defaultProps =
    {
        dataUrl: '',
        styles: [  ],
        shownRows: 10,
        initiallySortedColumn: 'id',
        lockedRows: [  ],
        lockedColumns: [  ],
        notEmptyColumns: [  ]
    }

    loadData = () =>
    {
        const url = this.props.dataUrl;

        request.get(url).then(response =>
        {
            this.setState({
                tableData: response.body,
                sortedTableData: response.body
            });
        })
        .catch(errors => null);
    }

    transformData = (content) =>
    {
        let result = [];

        for(let field in content)
        {
            result.push({
                field, value: (content[field] || '').toString()
            });
        }

        return result;
    }

    sortData = (dataKey, dataSorting) => 
    {
        const dataBody = this.state.tableData;

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

        this.setState({
            sortedTableData: dataList
        });
    }

    handleAmountChange = (event) =>
    {
        this.setState({
            showNumberOfRows: parseInt(event.target.value)
        });
    }

    showPrevPage = () =>
    {
        this.setState({
            currentPosition: this.state.currentPosition - this.state.showNumberOfRows
        });
    }
    
    showNextPage = () =>
    {
        this.setState({
            currentPosition: this.state.currentPosition + this.state.showNumberOfRows
        });
    }

    sortingChange = (index) => 
    {
        this.sortData(index, "ascd");
    }
    
    componentDidMount = () =>
    {
        this.loadData();
    }

    render = () =>
    {
        const { styles, lockedRows, lockedColumns, notEmptyColumns } = this.props;
        const { currentSorting, currentPosition, showNumberOfRows } = this.state;

        if(!this.state.sortedTableData)
        {
            this.loadData();
        }

        const tableData = this.state.tableData;
        const sortedTableData = this.state.sortedTableData;

        const checkShowingAmount = currentPosition + showNumberOfRows;

        return(
            <div>
                <DataTableMenu />
                <section className="dataTableContainer">
                {
                    <div className="dataTableContent">
                        <table
                            className={ 
                                `table 
                                ${ styles.striped ? 'table-striped' : '' } 
                                ${ styles.hovered ? 'table-hover' : '' } 
                                table-bordered dataTableView` 
                            }
                        >
                            <DataTableHeader
                                headerData={ this.transformData(tableData[ 0 ]) }
                                position={ 'top' }
                                sorting={ currentSorting }
                                sortingChange={ this.sortingChange.bind(this) }
                            />
                            <tbody>
                            {    
                                sortedTableData.map((row, i) =>
                                {
                                    return(
                                        <DataTableRow
                                            key={ i }
                                            rowNumber={ i }
                                            rowData={ row }
                                            isLocked={ (lockedRows.value.indexOf(row[ lockedRows.field ]) != -1) ? true : false }
                                            isHidden={ (i >= currentPosition) && (i < checkShowingAmount) ? false : true }
                                            lockedColumns={ lockedColumns }
                                            notEmptyColumns={ notEmptyColumns }
                                        />
                                    )
                                })
                            }
                            </tbody>
                            <DataTableHeader
                                headerData={ this.transformData(tableData[ 0 ]) }
                                position={ 'bottom' }
                                sorting={ currentSorting }
                                sortingChange={ this.sortingChange.bind(this) }
                            />
                        </table>
                    </div>
                }
                </section>
            <br />
            <DataTablePagination
                tableLength={ tableData.length }
                shownRowsAmount={ showNumberOfRows }
                currentPosition={ currentPosition }
                prevButtonClicked={ this.showPrevPage.bind(this) }
                nextButtonClicked={ this.showNextPage.bind(this) }
                shownRowsAmountChanged={ this.handleAmountChange.bind(this) }
            />
        </div>
        );
    }
}

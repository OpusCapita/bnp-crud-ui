import React from 'react';
import request from 'superagent';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';

import DataTableBody from './components/DataTableBody';
import DataTableHeader from './components/DataTableHeader';
import DataTableMenu from './components/DataTableMenu';
import DataTablePagination from './components/DataTablePagination';
import './DataTable.less';

export default class DataTable extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);
        
        this.state =
        {
            tableData: [  ],
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
                tableData: response.body
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
        this.setState({
            currentSorting: index
        });
    }
    
    componentDidMount = () =>
    {
        this.loadData();
    }

    render = () =>
    {
        const { styles, lockedRows, lockedColumns, notEmptyColumns } = this.props;
        const { currentSorting, currentPosition, showNumberOfRows, currentPage } = this.state;
        
        const tableData = this.state.tableData;

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
                            <DataTableBody
                                currentlySorted={ currentSorting }
                                tableData={ tableData }
                                numberOfRows={ showNumberOfRows }
                                position={ currentPosition }
                                lockedRows={ lockedRows }
                                lockedColumns={ lockedColumns }
                                notEmptyColumns={ notEmptyColumns }
                            />
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
                currentPage={ currentPage }
                prevButtonClicked={ this.showPrevPage.bind(this) }
                nextButtonClicked={ this.showNextPage.bind(this) }
                shownRowsAmountChanged={ this.handleAmountChange.bind(this) }
            />
        </div>
        );
    }
}

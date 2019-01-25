import React from 'react';
import request from 'superagent';

import { Components } from '@opuscapita/service-base-ui';

import DataTableBody from './components/DataTableBody';
import DataTableHeader from './components/DataTableHeader';
import DataTableMenu from './components/DataTableMenu';
import DataTablePagination from './components/DataTablePagination';

import './DataTable.less';

class DataTable extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        this.state =
        {
            tableData: [  ],
            showNumberOfRows: this.props.rows || 10,
            currentPosition: 0,
            currentSorting: 1
        }

        this.handleAmountChange = this.handleAmountChange.bind(this);
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
    
    componentDidMount = () =>
    {
        this.loadData();
    }

    render = () =>
    {
        const tableData = this.state.tableData;

        return(
            <div>
                <DataTableMenu />
                <section className="dataTableContainer">
                {
                    <div className="dataTableContent">
                        <table
                            className={ `table ${ this.props.striped ? 'table-striped' : '' } ${ this.props.hovered ? 'table-hover' : '' } table-bordered dataTableView` }
                        >
                            <DataTableHeader
                                headerData={ this.transformData(tableData[0]) }
                                position={ 'top' }
                                sorting={ this.state.currentSorting }
                            />
                            <DataTableBody
                                tableData={ tableData }
                                numberOfRows={ this.state.showNumberOfRows }
                                position={ this.state.currentPosition }
                            />
                            <DataTableHeader
                                headerData={ this.transformData(tableData[0]) }
                                position={ 'bottom' }
                                sorting={ this.state.currentSorting }
                            />
                        </table>
                    </div>
                }
                </section>
            <br />
            <DataTablePagination
                tableLength={ tableData.length }
                shownRowsAmount={ this.state.showNumberOfRows }
                currentPosition={ this.state.currentPosition }
                currentPage={ this.state.currentPage }
                prevButtonClicked={ this.showPrevPage.bind(this) }
                nextButtonClicked={ this.showNextPage.bind(this) }
                shownRowsAmountChanged={ this.handleAmountChange.bind(this) }
            />
        </div>
        );
    }
}

export default DataTable;

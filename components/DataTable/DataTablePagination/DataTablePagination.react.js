/* 
    DataTableHeader
    --------------------------------------------------------------
    - Rendering of Headers and sorting options
*/

import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

import DataTablePaginationButton from '../DataTablePaginationButton';

class DataTablePagination extends Components.ContextComponent
{
    constructor(props)
    {
        super(props);

        this.state = {
            shownRowsAmount: this.props.shownRowsAmount,
            currentPage: 1
        }
    }

    onShownRowsChanged = (event) => 
    {
        this.setState({
            shownRowsAmount: parseInt(event.target.value)
        });

        this.props.shownRowsAmountChanged(event);
    }

    onPrevButtonClicked = () => 
    {
        this.setState({
            currentPage: this.state.currentPage - 1
        });

        this.props.prevButtonClicked();
    }
    
    onNextButtonClicked = () => 
    {
        this.setState({
            currentPage: this.state.currentPage + 1
        });

        this.props.nextButtonClicked();
    }

    shownRowsOptions = () =>
    {
        let options = [];

        for(let i = 25; i < this.props.tableLength; i*=2)
        {
            options.push( <option key={i} value={i}>{i}</option>);
        }

        options.unshift(<option key={0} value={10}>10</option>);
        options.push(<option key={99999} value={this.props.tableLength}>All</option>);
        
        return options;
    }

    render()
    {
        const tableLength = this.props.tableLength;
        const shownRows = this.state.shownRowsAmount;
        const currentPosition = this.props.currentPosition;
        const minPosition = currentPosition + 1;
        const maxPosition = currentPosition + shownRows;
        const availiblePages = tableLength / shownRows;
        const currentPage = this.state.currentPage;

        return (
            <div className="dataTablePagination unselectable">
                <DataTablePaginationButton 
                    direction={'prev'} 
                    tableLength={tableLength} 
                    currentPosition={currentPosition} 
                    prevClicked={this.onPrevButtonClicked}
                />
                <div className="showPosition">
                    <span className="form-inline">
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <span>
                                        <b>Page {currentPage} of {availiblePages}</b>&nbsp;
                                        ({minPosition} - {maxPosition})
                                    </span>
                                </div>
                                <select 
                                    className="form-control"
                                    value={shownRows} 
                                    onChange={this.onShownRowsChanged}
                                >
                                    {this.shownRowsOptions()}
                                </select>

                                <div className="input-group-addon">/ {tableLength}</div>
                            </div>
                        </div>
                    </span>
                </div>
                <DataTablePaginationButton 
                    direction={'next'} 
                    tableLength={tableLength} 
                    currentPosition={maxPosition}
                    nextClicked={this.onNextButtonClicked}
                />
            </div>
        )
    }
}

export default DataTablePagination;
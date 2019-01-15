/* 
    DataTablePagination
    --------------------------------------------------------------
    - Rendering of Pagination and page size options
*/


import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

class DataTablePagination extends Components.ContextComponent
{
    constructor (props) 
    {
        super(props);
        
        this.state = {
            amountOfEntries:  0
        };
    }
    showPrevPage = () =>
    {
        console.log("prev")
    }

    showNextPage = () => 
    {
        console.log("next")
    }


    render()
    {
        let amount = this.props.length

        return(
            <div className="dataTablePagination">
                <div className="leftArrow" onClick={this.showPrevPage}>
                    <i className="glyphicon glyphicon-chevron-left"></i>
                </div>
                <div className="showPosition">
                    <span className="form-inline">
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-addon">Page 1 - Showing</div>
                                <select className="form-control">
                                    <option>10</option>
                                    <option>25</option>
                                    <option>50</option>
                                    <option>100</option>
                                </select>
                                <div className="input-group-addon">/ {amount}</div>
                            </div>
                        </div>
                    </span>
                </div>
                <div className="rightArrow" onClick={this.showNextPage}>
                    <i className="glyphicon glyphicon-chevron-right"></i>
                </div>
            </div>
        )
    }
}

export default DataTablePagination;
/* 
    DataTableHeader
    --------------------------------------------------------------
    - Rendering of Headers and sorting options
*/

import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

class DataTablePaginationButton extends Components.ContextComponent
{
    render()
    {
        return(
            <span>
                {
                    (Math.min(this.props.tableLength, Math.max(this.props.currentPosition, 0)) > 0) ? 
                    (
                        <div className="rightArrow inactive">
                            <i className="glyphicon glyphicon-chevron-left"></i>
                        </div>
                    )
                    :
                    (
                        <div className="rightArrow inactive">
                            <i className="glyphicon glyphicon-chevron-left"></i>
                        </div>
                    )   
                }
            </span>
        )
    }
}

export default DataTablePaginationButton;
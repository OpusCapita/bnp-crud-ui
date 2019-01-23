/* 
    DataTableHeaderField
    ------------------------------------------
    - Render DataTableHeaderField
    - Define sorting
    - Determine width of DataTableHeaderField
*/

import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

import './DataTableheaderField.less';

class DataTableHeaderField extends Components.ContextComponent
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            headerFieldNumber: this.props.fieldNum,
            direction: this.props.direction || 'ascd'
        }
    }

    render()
    {
        const headerFieldTitle = this.props.title;
        const headerFieldNumber = this.state.headerFieldNumber;

        return(
            <th id={`header_${headerFieldNumber}`} className="dataTableHeaderField" >
                &nsbp;
                {
                    (headerFieldNumber != 0 || headerFieldNumber != 1) ? 
                    (
                        <span className={this.props.direction}>
                            {headerFieldTitle}&nbsp;
                        </span>
                    )
                    :
                    (
                        <span>
                            {headerFieldTitle}&nbsp;
                        </span>
                    )
                }
            </th>
        )
    }
}

export default DataTableHeaderField;
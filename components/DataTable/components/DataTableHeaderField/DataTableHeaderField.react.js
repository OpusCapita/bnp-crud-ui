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
            widthStyle: {},
            headerFieldNumber: this.props.fieldNum
        }
    }

    render()
    {
        const headerFieldTitle = this.props.title;
        const headerFieldNumber = this.state.headerFieldNumber;

        return(
            <th id={`header_${headerFieldNumber}`} className="dataTableHeaderField" >
                &nsbp;
                <span>
                    {headerFieldTitle}&nbsp;
                </span>
            </th>
        )
    }
}

export default DataTableHeaderField;
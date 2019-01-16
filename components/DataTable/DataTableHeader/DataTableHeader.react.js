/* 
    DataTableHeader
    --------------------------------------------------------------
    - Rendering of Headers and sorting options
*/

import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

class DataTableHeader extends Components.ContextComponent
{
    render()
    {
        let rowDataFields = this.props.headerData;
        
        return(
            <thead className={`dataTableHeader`}>
                <tr>
                    <th></th>
                    <th className={"num ascd"}>#</th>
                    {
                        rowDataFields.map((data, i) => 
                        {
                            return (
                                <th key={i}>
                                    {data.field}
                                </th>
                            )
                        }) 
                    }
                </tr>
            </thead>
        )
    }
}

export default DataTableHeader;
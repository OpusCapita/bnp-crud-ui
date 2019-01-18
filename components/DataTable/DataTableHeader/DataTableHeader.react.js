/* 
    DataTableHeader
    ------------------------------------------
    - Rendering of Headers and sorting options
*/

import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

import DataTableHeaderField from '../DataTableHeaderField';

class DataTableHeader extends Components.ContextComponent
{
    render()
    {
        const rowDataFields = this.props.headerData;
        
        return(
            <thead className={`dataTableHeader unselectable`}>
                <tr>
                    <DataTableHeaderField fieldNum={0} title={""} />
                    <DataTableHeaderField fieldNum={1} title={"#"} />
                    {
                        rowDataFields.map((data, i) => 
                        {
                            return (
                                <DataTableHeaderField key={i} fieldNum={i + 2} title={data.field} />
                            )
                        }) 
                    }
                </tr>
            </thead>
        )
    }
}

export default DataTableHeader;
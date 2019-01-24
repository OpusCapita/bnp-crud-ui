/* 
    DataTableHeader
    ------------------------------------------
    - Rendering of Headers and sorting options
*/

import React from 'react';

import { Components } from '@opuscapita/service-base-ui';

import DataTableHeaderField from '../DataTableHeaderField';

import './DataTableHeader.less';

class DataTableHeader extends Components.ContextComponent
{
    render()
    {
        const rowDataFields = this.props.headerData;
        
        return(
            <thead className={`dataTableHeader unselectable`}>
                <tr className="dataTableHeaderRow">
                    <DataTableHeaderField fieldNum={0} title={""} />
                    <DataTableHeaderField fieldNum={1} title={"#"}/>
                    {
                        rowDataFields.map((data, i) => 
                        {
                            return (
                                <DataTableHeaderField key={i} fieldNum={i + 2} title={data.field} direction={(data.field == 'id') ? 'ascd' : 'desc'}/>
                            )
                        }) 
                    }
                </tr>
            </thead>
        )
    }
}

export default DataTableHeader;
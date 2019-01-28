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
    constructor(props)
    {
        super(props);

        this.state = {  }
    }

    changeSorted = (index) =>
    {
        this.props.sortingChange(index);
    }

    render()
    {
        const rowDataFields = this.props.headerData;

        return(
            <thead className="dataTableHeader unselectable">
                <tr className="dataTableHeaderRow">
                    <DataTableHeaderField 
                        position={ this.props.position } 
                        fieldNum={ 0 } 
                        title={ '' } 
                    />
                    <DataTableHeaderField 
                        position={ this.props.position } 
                        fieldNum={ 1 } 
                        title={ '#' } 
                    />
                    {
                        rowDataFields.map((data, i) =>
                        {
                            return (
                                <DataTableHeaderField
                                    key={ i }
                                    fieldNum={ i + 2 }
                                    title={ data.field }
                                    direction={ 'ascd' }
                                    sorted={ (i === this.props.sorting) ? true : false }
                                    onCheckSorting={ this.changeSorted.bind(this, i) }
                                    position={ this.props.position }
                                />
                            )
                        })
                    }
                </tr>
            </thead>
        )
    }
}

export default DataTableHeader;

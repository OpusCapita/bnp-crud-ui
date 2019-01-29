/* 
    DataTableHeader
    ------------------------------------------
    - Rendering of Headers and sorting options
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';

import DataTableHeaderField from '../DataTableHeaderField';
import './DataTableHeader.less';

export default class DataTableHeader extends Components.ContextComponent
{
    constructor(props)
    {
        super(props);
    }
    
    static propTypes =
    {
        headerData: PropTypes.array.isRequired,
        position: PropTypes.string.isRequired,
        sorting: PropTypes.string.isRequired,
        sortingChange: PropTypes.func.isRequired
    }

    static defaultProps =
    {
        headerData: [  ],
        position: 'top',
        sorting: 'ascd'
    }

    changeSorted = (index) =>
    {
        this.props.sortingChange(index);
    }

    render()
    {
        const {
            headerData,
            sorting,
            position
        } = this.props;

        return(
            <thead className="dataTableHeader unselectable">
                <tr className="dataTableHeaderRow">
                    <DataTableHeaderField
                        position={ position }
                        fieldNum={ 0 }
                        title={ '' }
                    />
                    <DataTableHeaderField
                        position={ position }
                        fieldNum={ 1 }
                        title={ '#' }
                    />
                    {
                        headerData.map((data, i) =>
                        {
                            return (
                                <DataTableHeaderField
                                    key={ i }
                                    fieldNum={ i + 2 }
                                    title={ data.field }
                                    direction={ 'ascd' }
                                    sorted={ (data.field === sorting) ? true : false }
                                    onCheckSorting={ this.changeSorted.bind(this, data.field) }
                                    position={ position }
                                />
                            )
                        })
                    }
                </tr>
            </thead>
        )
    }
}

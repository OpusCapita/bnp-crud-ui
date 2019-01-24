/* 
    DataTableHeaderField
    ------------------------------------------
    - Render DataTableHeaderField
    - Define sorting
    - Determine width of DataTableHeaderField
*/

import React from 'react';

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
            direction: this.props.direction || '',
            sorted: this.props.sorted || false
        }
    }

    checkSorting = () => 
    {
        this.props.onCheckSorting();

        if(this.props.sorted === true) 
        {
            this.changeDirection();
        }
    }

    changeDirection = () => 
    {
        if(this.state.direction === 'ascd')
        {
            this.setState({
                direction: 'desc'
            });
        }
        else if (this.state.direction === 'desc')
        {
            this.setState({
                direction: 'ascd'
            });
        }
    }

    getFieldType = () => 
    {
        return 'string';
    }

    render()
    {
        const headerFieldTitle = this.props.title;
        const headerFieldNumber = this.state.headerFieldNumber;

        return(
            <th id={`header_${headerFieldNumber}`} className="dataTableHeaderField">
                &nsbp;
                {
                    (headerFieldNumber !== 0 && headerFieldNumber !== 1) ? (
                        <span 
                            className={this.props.sorted ? `${this.state.direction}-${this.getFieldType()}` : 'unsorted'} 
                            onClick={this.checkSorting}
                        >
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
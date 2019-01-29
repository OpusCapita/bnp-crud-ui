/* 
    DataTableHeaderField
    ------------------------------------------
    - Render DataTableHeaderField
    - Define sorting
    - Determine width of DataTableHeaderField
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';

import './DataTableheaderField.less';

export default class DataTableHeaderField extends Components.ContextComponent
{
    state =
    {
        headerFieldNumber: this.props.fieldNum,
        direction: this.props.direction
    }

    static propTypes =
    {
        fieldNum: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        direction: PropTypes.string,
        sorted: PropTypes.bool,
        position: PropTypes.string.isRequired,
        onCheckSorting: PropTypes.func
    }

    static defaultProps =
    {
        fieldNum: 0,
        title: '',
        direction: '',
        sorted: false,
        position: 'top'
    }

    constructor(props)
    {
        super(props);
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
        const { 
            title, 
            fieldNum, 
            sorted, 
            position 
        } = this.props;

        return(
            <th id={ `header_${ fieldNum }` } className="dataTableHeaderField">
                {
                    (fieldNum !== 0 && fieldNum !== 1) ? (
                        <span
                            className={ sorted ? `${ position } ${ this.state.direction }-${ this.getFieldType() }` : `${ position } unsorted` }
                            onClick={ this.checkSorting }
                        >
                            { title }&nbsp;
                        </span>
                    )
                    :
                    (
                        <span className={ `${ position}` }>
                            { title }&nbsp;
                        </span>
                    )
                }
            </th>
        )
    }
}

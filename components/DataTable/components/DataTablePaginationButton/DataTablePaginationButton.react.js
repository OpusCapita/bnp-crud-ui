/* 
    DataTablePaginationButton
    ----------------------------------------
    - Rendering of DataTablePaginationButton
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';

import './DataTablePaginationButton.less';

export default class DataTablePaginationButton extends Components.ContextComponent
{
    state =
    {
        direction: this.props.direction
    }

    static propTypes =
    {
        direction: PropTypes.string.isRequired,
        tableLength: PropTypes.number.isRequired,
        currentPosition: PropTypes.number.isRequired,
        nextClicked: PropTypes.func,
        prevClicked: PropTypes.func
    }

    static defaultProps =
    {
        direction: 'prev',
        tableLength: 50,
        currentPosition: 1
    }

    constructor(props)
    {
        super(props);
    }

    prevButtonClicked = () =>
    {
        this.props.prevClicked();
    }

    nextButtonClicked = () =>
    {
        this.props.nextClicked();
    }

    createArrowButton = () =>
    {
        const { 
            tableLength, 
            currentPosition, 
            direction 
        } = this.props;

        if(direction === 'prev')
        {
            const usable = (Math.min(tableLength, Math.max(currentPosition, 0)) > 0);

            return (
                <div 
                    className={ `leftArrow ${ usable ? '' : 'inactive' }` }
                    onClick={ usable ? this.prevButtonClicked : '' }
                >
                    <i className="glyphicon glyphicon-chevron-left"></i>
                </div>
            )
        }
        else if(direction === 'next')
        {
            const usable = (Math.min(tableLength, Math.max(currentPosition, 0)) < (tableLength));

            return (
                <div
                    className={ `rightArrow ${ usable ? '' : 'inactive' }` }
                    onClick={ usable ? this.nextButtonClicked : '' }
                >
                    <i className="glyphicon glyphicon-chevron-right"></i>
                </div>
            )
        }
    }

    render()
    {
        return(
            <span>
                { this.createArrowButton() }
            </span>
        )
    }
}

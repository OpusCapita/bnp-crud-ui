/* 
    DataTablePaginationButton
    ----------------------------------------
    - Rendering of DataTablePaginationButton
*/

import React from 'react';

import { Components } from '@opuscapita/service-base-ui';

import './DataTablePaginationButton.less';

class DataTablePaginationButton extends Components.ContextComponent
{
    static defaultProps = 
    {
        direction: 'prev'
    }

    constructor(props)
    {
        super(props);

        this.state = 
        {
            direction: this.props.direction // prev | next
        }
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
        if(this.props.direction === 'prev') 
        {
            const usable = (Math.min(this.props.tableLength, Math.max(this.props.currentPosition, 0)) > 0);

            return (
                <div 
                    className={`leftArrow ${usable ? '' : 'inactive'}`} 
                    onClick={usable ? this.prevButtonClicked : ''}>
                    <i className={`glyphicon glyphicon-chevron-left`}></i>
                </div>
            )
        } 
        else if(this.props.direction === 'next')
        {
            const usable = (Math.min(this.props.tableLength, Math.max(this.props.currentPosition, 0)) < (this.props.tableLength));

            return (
                <div 
                    className={`rightArrow ${usable ? '' : 'inactive'}`} 
                    onClick={usable ? this.nextButtonClicked : ''}>
                    <i className={`glyphicon glyphicon-chevron-right`}></i>
                </div>
            )
        }
    }

    render()
    {
        return(
            <span>
                {this.createArrowButton()}
            </span>
        )
    }
}

export default DataTablePaginationButton;
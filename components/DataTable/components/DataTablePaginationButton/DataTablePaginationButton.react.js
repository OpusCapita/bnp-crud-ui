/* 
    DataTablePaginationButton
    ----------------------------------------
    - Rendering of DataTablePaginationButton
*/

import React, { Component } from 'react';

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
        let arrowButton = '';

        if(this.props.direction === 'prev') 
        {
            if(Math.min(this.props.tableLength, Math.max(this.props.currentPosition, 0)) > 0)
            {
                arrowButton = (
                    <div className="leftArrow">
                        <i 
                            className={`glyphicon glyphicon-chevron-left`} 
                            onClick={this.prevButtonClicked}
                        >
                        </i>
                    </div>
                )
            }
            else
            {
                arrowButton = (
                    <div className="leftArrow inactive">
                        <i className={`glyphicon glyphicon-chevron-left`}></i>
                    </div>
                )
            }
        } 
        else if(this.props.direction === 'next')
        {
            if(Math.min(this.props.tableLength, Math.max(this.props.currentPosition, 0)) < (this.props.tableLength))
            {
                arrowButton = (
                    <div className="rightArrow">
                        <i 
                            className={`glyphicon glyphicon-chevron-right`} 
                            onClick={this.nextButtonClicked}>
                        </i>
                    </div>
                )
            }
            else
            {
                arrowButton = (
                    <div className="rightArrow inactive">
                        <i className={`glyphicon glyphicon-chevron-right`}></i>
                    </div>
                )
            }
        }

        return arrowButton;
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
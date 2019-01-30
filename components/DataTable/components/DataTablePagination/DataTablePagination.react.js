import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';

import translations from '../../i18n';
import './DataTablePagination.less';

export default class DataTablePagination extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        this.state =
        {
            shownRowsAmount: this.props.shownRowsAmount,
            currentPage: 1
        }

        context.i18n.register('CrudUI', translations);
    }

    static propTypes =
    {
        tableLength: PropTypes.number.isRequired,
        shownRowsAmount: PropTypes.number.isRequired,
        currentPosition: PropTypes.number.isRequired,
        prevButtonClicked: PropTypes.func.isRequired,
        nextButtonClicked: PropTypes.func.isRequired,
        shownRowsAmountChanged: PropTypes.func.isRequired
    }

    static defaultProps =
    {
        tableLength: 50,
        shownRowsAmount: 10,
        currentPosition: 0,
    }

    shownRowsOptions = () =>
    {
        let options = [  ];

        for(let i = 25; i < this.props.tableLength; i*=2)
        {
            options.push( <option key={ i } value={ i }>{ i }</option>);
        }

        options.unshift(<option key={ 0 } value={ 10 }>{ 10 }</option>);
        options.push(<option key={ 99999 } value={ this.props.tableLength }>All</option>);
        
        return options;
    }

    onShownRowsChanged = (event) =>
    {
        this.setState({
            shownRowsAmount: parseInt(event.target.value)
        });

        this.props.shownRowsAmountChanged(event);
    }

    onPrevButtonClicked = () =>
    {
        this.setState({
            currentPage: this.state.currentPage - 1
        });

        this.props.prevButtonClicked();
    }
    
    onNextButtonClicked = () =>
    {
        this.setState({
            currentPage: this.state.currentPage + 1
        });

        this.props.nextButtonClicked();
    }

    render()
    {
        const { i18n } = this.context;
        
        const {
            tableLength,
            currentPosition
        } = this.props;

        const {
            shownRowsAmount,
            currentPage
        } = this.state;

        const availiblePages = tableLength / shownRowsAmount;
        const minPosition = Math.min(tableLength, Math.max(currentPosition + 1, 0));
        const maxPosition = Math.min(tableLength, Math.max(currentPosition + shownRowsAmount, 0)) 
        const canBrowsePrev = (Math.min(availiblePages, Math.max(currentPage, 0)) > 1);
        const canBrowseNext = (Math.min(availiblePages, Math.max(currentPage, 0)) < (availiblePages));

        return (
            <div className="dataTablePagination unselectable">

                <div
                    className={ `leftArrow ${ canBrowsePrev ? '' : 'inactive' }` }
                    onClick={ canBrowsePrev ? this.onPrevButtonClicked : '' }
                >
                    <i className="glyphicon glyphicon-chevron-left"></i>
                </div>

                <div className="position">
                    <span className="form-inline">
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <span>
                                    <b>
                                        { i18n.getMessage('CrudUI.Pagination.Page') }&nbsp;
                                        { Math.round(currentPage) }&nbsp;
                                        { i18n.getMessage('CrudUI.Pagination.Of') }&nbsp;
                                        { Math.round(availiblePages) }
                                    </b>&nbsp;
                                        ({ minPosition } - { maxPosition })
                                    </span>
                                </div>
                                <select
                                    className="form-control"
                                    value={ shownRowsAmount }
                                    onChange={ this.onShownRowsChanged }
                                >
                                    { this.shownRowsOptions() }
                                </select>
                                <div className="input-group-addon">/ { tableLength }</div>
                            </div>
                        </div>
                    </span>
                </div>

                <div
                    className={ `rightArrow ${ canBrowseNext ? '' : 'inactive' }` }
                    onClick={ canBrowseNext ? this.onNextButtonClicked : '' }
                >
                    <i className="glyphicon glyphicon-chevron-right"></i>
                </div>

            </div>
        )
    }
}

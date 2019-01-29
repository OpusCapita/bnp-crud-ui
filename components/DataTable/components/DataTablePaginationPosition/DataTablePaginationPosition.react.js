import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';

import translations from '../../i18n';

import './DataTablePaginationPosition.less';

export default class DataTablePaginationPosition extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        context.i18n.register('CrudUI', translations);
    }

    static propTypes =
    {
        tableLength: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        currentPosition: PropTypes.number.isRequired,
        shownRowsAmount: PropTypes.number.isRequired
    }

    static defaultProps =
    {
        tableLength: 0,
        currentPage: 1,
        currentPosition: 0,
        shownRowsAmount: 10
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
        this.props.shownRowsAmountChanged(event);
    }

    render()
    {
        const { i18n } = this.context;
        const { tableLength, currentPage, shownRowsAmount, currentPosition } = this.props;

        const availiblePages = tableLength / shownRowsAmount;
        const minPosition = currentPosition + 1;
        const maxPosition = currentPosition + shownRowsAmount;

        return (
            <div className="dataTablePaginationPosition">
                <span className="form-inline">
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-addon">
                                <span>
                                    <b>{ i18n.getMessage('CrudUI.Pagination.Page') } { Math.round(currentPage) } { i18n.getMessage('CrudUI.Pagination.Of') } { Math.round(availiblePages) }</b>&nbsp;
                                    (
                                        { Math.min(tableLength, Math.max(minPosition, 0)) } - { Math.min(tableLength, Math.max(maxPosition, 0)) }
                                    )
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
        )
    }
}

import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';

import translations from '../../i18n';
import DataTablePaginationButton from '../DataTablePaginationButton';
import DataTablePaginationPosition from '../DataTablePaginationPosition';
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
        currentPage: PropTypes.number,
        prevButtonClicked: PropTypes.func.isRequired,
        nextButtonClicked: PropTypes.func.isRequired,
        shownRowsAmountChanged: PropTypes.func.isRequired
    }

    static defaultProps =
    {
        tableLength: 50,
        shownRowsAmount: 10,
        currentPosition: 0,
        currentPage: 1
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
        const { tableLength, currentPosition } = this.props;
        const { shownRowsAmount, currentPage } = this.state;

        return (
            <div className="dataTablePagination unselectable">
                <DataTablePaginationButton
                    direction={ 'prev' }
                    tableLength={ tableLength }
                    currentPosition={ currentPosition }
                    prevClicked={ this.onPrevButtonClicked }
                />
                
                <DataTablePaginationPosition
                    tableLength={ tableLength }
                    currentPage={ currentPage }
                    currentPosition={ currentPosition }
                    shownRowsAmount={ shownRowsAmount }
                    shownRowsAmountChanged={ this.onShownRowsChanged.bind(this) }
                />

                <DataTablePaginationButton
                    direction={ 'next' }
                    tableLength={ tableLength }
                    currentPosition={ currentPosition + shownRowsAmount }
                    nextClicked={ this.onNextButtonClicked }
                />
            </div>
        )
    }
}

import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';

import './DataTableSearchItem.less';

export default class DataTableSearchItem extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        this.state =
        {
            selected: false,
            field: '',
            id: this.props.field.id
        };
    };

    static propTypes =
    {
        options: PropTypes.array.isRequired
    };

    static defaultProps =
    {
        options: [  ]
    };

    handleOptionChange = (event) =>
    {
        this.setState({
            selected: true,
            field: event.target.value
        });
    };

    handleValueChange = (event) =>
    {
        this.props.changeSearchItem({id: this.state.id, field: this.state.field, value: event.target.value});
    };

    deleteSearchItem = () =>
    {
        this.props.deleteSearchItem();
    };

    render()
    {
        const { options } = this.props;
        const { selected, field } = this.state;

        return (
            <span className="dataTableSearchItem">
                {
                selected ?
                (
                    <span>
                        <input
                            type="text"
                            className="form-control input"
                            placeholder={ `${ field }` }
                            aria-describedby="sizing-addon"
                            autoFocus onChange={ this.handleValueChange }
                        />
                        <span
                            className="glyphicon glyphicon-remove remove-button"
                            aria-hidden="true"
                            onClick={ this.deleteSearchItem }
                        ></span>
                    </span>
                )
                :
                (
                    <select
                       className="form-control options"
                       onChange={ this.handleOptionChange }
                    >
                        <option>Select...</option>
                        {
                            options.map((option, i) =>
                            {
                                return(
                                    <option
                                        key={ i }
                                        value={ option.field }
                                    >
                                        { option.field }
                                    </option>
                                )
                            })
                        }
                    </select>
                )
            }
            </span>
        );
    };
}

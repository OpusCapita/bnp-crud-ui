import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';

import './DataTableField.less';

export default class DataTableField extends Components.ContextComponent
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            editable: this.props.editable,
            disabled: this.props.disabled,
            hasBeenEdited: false,
            hasError: false,
            originalContent: this.props.content,
            currentContent: this.props.content,
            fieldType: this.props.fieldType
        };
    };

    static propTypes =
    {
        rowNum: PropTypes.number.isRequired,
        fieldNum: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        fieldType: PropTypes.string.isRequired,
        editable: PropTypes.bool.isRequired,
        columnEdited: PropTypes.func.isRequired,
        columnError: PropTypes.func.isRequired,
        lockedColumns: PropTypes.array.isRequired,
        notEmptyColumns: PropTypes.array.isRequired
    };

    static defaultProps =
    {
        rowNum: 0,
        fieldNum: 0,
        content: '',
        fieldType: '',
        editable: true,
        lockedColumns: [  ],
        notEmptyColumns: [  ]
    };

    checkIfHasBeenEdited = (event) =>
    {
        if(this.props.notEmptyColumns.indexOf(this.state.fieldType) !== -1 && event.target.value === '')
        {
            this.setState({
                hasError: true
            });

            this.props.columnError();
        }
        else
        {
            this.props.columnEdited();
        }

        if(event.target.value !== this.state.originalContent)
        {
            this.setState({
                currentContent: event.target.value,
                hasBeenEdited: true
            });
        }
    };

    render()
    {
        const {
            rowNum,
            fieldNum,
            editable
        } = this.props;

        const {
            currentContent,
            originalContent,
            hasBeenEdited,
            hasError
        } = this.state;

        let content = this.props.content;

        if(currentContent !== originalContent)
        {
            content = currentContent;
        }

        const  checkDisabled = this.props.lockedColumns.indexOf(this.state.fieldType) !== -1;

        return(
            <td
                id={ `field_${ rowNum }-${ fieldNum + 2 }` }
                className={
                    `dataTableField
                    ${ hasBeenEdited ? 'edited' : '' }
                    ${ hasError ? 'error' : '' }`
                }
            >
                {
                    (editable && checkDisabled) ?
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={ content }
                        onChange={ this.checkIfHasBeenEdited }
                    />
                    :
                    <p className="form-control-static">
                        { content }
                    </p>
                }
            </td>
        );
    };
}

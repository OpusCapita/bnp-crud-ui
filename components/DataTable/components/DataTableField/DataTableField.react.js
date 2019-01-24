/* 
    DataTableField
    --------------------------------------------------
    - Rendering of DataTableField content
    - Determining if DataTableField should be shown
    - Determining if DataTableField should be editable
    - Determining if DataTableField should be disabled
*/

import React from 'react';

import { Components } from '@opuscapita/service-base-ui';

import './DataTableField.less';

class DataTableField extends Components.ContextComponent
{
    static defaultProps =
    {
        editable: false,
        disabled: false,
        originalContent: [ ],
        fieldType: ''
    }

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
            currentContent: '',
            fieldType: ''
        }
    }

    componentDidMount = () =>
    {
        this.setState({
            fieldType: this.props.fieldType,
            currentContent: this.props.content
        })
    }

    checkIfShouldBeDisabled = () =>
    {
        let status = '';

        if(this.state.fieldType === "status" || this.state.fieldType === "id" || this.state.fieldType === "profile")
        {
            status = false;
        }
        else
        {
            status = true;
        }

        return status;
    }

    checkIfHasBeenEdited = (event) =>
    {
        if(this.state.fieldType === "customerId" && event.target.value == '')
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
    }

    render()
    {
        let content = this.props.content;
        const rowNum = this.props.rowNum;
        const fieldNum = this.props.fieldNum;

        if(this.state.currentContent !== this.state.originalContent)
        {
            content = this.state.currentContent;
        }

        return(
            <td id={`field_${rowNum}-${fieldNum + 2}`} className={`dataTableField ${this.state.hasBeenEdited ? 'edited' : ''} ${this.state.hasError ? 'error' : ''}`}>
                {
                    (this.props.editable === true && this.checkIfShouldBeDisabled() === true) &&
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={content}
                        onChange={this.checkIfHasBeenEdited}
                    />
                }
                {
                    (this.props.editable === false || this.checkIfShouldBeDisabled() === false) &&
                    <p className="form-control-static">
                        {content}
                    </p>
                }
            </td>
        )
    }
}

export default DataTableField;

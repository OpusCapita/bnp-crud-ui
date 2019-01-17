/* 
    DataTableField
    --------------------------------------------------------------
    - Rendering of DataTableField content
    - Determining if DataTableField should be shown
    - Determining if DataTableField should be editable
    - Determining if DataTableField should be disabled
*/

import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

class DataTableField extends Components.ContextComponent
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            editable: this.props.editable || false,
            disabled: this.props.disabled || false,
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

        if(this.state.fieldType === "status" || this.state.fieldType === "id")
        {
            status = false
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
            this.props.columnError();
        }
        else
        {
            this.props.columnEdited();
        }

        if(event.target.value !== this.state.originalContent)
        {
            this.state.currentContent = event.target.value
        }
    }

    render()
    {
        let content = this.props.content;

        if(this.state.currentContent !== this.state.originalContent) 
        {
            content = this.state.currentContent;
        }

        return(
            <td className="dataTableColumn">
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
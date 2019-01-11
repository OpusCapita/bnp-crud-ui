import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

class DataTableColumn extends Components.ContextComponent
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            editable: this.props.editable || false,
            disabled: false,
            originalContent: this.props.content,
            field: ''
        }
    }

    componentDidMount () 
    {
        this.setState({
            field: this.props.field
        })
    }

    checkIfShouldBeDisabled = () =>
    {
        let status = '';

        if(this.state.field === "status")
        {
            status = false
        }
        else
        {
            status = true;
        }

        return status;
    }

    render()
    {

        const content = this.props.content;
        return(
            <td>
                {
                    (this.props.editable === true && this.checkIfShouldBeDisabled() === true) &&
                    <input type="text" className="form-control" defaultValue={content} onChange={this.props.columnEdited} />
                }
                {
                    //(this.props.editable === true && this.state.field === 'createdOn') &&
                    //<Components.DatePicker showIcon={false}/>
                }
                {
                    (this.props.editable === false || this.checkIfShouldBeDisabled() === false) &&
                    <p className="form-control-static">{content}</p>
                }
            </td>
        )
    }
}

export default DataTableColumn;
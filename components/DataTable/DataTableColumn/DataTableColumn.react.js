import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

class DataTableColumn extends Components.ContextComponent
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            editable: this.props.editable || false
        }
    }

    
    onInputChange = (event) => {
        //this.setState({typed: event.target.value});
        console.log('changed');
    }

    render()
    {
        const content = this.props.content;
        return(
            <td>
                {
                    this.props.editable === true &&
                    <input type="text" className="form-control" defaultValue={content} onChange={this.props.columnEdited} />
                }
                {
                    this.props.editable === false &&
                    <p className="form-control-static">{content}</p>
                }
            </td>
        )
    }
}

export default DataTableColumn;
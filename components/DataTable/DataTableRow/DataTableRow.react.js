
import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

import DataTableColumn from '../DataTableColumn';

class DataTableRow extends Components.ContextComponent
{

    constructor(props, context)
    {
        super(props);

        this.state = 
        {
            rowStateClass: '',
            isSelected: true,
            rowData: this.props.rowData
        }
    }

    handleSelectionChange = (event) =>
    {
        this.setState({isSelected: !this.state.isSelected});

        console.log(this.state.isSelected);

        if(this.state.isSelected === true)
        {
            this.changeRowEditState("active");
        }
        else
        {
            this.changeRowEditState("default");
        }
    }

    changeRowEditState = (state) =>
    {

        /* row states:
        name        | color     | class
        ---------------------------------
        saved       | green     | success
        error       | red       | danger
        active      | blue      | info
        edited      | yellow    | warning
        locked      | grey      | active
        default     | white     | default
        */

        switch(state) 
        {
            case 'saved':
                this.setState({ rowStateClass: 'success' })
                break;
            case 'error':
                this.setState({ rowStateClass: 'danger' })
                break;
            case 'active':
                this.setState({ rowStateClass: 'info' })
                break;
            case 'edited':
                this.setState({ rowStateClass: 'warning' })
                break;
            case 'locked':
                this.setState({ rowStateClass: 'active' })
                break;
            case 'default':
            default:
                this.setState({ rowStateClass: '' })
          }
    }

    onColumnEdited(event) {
        this.changeRowEditState("edited");
    }

    render()
    {
        let rowData = this.state.rowData;

        return(
            <tr className={`dataTableRow ${this.state.rowStateClass}`}>
                <td className="selector">
                    <input type="checkbox" onClick={this.handleSelectionChange.bind(this)} tabIndex="-1"/>
                </td>
                
                <DataTableColumn key={rowData.id} content={rowData.id} editable={this.state.isSelected ? false : true} columnEdited={this.onColumnEdited.bind(this)} />
                <DataTableColumn key={rowData.customerId} content={rowData.customerId} editable={this.state.isSelected ? false : true} columnEdited={this.onColumnEdited.bind(this)} />

            </tr>
        )
    }
}

export default DataTableRow;
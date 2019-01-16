/* 
    DataTableRow
    --------------------------------------------------------------
    - Rendering of DataTableColumns according to current row, and its options
    - Determining usage state of current row
*/

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
            isLocked: this.props.isLocked || false,
            isEdited: false,
            isError: false,
            rowData: {}
        }
    }

    componentDidMount = () => 
    {
        this.setState({
            rowData: this.props.rowData
        });

        if (this.state.isLocked === true)
        {
            this.changeRowEditState("locked");
        }
    } 

    handleSelectionChange = (event) =>
    {
        this.setState({isSelected: !this.state.isSelected});

        if(this.state.isSelected === true && this.state.isEdited === false)
        {
            this.changeRowEditState("active");
        }
        else if((this.state.isSelected === true || this.state.isSelected === false) && this.state.isEdited === true)
        {
            this.changeRowEditState("edited");
        }
        else if((this.state.isSelected === true || this.state.isSelected === false) && this.state.isError === true)
        {
            this.changeRowEditState("error");
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

    onColumnEdited = (event) =>
    {
        this.changeRowEditState("edited");

        this.setState({
            isEdited: true
        })
    }

    onColumnError = (event) =>
    {
        this.changeRowEditState("error");

        this.setState({
            isError: true
        })
    }

    getFields = () =>
    {
        let result = [];

        for(let field in this.state.rowData) 
        {
            result.push({
                field, value: (this.state.rowData[field] || "").toString()
            });
        }

        return result;
    }

    render()
    {
        let rowDataFields = this.getFields();

        return(
            <tr className={`dataTableRow ${this.state.rowStateClass}`}>
                <td className="selector">
                {
                    (this.state.isLocked === false) &&
                    <input 
                        type="checkbox" 
                        onClick={this.handleSelectionChange.bind(this)} 
                        tabIndex="-1"
                    />
                }
                </td>
                <td className="num">
                    {
                        (this.props.rowNum + 1)
                    }
                </td>
                {
                    rowDataFields.map((data, i) => 
                    {
                        return (
                            <DataTableColumn 
                                key={i} 
                                content={data.value} 
                                fieldType={data.field} 
                                locked={false} 
                                editable={this.state.isSelected ? false : true} 
                                columnEdited={this.onColumnEdited.bind(this)} 
                                columnError={this.onColumnError.bind(this)} 
                            />
                        )
                    }) 
                }

            </tr>
        )
    }
}

export default DataTableRow;
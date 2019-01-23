/* 
    DataTableRow
    -----------------------------------------------------------------------
    - Rendering of DataTableField according to current row, and its options
    - Check for error in all DataTableField childs
    - Determining usage state of current row

    ╔═╡ ROW STATES ╞═╤═════════════════╤═════════════════════╗
    ║ state-name     │ state-color     │ bootstrap-class     ║
    ╠════════════════╪═════════════════╪═════════════════════╣
    ║ saved          │ green           │ success             ║
    ║ error          │ red             │ danger              ║
    ║ active         │ blue            │ info                ║
    ║ edited         │ yellow          │ warning             ║
    ║ locked         │ grey            │ active              ║
    ║ default        │ white           │ default             ║
    ╚════════════════╧═════════════════╧═════════════════════╝
*/

import React from 'react';

import { Components } from '@opuscapita/service-base-ui';

import DataTableField from '../DataTableField';

import './DataTableRow.less';

class DataTableRow extends Components.ContextComponent
{
    static defaultProps = 
    {
        isLocked: false,
        isHidden: false
    }

    constructor(props, context)
    {
        super(props);

        this.state = 
        {
            rowStateClass: '',
            isSelected: true,
            isLocked: this.props.isLocked,
            isHidden: false,
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

        if((this.state.isSelected === true)) 
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

    onColumnEdited = () =>
    {
        this.setState({
            isEdited: true
        })
    }

    onColumnError = () =>
    {
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
        const rowDataFields = this.getFields();
        const rowNum = this.props.rowNum;

        return(
            <tr className={`dataTableRow ${this.state.rowStateClass} ${this.state.isLocked ? 'unselectable' : ''} ${this.props.isHidden ? 'hidden' : ''}`}>
                <td id={`field_${rowNum}-0`} className={`selector dataTableField`}>
                {
                    (this.state.isLocked === false) &&
                    <input 
                        type="checkbox" 
                        onClick={this.handleSelectionChange.bind(this)} 
                        tabIndex="-1"
                    />
                }
                </td>
                <td id={`field_${rowNum}-1`} className={`num dataTableField`}>
                {
                    (this.props.rowNum + 1)
                }
                </td>
            {
                rowDataFields.map((data, i) => 
                {
                    return (
                        <DataTableField 
                            key={i}
                            rowNum={rowNum}
                            fieldNum={i}
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
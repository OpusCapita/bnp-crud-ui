/* 
    DataTableRow
    -----------------------------------------------------------------------
    - Rendering of DataTableField according to current row, and its options
    - Check for error in all DataTableField childs
    - Determining usage state of current row

    ╔═╡ COMPONENT PROPERTIES ╞═╤═══════════════════════════════════════════════╗
    ║ name                     │ description                                   ║
    ╠══════════════════════════╪═══════════════════════════════════════════════╣
    ║ rowStateClass            │ Component class according to current editing  ║
    ║                          | state.                                        ║
    ║ isSelected               │ Is the current row selected?                  ║
    ║ isLocked                 │ Is the current row locked for editing?        ║
    ║ isHidden                 │ Is the current row visible?                   ║
    ║ isEdited                 │ Has the current row been edited?              ║
    ║ rowData                  │ Data for the current row to display.          ║
    ║ rowNum                   │ ID numbler of current row.                    ║
    ╚══════════════════════════╧═══════════════════════════════════════════════╝

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
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';

import DataTableField from '../DataTableField';
import './DataTableRow.less';

export default class DataTableRow extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);
        
        this.state =
        {
            rowStateClass: '',
            isSelected: true,
            isLocked: this.props.isLocked,
            isEdited: false,
            isError: false,
            rowData: {  }
        }
    }

    static propTypes =
    {
        rowNum: PropTypes.number.isRequired,
        rowData: PropTypes.object.isRequired,
        isLocked: PropTypes.bool.isRequired,
        isHidden: PropTypes.bool.isRequired,
        lockedColumns: PropTypes.array.isRequired,
        notEmptyColumns: PropTypes.array.isRequired
    }

    static defaultProps =
    {
        rowNum: 0,
        rowData: [  ],
        isLocked: false,
        isHidden: false,
        lockedColumns: [  ],
        notEmptyColumns: [  ]
    }
    
    componentDidMount = () =>
    {
        this.setState({
            rowData: this.props.rowData
        });

        if (this.state.isLocked === true)
        {
            this.changeRowEditState('locked');
        }
    }

    handleSelectionChange = (event) =>
    {
        this.setState({isSelected: !this.state.isSelected});

        if((this.state.isSelected === true))
        {
            this.changeRowEditState('active');
        }
        else
        {
            this.changeRowEditState('default');
        }
    }

    changeRowEditState = (state) =>
    {
        switch(state)
        {
            case 'saved':
                this.setState({ rowStateClass: 'success' });
                break;
            case 'error':
                this.setState({ rowStateClass: 'danger' });
                break;
            case 'active':
                this.setState({ rowStateClass: 'info' });
                break;
            case 'edited':
                this.setState({ rowStateClass: 'warning' });
                break;
            case 'locked':
                this.setState({ rowStateClass: 'active' });
                break;
            case 'default':
            default:
                this.setState({ rowStateClass: '' });
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
                field, value: (this.state.rowData[field] || '').toString()
            });
        }

        return result;
    }

    render()
    {
        const { rowNum, isHidden, lockedColumns, notEmptyColumns } = this.props;
        const { rowStateClass, isLocked, isSelected } = this.state;

        const rowDataFields = this.getFields();

        return(
            <tr className={ `dataTableRow ${ rowStateClass } ${ isLocked ? 'unselectable' : '' } ${ isHidden ? 'hidden' : '' }` }>
                <td 
                    id={ `field_${ rowNum }-0` } 
                    className="selector dataTableField"
                >
                {
                    (isLocked === false) &&
                    <input
                        type="checkbox"
                        onClick={ this.handleSelectionChange.bind(this) }
                        tabIndex="-1"
                    />
                }
                </td>
                <td 
                    id={ `field_${ rowNum }-1` } 
                    className="num dataTableField"
                >
                {
                    (rowNum + 1)
                }
                </td>
            {
                rowDataFields.map((data, i) =>
                {
                    return (
                        <DataTableField
                            key={ i }
                            rowNum={ rowNum }
                            fieldNum={ i }
                            content={ data.value }
                            fieldType={ data.field }
                            locked={ false }
                            editable={ isSelected ? false : true }
                            columnEdited={ this.onColumnEdited.bind(this) }
                            columnError={ this.onColumnError.bind(this) }
                            lockedColumns={ lockedColumns }
                            notEmptyColumns={ notEmptyColumns }
                        />
                    )
                })
            }
            </tr>
        )
    }
}

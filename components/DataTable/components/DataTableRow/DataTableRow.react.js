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
        
        this.state = {
            rowDataFields: [  ],
            isSelected: false,
            isLocked: false,
            isEdited: false,
            isError: false,
        }
    }

    static propTypes =
    {
        rowNumber: PropTypes.number.isRequired,
        rowData: PropTypes.object.isRequired,
        isLocked: PropTypes.bool.isRequired,
        lockedColumns: PropTypes.array.isRequired,
        notEmptyColumns: PropTypes.array.isRequired,
        isHidden: PropTypes.bool.isRequired,
    }

    static defaultProps =
    {
        rowNumber: 0,
        rowData: [  ],
        isLocked: false,
        isHidden: false,
        lockedColumns: [  ],
        notEmptyColumns: [  ]
    }

    componentDidMount = () =>
    {
        this.setState({
            rowDataFields: this.getFields(this.props.rowData)
        });
    }

    componentWillReceiveProps = (nextprops) =>
    {
        this.setState({
            rowDataFields: this.getFields(nextprops.rowData)
        });
    }

    handleSelectionChange = (event) =>
    {
        this.setState({isSelected: !this.state.isSelected});
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

    getFields = (data) =>
    {
        let result = [];

        for(let field in data) 
        {
            result.push({
                field, value: (data[field] || '').toString()
            });
        }

        return result;
    }

    render()
    {
        const { rowNumber, isHidden, lockedColumns, isUnselectable, notEmptyColumns, isLocked } = this.props;
        const { isSelected } = this.state;

        const rowDataFields = this.state.rowDataFields;

        return (
            <tr 
                className={ `dataTableRow 
                ${ (isLocked ? 'active' : '' || isSelected ? 'info' : '') }
                ${ isLocked && isUnselectable ? 'unselectable' : '' } 
                ${ isHidden ? 'hidden' : '' }` }
            >
                <td 
                    id={ `field_${ rowNumber }-0` }
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
                    id={ `field_${ rowNumber }-1` } 
                    className="num dataTableField"
                >
                {
                    (rowNumber + 1)
                }
                </td>
                {
                rowDataFields.map((data, i) =>
                {
                    return(
                        <DataTableField
                            key={ i }
                            rowNum={ rowNumber }
                            fieldNum={ i }
                            content={ data.value }
                            fieldType={ data.field }
                            editable={ isSelected ? true : false }
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

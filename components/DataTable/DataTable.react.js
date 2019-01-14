
import React, { Component } from 'react';
import request from 'superagent';

import { Components } from '@opuscapita/service-base-ui';

import DataTableColumn from './DataTableColumn/DataTableColumn.react';

import './DataTable.css';
//import './BootstrapOverwrite.css';

class DataTable extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        this.state = {
            tableData: [],
            showNumberOfRows: 10,
            editingRows: []
        }
    }

    loadTestData = () =>
    {
        const url = this.props.dataUrl;

        request.get(url).then(response =>
        {
            this.setState({
                tableData: response.body
            })
        })
        .catch(errors => null);
    }
    
    componentDidMount = () => 
    {
        this.loadTestData();
    }

    getFields(content) 
    {
        let result = [];
        for(let field in content) {
            result.push({field, value: (content[field] || "").toString()});
        }
        return result;
    }

    render = () =>
    {
        const tableData = this.state.tableData;

        return(
            <div className="dataTableArea">

                <table className="table table-striped table-hover table-bordered dataTableView">
                    <thead className={`dataTableHeader`}>
                        <tr>
                            <th></th>
                            <th className="num">#</th>
                            {
                                this.getFields(tableData[0]).map((head, i) => 
                                {
                                    return(
                                        <th key={i}>{head.field}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody className="dataTableBody">
                        {
                            tableData.map((row, i) => 
                            {
                                return (
                                    <tr key={i} className="dataTableRow ">
                                        <td className="selector">
                                            <input type="checkbox" tabIndex="-1"/>
                                        </td>
                                        <td className="num">{ i + 1 }</td>
                                        {
                                            this.getFields(row).map((column, i) => 
                                            {
                                                return (
                                                    <DataTableColumn key={i} content={column.value} />
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DataTable;
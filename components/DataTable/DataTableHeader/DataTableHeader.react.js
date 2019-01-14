import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

class DataTableHeader extends Components.ContextComponent
{
    constructor (props) 
    {
        super(props);
        
        this.state = { 
            headerData:  {}
        };
    }

    componentDidMount = () =>
    {
        this.setState({
            headerData: this.props.headerData
        });
    }

    getFields = () => 
    {
        let result = [];
        for(let field in this.props.headerData) {
            result.push({field});
        }
        return result;
    }

    render()
    {
        let rowDataFields = this.getFields();

        console.log(rowDataFields);
        
        return(
            <thead className={`dataTableHeader`}>
                <tr>
                    <th></th>
                    <th className="num">#</th>
                    {
                        rowDataFields.map((data) => {
                            return (
                                <th>{data.field}</th>
                            )
                        }) 
                    }
                </tr>
            </thead>
        )
    }
}

export default DataTableHeader;
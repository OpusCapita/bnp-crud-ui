import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

class DataTableHeader extends Components.ContextComponent
{
    constructor (props) 
    {
        super(props);
        
        //this.state = { 
        //    columnData: null
        //};
    }

    componentDidMount () 
    {
        //this.setState({
        //  columnData: this.props.columnData
        //})
    }

    render()
    {

        let columnData = Object.keys(this.props.columnData[0]);

        return(
            <thead>
                <tr>
                    {
                        columnData.map((data) => 
                        {
                            return(
                                <th>{data}</th>
                            )
                        })
                    }
                </tr>
            </thead>
        )
    }
}

export default DataTableHeader;
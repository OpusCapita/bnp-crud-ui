
import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

class DataTableBody extends Components.ContextComponent
{
    render()
    {
        return(
            <tbody>
                {this.props.children}
            </tbody>
        )
    }
}

export default DataTableBody;
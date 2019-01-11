import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

class DataTableFooter extends Components.ContextComponent
{
    render()
    {
        return(
            <tfoot>
                {this.props.children}
            </tfoot>
        )
    }
}

export default DataTableFooter;
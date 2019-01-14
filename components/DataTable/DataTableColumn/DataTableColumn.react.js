import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

class DataTableColumn extends Components.ContextComponent
{
    render()
    {
        const columnContent = this.props.content;

        return(
            <td>
                <p className="form-control-static">{columnContent}</p>
            </td>
        )
    }
}

export default DataTableColumn;
import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';



class DataTableView extends Components.ContextComponent
{
    render()
    {
        return(
            <table className="table table-striped table-hover table-bordered dataTableView">
                {this.props.children}
            </table>
        )
    }
}

export default DataTableView;
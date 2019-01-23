import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

import DataTableSearchBar from '../DataTableSearchBar';

import './DataTableMenu.less';

class DataTableMenu extends Components.ContextComponent
{
    render()
    {
        return (
            <div className="dataTableMenu">
                <DataTableSearchBar />
                {/* Create-Icon */}
                {/* Other Options */}
            </div>
        )
    }
}

export default DataTableMenu;
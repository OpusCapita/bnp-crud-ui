/* 
    DataTableSearchBar
    --------------------------------------------------------------
    - DataTable search functionalities
*/

import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

class DataTableSearchBar extends Components.ContextComponent
{
    render()
    {
        return(
            <div className="form-inline">
                <div className="form-group">
                    <input type="text" className="form-control" id="searchbar" placeholder="Search for..." />
                </div>
            </div>
        )
    }
}

export default DataTableSearchBar;
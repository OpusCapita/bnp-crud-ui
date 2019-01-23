/* 
    DataTableSearchBar
    ----------------------------------
    - DataTable search functionalities
*/

import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';
import translations from '../../i18n';

import './DataTableSearchBar.less';

class DataTableSearchBar extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        context.i18n.register('CrudUI', translations);
    }

    render()
    {
        const { i18n } = this.context;

        return(
            <div className="form-inline">
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="searchbar" 
                        placeholder={i18n.getMessage('CrudUI.SearchBar.Placeholder')}
                    />
                    <br />
                    <br />
                </div>
            </div>
        )
    }
}

export default DataTableSearchBar;
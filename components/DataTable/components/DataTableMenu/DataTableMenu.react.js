import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';

import translations from '../../i18n';
import './DataTableMenu.less';

export default class DataTableMenu extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        context.i18n.register('CrudUI', translations);
    }

    render()
    {
        const { i18n } = this.context;

        return (
            <div className="dataTableMenu">
                <div className="form-inline">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="searchbar"
                            placeholder={ i18n.getMessage('CrudUI.Menu.SearchBar.Placeholder') }
                        />
                        {/* 
                            <button type='submit' className='btn btn-default'>
                                <span className='glyphicon glyphicon-plus'></span> { i18n.getMessage('CrudUI.Menu.Create') }
                            </button>
                         */}
                        {/* Other Option-Buttons */}
                    </div>
                </div>
            </div>
        )
    }
}

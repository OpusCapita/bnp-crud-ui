/* 
    DataTableFooter
    --------------------------------------------------------------
    - Rendering of DataTablePagination
*/

import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

class DataTableFooter extends Components.ContextComponent
{
    render()
    {
        return(
            <section className="dataTableFooter">
                {/* Pagination goes here... */}
            </section>
        )
    }
}

export default DataTableFooter;
import React from 'react';
import { Components } from '@opuscapita/service-base-ui';

import { DataTable } from '../components/DataTable';

export default class Main extends Components.ContextComponent
{
    render()
    {
        const url = '/user/api/users';

        return(
            <DataTable
                dataUrl={ url }
                styles={
                    {
                        striped: true,
                        hovered: true
                    }
                }
                shownRows={ 10 }
                initiallySortedColumn={ 'id' }
                lockedRows={
                    {
                        field: 'customerId',
                        value: [ 'acme_us', 'acme_de' ]
                    }
                }
                lockedColumns={
                    [ 'id', 'status', 'profile' ]
                }
                notEmptyColumns={
                    [ 'customerId', 'createdBy' ]
                }
            />
        );
    }
}

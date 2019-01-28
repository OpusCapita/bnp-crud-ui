import React from 'react';

import { Components } from '@opuscapita/service-base-ui';

import { DataTable } from '../components/DataTable';

class Main extends Components.ContextComponent
{
    render()
    {
        const url = '/user/api/users';

        return(
            <DataTable
                dataUrl={ url }
                styles={ { striped: true, hovered: true } }
                shownRows={ 10 }
                initiallySorted={ 0 }
                lockedRows={ [ 0, 2, 6, 7, 9, 13 ] }
            />
        );
    }
}

export default Main;

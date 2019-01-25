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
                striped={ true }
                hovered={ true }
                rows={ 10 }
            />
        );
    }
}

export default Main;

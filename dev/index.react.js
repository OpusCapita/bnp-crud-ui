import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';

import { Containers, Components } from '@opuscapita/service-base-ui';

import { Main } from '../containers';

class Test extends Components.ContextComponent
{
    render()
    {
        return(
            <div>
                <Main />
            </div>
        );
    }
}

const layout = 
<Containers.ServiceLayout serviceName="bnp-crud-ui">
    <Route path="/" component={Test} />
</Containers.ServiceLayout>

ReactDOM.render(layout, document.getElementById('root'));

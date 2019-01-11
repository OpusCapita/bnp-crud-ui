
import React, { Component } from 'react';

import { Components } from '@opuscapita/service-base-ui';

import { DataTable } from '../components/DataTable';

class Main extends Components.ContextComponent
{
    render()
    {
        const url = '/user/api/users';

        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="dt-buttons btn-group">
                            <button className="btn btn-default buttons-create" type="button">
                                <span className="glyphicon glyphicon-plus"></span> Create
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <DataTable dataUrl={url} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
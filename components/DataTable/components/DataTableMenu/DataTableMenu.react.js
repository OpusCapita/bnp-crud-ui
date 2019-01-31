import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';

import translations from '../../i18n';
import DataTableMenuSearchItem from '../DataTableMenuSearchItem'
import './DataTableMenu.less';

export default class DataTableMenu extends Components.ContextComponent
{
    constructor(props, context)
    {
        super(props);

        context.i18n.register('CrudUI', translations);

        this.state = {
            searchItems: [  ]
        }
    }

    static propTypes =
    {
        options: PropTypes.array.isRequired,
    }

    static defaultProps = 
    {
        options: [  ],
    }

    componentDidMount = () => 
    {
        this.addSearchItem();
    }

    addSearchItem = () =>
    {
        const itemId = Math.floor(Math.random() * (10000 - 0));

        this.setState(prevState => ({
            searchItems: [ ...prevState.searchItems, {id: itemId, field: "", value: ""} ]
        }))
    }

    changeSearchItem = (searchItemValues) =>
    {   
        let itemList = this.state.searchItems;

        itemList.map(function (item) {
            if (item['id'] == searchItemValues.id) {
                item['field'] = searchItemValues.field;
                item['value'] = searchItemValues.value;
            }
        });

        this.setState({
            searchItems: itemList
        });
    }

    deleteSearchItem = (deleteItemId) =>
    {
        let searchItems = this.state.searchItems.filter(function(item) { return item.id != deleteItemId });
        
        this.setState({ searchItems: searchItems });
    }

    render()
    {
        const { i18n } = this.context;
        const { searchItems } = this.state;
        
        let options = this.props.options;

        return (
            <div className="dataTableMenu">
                <div className="form-inline">
                    <div className="form-group">

                        <div className="search-bar">
                            
                            <div className="input-group">
                                <span
                                    className="input-group-addon"
                                    id="sizing-addon2"
                                >
                                    { i18n.getMessage('CrudUI.Menu.SearchBar.SearchFor') }:
                                </span>

                                {
                                    searchItems.map((item, i) =>
                                    {
                                        if(i <= 4)
                                        {
                                            return(
                                                <DataTableMenuSearchItem
                                                    key={ i }
                                                    options={ options }
                                                    field={ item }
                                                    deleteSearchItem={ this.deleteSearchItem.bind(this, item.id) }
                                                    changeSearchItem={ this.changeSearchItem.bind(this) }
                                                />
                                            )
                                        }
                                    })
                                }

                                {
                                    searchItems.length <= 4 &&
                                    <span className="input-group-btn">
                                        <button 
                                            className="btn btn-default" 
                                            type="button"
                                            onClick={this.addSearchItem}
                                        >
                                            <span className='glyphicon glyphicon-plus'></span>
                                        </button>
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

import React from 'react';
import ProvidersTableRow from './ProvidersTableRow';

var ProvidersTable = React.createClass({
    getDefaultProps: function () {
        return { 
            providers: [],
            selectedProviders: {}
        };
    },

    onClick: function (provider) {
        this.props.onRowClick(provider);
    },

    render: function () {
        let providers = this.props.providers;

        let providerRows = providers.map(provider => {
            let isSelected = this.props.selectedProviders[provider.id] ? true : false;
            return (<ProvidersTableRow
                provider={provider}
                onClick={this.onClick}
                selected={isSelected} />)
        });

        let tableElem = providerRows.length == 0 ? <div /> : (
            <div id="providers-table-div">

                <table id="providers-table" className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                    <thead>
                        <tr>
                            <th >ID</th>
                            <th className="name mdl-data-table__cell--non-numeric">Nombre</th>
                        </tr>
                    </thead>

                    <tbody>
                        {providerRows}
                    </tbody>
                </table>
            </div>
        );

        return tableElem;
    }
});

export default ProvidersTable;
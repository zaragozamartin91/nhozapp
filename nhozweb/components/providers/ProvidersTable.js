import React from 'react';
import ProvidersTableRow from './ProvidersTableRow';

var ProvidersTable = React.createClass({
    getInitialState: function () {
        return {
            selectedProviders: []
        }
    },

    getDefaultProps: function () {
        return { providers: [] };
    },

    onRowClick: function (provider) {
        console.log("onRowClick provider:");
        console.log(provider);
        
        let selectedProviders = this.state.selectedProviders;
        let selectedProviderIndex = selectedProviders.indexOf(provider.id);
        if (selectedProviderIndex >= 0) {
            selectedProviders.splice(selectedProviderIndex, 1);
        } else {
            selectedProviders.push(provider.id);
        }
        console.log('selectedProviders: ');
        console.log(selectedProviders);

        this.setState({ selectedProviders: selectedProviders });
    },

    render: function () {
        let providers = this.props.providers;

        let providerRows = providers.map(provider => {
            let isSelected = this.state.selectedProviders.indexOf(provider.id) >= 0;
            return (<ProvidersTableRow
                provider={provider}
                onClick={this.onRowClick}
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
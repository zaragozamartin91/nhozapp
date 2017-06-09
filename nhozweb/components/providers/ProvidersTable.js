import React from 'react';

var ProvidersTable = React.createClass({
    getDefaultProps: function() {
        return { providers: [] };
    },

    render: function () {
        let providers = this.props.providers;

        let providerRows = providers.map(provider => {
            return (
                <tr>
                    <td className="mdl-data-table__cell--non-numeric id-cell">{provider.id}</td>
                    <td className="mdl-data-table__cell--non-numeric name-cell">{provider.name}</td>
                </tr>
            );
        });

        let tableElem = providerRows.length == 0 ? <div /> : (
            <div id="providers-table-div">

                <table id="providers-table" className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                    <thead>
                        <tr>
                            <th className="id mdl-data-table__cell--non-numeric">ID</th>
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
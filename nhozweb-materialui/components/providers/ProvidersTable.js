import React from 'react';
import ProvidersTableRow from './ProvidersTableRow';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

var ProvidersTable = React.createClass({
    getDefaultProps: function () {
        return {
            providers: [],
            selectedProviders: {},
            onRowSelection: () => {}
        };
    },

    // onClick: function (provider) {
    //     this.props.onRowClick(provider);
    // },

    onRowSelection: function(selectedRows) {
        let selectedProviders = {};

        selectedRows.map(rowIndex => {
            let provider = this.props.providers[rowIndex];
            selectedProviders[provider.id] = provider;
        });

        this.props.onRowSelection(selectedProviders);
    },

    render: function () {
        let providers = this.props.providers;

        // let providerRows = providers.map(provider => {
        //     let isSelected = this.props.selectedProviders[provider.id] ? true : false;
        //     return (<ProvidersTableRow
        //         provider={provider}
        //         onClick={this.onClick}
        //         selected={isSelected} />)
        // });

        // let tableElem = providerRows.length == 0 ? <div /> : (
        //     <div id="providers-table-div">

        //         <table id="providers-table" className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        //             <thead>
        //                 <tr>
        //                     <th >ID</th>
        //                     <th className="name mdl-data-table__cell--non-numeric">Nombre</th>
        //                 </tr>
        //             </thead>

        //             <tbody>
        //                 {providerRows}
        //             </tbody>
        //         </table>
        //     </div>
        // );

        let providerRows = providers.map(provider => {
            let isSelected = this.props.selectedProviders[provider.id] ? true : false;
            return (
                <TableRow selected={isSelected}>
                    <TableRowColumn>{provider.id}</TableRowColumn>
                    <TableRowColumn>{provider.name}</TableRowColumn>
                </TableRow>
            )
        });

        return (
            <Table multiSelectable={true} onRowSelection={this.onRowSelection}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Nombre</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {providerRows}
                </TableBody>
            </Table>
        );
    }
});

export default ProvidersTable;
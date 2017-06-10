import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

import ProviderForm from './ProviderForm';
import AddProviderButton from './AddProviderButton';
import ProvidersTable from './ProvidersTable';

var ProvidersApp = React.createClass({
    getInitialState: function () {
        return {
            providerId: "",
            providerName: "",
            errMsg: "",
            succMsg: "",
            providers: [],
            selectedProviders: {}
        }
    },

    onProviderIdChange: function (pid) {
        this.setState({ providerId: pid });
    },

    onProviderNameChange: function (pname) {
        this.setState({ providerName: pname });
    },

    onAddProviderClick: function () {
        console.log(`onAddProviderClick: ${this.state.providerId} ${this.state.providerName}`);

        let newProvider = {
            id: this.state.providerId,
            name: this.state.providerName
        };

        if (newProvider.id && newProvider.name) {
            /* ENVIO UN POST PARA AGREGAR UN PROVEEDOR.
            USO axios COMO BIBLIOTECA PAR HACER LLAMADAS AJAX */
            axios.post('/api/providers/add', newProvider)
                .then(response => {
                    /** SI TODO SALIO BIEN, CAMBIO EL ESTADO DEL COMPONENTE ACTUALIZANDO EL MENSAJE DE EXITO O DE ERROR*/
                    console.log(response);
                    if (response.data.ok) {
                        let providers = this.state.providers;
                        providers.push(newProvider);
                        this.setState({
                            succMsg: response.data.ok,
                            providers: providers,
                            errMsg: ""
                        });
                    } else if (response.data.err) {
                        this.setState({ 
                            errMsg: response.data.err,
                            succMsg: ""
                        });
                    }
                }).catch(error => {
                    /** SI SALIO MAL, CAMBIO EL ESTADO DEL COMPONENTE ACTUALIZANDO EL MENSAJE DE FALLA */
                    console.error(error);
                    this.setState({ 
                        errMsg: error,
                        succMsg: ""
                    });
                });
        } else {
            this.setState({
                errMsg: "Ingresar todos los datos del proveedor",
                succMsg: ""
            });
        }
    },

    onRowClick: function (selectedProviders) {
        this.setState({ selectedProviders: selectedProviders });
    },

    componentDidMount: function () {
        console.log("ProvidersApp did mount!");
        axios.get('/api/providers')
            .then(response => {
                console.log(response);
                if (response.data.err) {
                    this.setState({ errMsg: response.data.err });
                } else {
                    this.setState({ providers: response.data.providers });
                }
            }).catch(error => {
                console.error(error);
                this.setState({ errMsg: error });
            });
    },

    render: function () {
        return (
            <div>
                <div className="err-div"><span>{this.state.errMsg}</span></div>

                <div className="succ-div"><span>{this.state.succMsg}</span></div>

                <ProviderForm
                    onProviderIdChange={this.onProviderIdChange}
                    onProviderNameChange={this.onProviderNameChange} />

                <AddProviderButton onClick={this.onAddProviderClick} />

                <ProvidersTable
                    providers={this.state.providers}
                    onRowClick={this.onRowClick}
                    selectedProviders={this.state.selectedProviders} />
            </div>
        );
    }
});

ReactDom.render(
    <ProvidersApp />,
    document.getElementById('app')
);
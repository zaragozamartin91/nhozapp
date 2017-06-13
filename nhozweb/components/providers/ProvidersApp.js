import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

import ProviderForm from './ProviderForm';
import AddProviderButton from './AddProviderButton';
import DeleteProvidersButton from './DeleteProvidersButton';
import ProvidersTable from './ProvidersTable';

var ProvidersApp = React.createClass({
    getInitialState: function () {
        return {
            errMsg: "",
            succMsg: "",
            providers: [],
            selectedProviders: {},
            currProvider: {
                id: "",
                name: ""
            }
        }
    },

    onProviderIdChange: function (pid) {
        let provider = this.state.currProvider;
        provider.id = pid;
        this.setState({ currProvider: provider });
    },

    onProviderNameChange: function (pname) {
        let provider = this.state.currProvider;
        provider.name = pname;
        this.setState({ currProvider: provider });
    },

    onAddProviderClick: function () {
        let newProvider = this.state.currProvider;
        console.log(`onAddProviderClick: ${newProvider.providerId} ${newProvider.providerName}`);

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

    __filterProviders: function (providers, selectedProviders) {
        return providers.filter(provider => selectedProviders[provider.id] ? false : true);
    },

    onDeleteProvidersClick: function () {
        let selectedProviders = this.state.selectedProviders;
        let providerIds = Object.keys(selectedProviders);

        if (providerIds.length == 0) {
            this.setState({
                errMsg: "No se seleccionaron proveedores",
                succMsg: ""
            });
        } else {
            axios.post('/api/providers/delete', { providerIds: providerIds })
                .then(response => {
                    console.log(response);
                    if (response.data.ok) {
                        let providers = this.__filterProviders(this.state.providers, selectedProviders);
                        this.setState({
                            succMsg: response.data.ok,
                            errMsg: "",
                            providers: providers,
                            selectedProviders: {}
                        });
                    } else if (response.data.err) {
                        this.setState({
                            succMsg: "",
                            errMsg: response.data.err
                        });
                    }
                }).catch(error => {
                    this.setState({
                        succMsg: "",
                        errMsg: error
                    });
                });
        }
    },

    onRowClick: function (provider) {
        console.log("onRowClick provider:");
        console.log(provider);
        
        let selectedProviders = this.state.selectedProviders;
        if(selectedProviders[provider.id]) {
            delete selectedProviders[provider.id];
        } else {
            selectedProviders[provider.id] = provider;
        }

        console.log('selectedProviders: ');
        console.log(selectedProviders);

        this.setState({selectedProviders: selectedProviders});
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
                    onProviderNameChange={this.onProviderNameChange} 
                    provider={this.state.currProvider} />

                <AddProviderButton onClick={this.onAddProviderClick} />

                <DeleteProvidersButton onClick={this.onDeleteProvidersClick} />

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
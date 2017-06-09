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
            providers: []
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

        /* ENVIO UN POST PARA AGREGAR UN PROVEEDOR.
        USO axios COMO BIBLIOTECA PAR HACER LLAMADAS AJAX */
        axios.post('/api/providers/add', {
            id: this.state.providerId,
            name: this.state.providerName
        }).then(response => {
            /** SI TODO SALIO BIEN, CAMBIO EL ESTADO DEL COMPONENTE ACTUALIZANDO EL MENSAJE DE EXITO O DE ERROR*/
            console.log(response);
            if (response.data.ok) {
                this.setState({ succMsg: response.data.ok });
            } else if (response.data.err) {
                this.setState({ errMsg: response.data.err });
            }
        }).catch(error => {
            /** SI SALIO MAL, CAMBIO EL ESTADO DEL COMPONENTE ACTUALIZANDO EL MENSAJE DE FALLA */
            console.error(error);
            this.setState({ errMsg: error });
        });
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

                <ProvidersTable providers={this.state.providers} />
            </div>
        );
    }
});

ReactDom.render(
    <ProvidersApp />,
    document.getElementById('app')
);
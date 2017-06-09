import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

import ProviderForm from './ProviderForm';
import AddProviderButton from './AddProviderButton';

var ProvidersApp = React.createClass({
    getInitialState: function () {
        return {
            providerId: "",
            providerName: "",
            errMsg: "",
            succMsg: ""
        }
    },

    onProviderIdChange: function (pid) {
        console.log(`onProviderIdChange: ${pid}`);
        this.setState({ providerId: pid });
    },

    onProviderNameChange: function (pname) {
        console.log(`onProviderNameChange: ${pname}`);
        this.setState({ providerName: pname });
    },

    onAddProviderClick: function () {
        console.log(`onAddProviderClick: ${this.state.providerId} ${this.state.providerName}`);

        /* ENVIO UN POST PARA AGREGAR UN PROVEEDOR */
        axios.post('/api/providers/add', {
            id: this.state.providerId,
            name: this.state.providerName
        }).then( response => {
            /** SI TODO SALIO BIEN, CAMBIO EL ESTADO DEL COMPONENTE ACTUALIZANDO EL MENSAJE DE EXITO O DE ERROR*/
            console.log(response);
            if(response.data.ok) {
                this.setState({succMsg: response.data.ok});
            } else if(response.data.err) {
                this.setState({errMsg: response.data.err});
            }
        }).catch( error => {
            /** SI SALIO MAL, CAMBIO EL ESTADO DEL COMPONENTE ACTUALIZANDO EL MENSAJE DE FALLA */
            console.error(error);
            this.setState({errMsg: error});
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
            </div>
        );
    }
});

ReactDom.render(
    <ProvidersApp />,
    document.getElementById('app')
);
import React from 'react';
import TextField from 'material-ui/TextField';

var ProviderForm = React.createClass({
    getDefaultProps: function () {
        return {
            provider: {
                id: "",
                name: ""
            }
        }
    },

    handleIdChange: function (event) {
        var providerId = event.target.value;
        console.log(`handleIdChange: ${providerId}`);
        this.props.onProviderIdChange(providerId);
    },

    handleNameChange: function (event) {
        var providerName = event.target.value;
        console.log(`handleNameChange: ${providerName}`);
        this.props.onProviderNameChange(providerName);
    },

    onIdChange: function (event, newId) {
        this.props.onProviderIdChange(newId);
    },

    onNameChange: function (event, newName) {
        this.props.onProviderNameChange(newName);
    },

    render: function () {
        return (
            <div style={{width: '100%'}}>
                <TextField hintText="ID" onChange={this.onIdChange} value={this.props.provider.id} />
                <TextField hintText="Nombre" onChange={this.onNameChange} value={this.props.provider.name} />
            </div>
        );

        // return (
        //     <form id="add-provider-form" method="post">
        //         <div className="add-provider-textfield mdl-textfield mdl-js-textfield">
        //             <input
        //                 className="mdl-textfield__input"
        //                 type="text" id="add-provider-id"
        //                 name="id"
        //                 onChange={this.handleIdChange}
        //                 value={this.props.provider.id} />
        //             <label className="mdl-textfield__label" htmlFor="add-provider-id">ID</label>
        //         </div>

        //         <div className="add-provider-textfield mdl-textfield mdl-js-textfield">
        //             <input 
        //                 className="mdl-textfield__input" 
        //                 type="text" 
        //                 id="add-provider-name" 
        //                 name="name" 
        //                 onChange={this.handleNameChange}
        //                 value={this.props.provider.name} />
        //             <label className="mdl-textfield__label" htmlFor="add-provider-name">Nombre</label>
        //         </div>
        //     </form>
        // );
    }
});

export default ProviderForm;
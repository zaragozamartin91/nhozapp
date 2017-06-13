import React from 'react';

var ProviderForm = React.createClass({
    getDefaultProps: function() {
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

    render: function () {
        return (
            <form id="add-provider-form" method="post">
                <div className="add-provider-textfield mdl-textfield mdl-js-textfield">
                    <input
                        className="mdl-textfield__input"
                        type="text" id="add-provider-id"
                        name="id"
                        onChange={this.handleIdChange}
                        value={this.props.provider.id} />
                    <label className="mdl-textfield__label" htmlFor="add-provider-id">ID</label>
                </div>

                <div className="add-provider-textfield mdl-textfield mdl-js-textfield">
                    <input 
                        className="mdl-textfield__input" 
                        type="text" 
                        id="add-provider-name" 
                        name="name" 
                        onChange={this.handleNameChange}
                        value={this.props.provider.name} />
                    <label className="mdl-textfield__label" htmlFor="add-provider-name">Nombre</label>
                </div>
            </form>
        );
    }
});

export default ProviderForm;
import React from 'react';

var AddProviderButton = React.createClass({
    render: function () {
        return (
            <button
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
                id="add-provider-button"
                onClick={this.props.onClick}>
                Agregar
            </button>
        );
    }
});

export default AddProviderButton;
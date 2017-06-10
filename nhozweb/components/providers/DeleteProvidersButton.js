import React from 'react';

function DeleteProvidersButton(props) {
    return (
        <button
            id="delete-providers-button"
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
            onClick={props.onClick}>
            Eliminar seleccionados
            </button>
    );
}

export default DeleteProvidersButton;
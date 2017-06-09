import React from 'react';

var ProvidersTableRow = React.createClass({
    handleClick: function (e) {
        this.props.onClick(this.props.provider);
    },

    render: function () {
        let provider = this.props.provider;
        let style = this.props.selected ? {
            background: "rgba(63, 81, 181, 0.7)",
            color: "white"
        } : {};

        return (
            <tr style={style} onClick={this.handleClick} >
                <td >{provider.id}</td>
                <td className="mdl-data-table__cell--non-numeric name-cell">{provider.name}</td>
            </tr>
        );
    }
});


export default ProvidersTableRow;
import React from 'react';
import ReactDom from 'react-dom';

var Index = React.createClass({
    render: function() {
        return <h1>Bienvenido a NHOZ!</h1>;
    }
});

console.log("app div:");
console.log(document.getElementById('app'));

ReactDom.render(
    <Index />,
    document.getElementById('app')
);
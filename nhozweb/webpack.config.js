const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        index: path.join(__dirname, 'components', 'Index.js'),
        providers: path.join(__dirname, 'components', 'providers' , 'ProvidersApp.js')
    },

    /* Se creara un archivo por cada entrada */
    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, 'public', 'javascripts')
    },

    /* Indicamos que deseamos utilizar Babel para compilar los componentes excluyendo 
    al directorio node_modules. */
    module: {
        loaders: [{
            test: path.join(__dirname, 'components'),
            loader: ['babel-loader'],
            exclude: /node_modules|bower_components/
        }]
    },

    /* La siguiente instruccion hace que sea posible mapear los errores en runtime con el codigo fuente 
    de React. Al ocurrir un error, ir a la consola de chrome o firefox y la linea de codigo del error
    correspondera al archivo fuente de react y no al del bundle. Para mas informacion ir a 
    https://webpack.js.org/configuration/devtool/ */
    devtool: 'inline-source-map',

    /* El siguiente plugin colocara todo el codigo en comun en un archivo common.js */
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(["common"]),
    ]
};

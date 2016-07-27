const webpack = require('webpack')
const path = require('path')

module.exports = {
    devtool: 'source-map',
    entry: {
        vendors: ['backbone', 'handlebars/runtime', 'jed'],
        index: 'index',
    },
    output: {
        path: './public',
        filename: './js/[name].js',
    },
    module: {
        loaders: [
            {test: /src\/.*\.js$/, loader: 'babel', query: {presets: ['stage-0', 'es2015']}},
            {test: /src\/.*\.hbs$/, loader: 'handlebars', query: {knownHelpers: ['ngettext']}},
            {test: /src\/.*\.po$/, loader: 'json!po?format=jed1.x'},
        ]
    },
    resolve: {
        root: [path.resolve('./src')],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', './js/vendors.js'),
    ]
}

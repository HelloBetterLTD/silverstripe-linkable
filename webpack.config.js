const webpack = require('webpack');
const { JavascriptWebpackConfig, CssWebpackConfig } = require('@silverstripe/webpack-config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PATHS = require('./webpack-vars');

const config = [
    // Main JS bundles
    new JavascriptWebpackConfig('js', PATHS, 'silverstripers/silverstripe-linkable')
        .setEntry({
            bundle: `${PATHS.SRC}/bundles/bundle.js`,
        })
        .getConfig(),
    // sass to css
    new CssWebpackConfig('css', PATHS)
        .setEntry({
            bundle: `${PATHS.SRC}/styles/bundle.scss`,
        })
        .getConfig(),
];

// Use WEBPACK_CHILD=js or WEBPACK_CHILD=css env var to run a single config
module.exports = (process.env.WEBPACK_CHILD)
    ? config.find((entry) => entry.name === process.env.WEBPACK_CHILD)
    : config;




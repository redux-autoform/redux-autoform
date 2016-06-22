import fs from 'fs';
import React from 'react';
import express from 'express';
import path from 'path';
import webpackConfig from '../webpack/webpack.config.demo.dev';
import colors from 'colors';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';

const webpackCompiler = webpack(webpackConfig);

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const development = process.env.NODE_ENV !== 'production';
let app = express();

if (development) {
    app.use(webpackMiddleware(webpackCompiler));
    app.use(webpackHotMiddleware(webpackCompiler));
    app.use(function renderApp(req, res) {

            let wrap = require('./pages/BasePage.html')
                .replace(/\$\{cssBundlePath\}/g, '')
                .replace(/\$\{jsBundlePath\}/g, '/bundle.js');
            res.status(200).send(wrap);

        });
} else {
    app.use(express.static(path.join(__dirname, '../demo-built')));
}

app
    .listen(4000, '0.0.0.0', function () {
        console.log(colors.green(`React-metaform started at http://localhost:4000/redux-autoform/demo.html. NODE_ENV: ${process.env.NODE_ENV}`));
    });

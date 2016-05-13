import fs from 'fs';
import React from 'react';
import express from 'express';
import path from 'path';
import webpackConfig from '../webpack/webpack.config.demo.prod.js';
import colors from 'colors';

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const development = process.env.NODE_ENV !== 'production';
let app = express();

if (development) {

    webpackConfig.output.path = '/';
    webpackConfig.output.publicPath = undefined;

    app = app
        .use(function renderApp(req, res) {

            let wrap = require('./pages/BasePage.html')
                .replace(/\$\{cssBundlePath\}/g, '')
                .replace(/\$\{jsBundlePath\}/g, 'http://localhost:8082/assets/bundle.js');
            res.status(200).send(wrap);

        });
} else {
    app = app
        .use(express.static(path.join(__dirname, '../demo-built')));
}

app
    .listen(4000, function () {
        console.log(colors.green(`React-metaform started at http://localhost:4000/react-metaform/demo.html. NODE_ENV: ${process.env.NODE_ENV}`));
    });

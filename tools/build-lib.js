import path from 'path';
import fsep from 'fs-extra-promise';
import rimraf from 'rimraf-promise';
import colors from 'colors';
import { exec } from 'child-process-promise';

const repoRoot = path.resolve(__dirname, '../');
const lib = path.join(repoRoot, 'lib');
const lessSrc = path.join(repoRoot, '/src/less');
const lessDest = path.join(lib, '/less');

console.log('building lib'.green);

rimraf(lib)
    .then(function (error) {
        let babelCli = '"./node_modules/.bin/babel" src -d lib';
        return exec(babelCli).fail(function (error) {
            console.log(colors.red(error))
        });
    })
    .then(() => fsep.copyAsync(lessSrc, lessDest))
    .then(() => console.log('lib built'.green));

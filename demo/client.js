import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import DevTools from './components/DevTools';
import AutoForm from '../src/AutoForm';
import { EditComponentFactory } from './componentFactory/index';
import ButtonToolbar from './components/ButtonToolbar';
import './componentFactory/styles/styles.less';
import './componentFactory/styles/styles-defaultfactories.less';
import '../node_modules/bootstrap/less/bootstrap.less';

const store = configureStore();

let schema = {
    name: {
        displayName: 'Name',
        type: 'string',
        displayName: 'Name'
    },
    age: {
        displayName: 'Age',
        type: 'string',
        displayName: 'Age'
    }
};

let autoFormProps = {
    form: 'demo',
    schema:  schema,
    componentFactory: EditComponentFactory,
    buttonBar: ButtonToolbar,
    onSubmit: (...args) => console.log(args),
    overwriteOnInitialValuesChange: undefined,
    initialValues: {}
};

render(
    <Provider store={store}>
        <div>
            <AutoForm {...autoFormProps} />
            <DevTools />
        </div>
    </Provider>,
    document.getElementById('#app_container')
);
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import DevTools from './components/DevTools';
import AutoForm from '../src/AutoForm';
import { getDemoFactory } from './demoFactory/demoFactoryHelper';
import ButtonToolbar from './components/ButtonToolbar';

const store = configureStore();

let schema = {
    name: {
        type: 'string',
        displayName: 'Name'
    }
};

let autoFormProps = {
    form: 'demo',
    schema:  schema,
    componentFactory: getDemoFactory(),
    buttonBar: ButtonToolbar,
    onSubmit: (...args) => console.log(args)
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
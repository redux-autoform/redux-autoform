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

import persons from './schemas/PersonSchema'

const store = configureStore();

import moment from 'moment';
import numbro from 'numbro';
import momentLocalizer from 'redux-autoform-utils/lib/localization/momentLocalizer';
import numbroLocalizer from 'redux-autoform-utils/lib/localization/numbroLocalizer';

momentLocalizer(moment);
numbroLocalizer(numbro);

let schema = {
    name: {
        displayName: 'Name',
        type: 'string',
        name: 'name',
        help: (m) => m.name,
        required: true,
	    styles: {
		    bleh: "bleh"
	    }
    },
    age: {
        displayName: 'Age',
        type: 'string',
        name: 'age'
    },
	email: {
		displayName: 'Email',
		type: 'string',
		name: 'email',
		styles: {
			bleh: "bleh"
		}
	},
	address: {
		displayName: 'Address',
		type: 'string',
		name: 'address',
		styles: {
			bleh: "bleh"
		}
	},
	city: {
		displayName: 'City',
		type: 'string',
		name: 'city',
		styles: {
			bleh: "bleh"
		}
	}
};

let autoFormProps = {
    form: 'demo',
    schema:  schema,
    componentFactory: EditComponentFactory,
    buttonBar: ButtonToolbar,
    onSubmit: form => console.log(JSON.stringify(form, null, 2)),
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
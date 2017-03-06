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
import 'bootstrap/less/bootstrap.less';

import persons from './schemas/PersonSchema'

console.info(JSON.stringify(persons, null, 2));

const store = configureStore();

import moment from 'moment';
import numbro from 'numbro';
import momentLocalizer from 'redux-autoform-utils/lib/localization/momentLocalizer';
import numbroLocalizer from 'redux-autoform-utils/lib/localization/numbroLocalizer';

momentLocalizer(moment);
numbroLocalizer(numbro);

const schema1 = {
	entities: [
		{
			name: "contact",
			fields: [
				{ name: "f1", type: "string" },
				{ name: "f2", type: "string" },
				{ name: "f3", type: "string" },
				{ name: "f4", type: "string" },
				{ name: "f5", type: "string" },
				{ name: "f6", type: "string" },
				{ name: "f7", type: "string" },
				{ name: "f8", type: "string" },
			],
			layouts: [
				{
					name: 'edit',
					groups: [
						{
							title: 'Vertical layout (default)',
							fields: [
								{
									name: 'f1',
									displayName: "Field 1",
									styles: {
										bleh: "bleh"
									}
								},
								{
									name: 'f2',
									displayName: "Field 2",
									size: 8,
									styles: {
										bleh: "bleh"
									}
								}
							]
						},
						{
							title: 'Horizontal layout',
							orientation: 'horizontal',
							fields: [
								{
									name: 'f3',
									displayName: "Field 3",
									styles: {
										bleh: "bleh"
									}
								},
								{
									name: 'f4',
									displayName: "Field 4",
									styles: {
										bleh: "bleh"
									}
								}
							]
						},
						{
							title: 'Horizontal layout with custom sizes',
							orientation: 'horizontal',
							fields: [
								{
									name: 'f5',
									displayName: "Field 5",
									size: 4,
									styles: {
										bleh: "bleh"
									}
								},
								{
									name: 'f6',
									displayName: "Field 6",
									size: 8,
									styles: {
										bleh: "bleh"
									}
								}
							]
						},
						{
							title: 'Horizontal layout with custom inner sizes',
							orientation: 'horizontal',
							fields: [
								{
									name: 'f7',
									displayName: "Field 7",
									innerSize: 3,
									styles: {
										bleh: "bleh"
									}
								},
								{
									name: 'f8',
									displayName: "Field 8",
									innerSize: 3,
									styles: {
										bleh: "bleh"
									}
								}
							]
						}
					]
				}
			]
		}
	]
}


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
        name: 'age',
	    styles: {
		    bleh: "bleh"
	    }
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
	layoutName: 'edit',
    schema:  schema1,
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
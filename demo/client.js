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

//import persons from './schemas/PersonSchema'
//import Form from '../src/model/Form';

//console.info(JSON.stringify(persons, null, 2));

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
                { name: "f9", type: "string" },
                { name: "f10", type: "string" },
                { name: "f11", type: "string" },
                { name: "f12", type: "string" },
                { name: "f13", type: "string" },
                { name: "f14", type: "string" },
                { name: "f15", type: "string" },
                { name: "f16", type: "string" },
                { name: "f17", type: "string" },
                { name: "f18", type: "string" },
                { name: "f19", type: "string" },
                { name: "f20", type: "string" },
                { name: "f21", type: "string" },
                { name: "f22", type: "string" },
                { name: "f23", type: "string" },
                { name: "f24", type: "string" },
                { name: "f25", type: "string" },
                { name: "f26", type: "string" },
                { name: "f27", type: "string" },
                { name: "f28", type: "string" },
                { name: "f29", type: "string" },
                { name: "f30", type: "string" },
                { name: "f31", type: "string" },
                { name: "f32", type: "string" },
                { name: "f33", type: "string" },
                { name: "f34", type: "string" },
                { name: "f35", type: "string" },
                { name: "f36", type: "string" },
                { name: "f37", type: "string" },
                { name: "f38", type: "string" },
                { name: "f39", type: "string" },
                { name: "f40", type: "string" }
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
									size: 8,
									styles: {
										bleh: "bleh"
									}
								},
								{
									name: 'f8',
									displayName: "Field 8",
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
                                    name: 'f9',
                                    displayName: "Field 9",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f10',
                                    displayName: "Field 10",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f11',
                                    displayName: "Field 11",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f12',
                                    displayName: "Field 12",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f13',
                                    displayName: "Field 13",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f14',
                                    displayName: "Field 14",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f15',
                                    displayName: "Field 15",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f16',
                                    displayName: "Field 16",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                }
                                ,{
                                    name: 'f17',
                                    displayName: "Field 17",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f18',
                                    displayName: "Field 18",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                }
                                ,{
                                    name: 'f19',
                                    displayName: "Field 19",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f20',
                                    displayName: "Field 20",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f21',
                                    displayName: "Field 21",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f22',
                                    displayName: "Field 22",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f23',
                                    displayName: "Field 23",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f24',
                                    displayName: "Field 24",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f25',
                                    displayName: "Field 25",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f26',
                                    displayName: "Field 26",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f27',
                                    displayName: "Field 27",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f28',
                                    displayName: "Field 28",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f29',
                                    displayName: "Field 29",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f30',
                                    displayName: "Field 30",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f31',
                                    displayName: "Field 31",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f32',
                                    displayName: "Field 32",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f33',
                                    displayName: "Field 33",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f34',
                                    displayName: "Field 34",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f35',
                                    displayName: "Field 35",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f36',
                                    displayName: "Field 36",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f37',
                                    displayName: "Field 37",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f38',
                                    displayName: "Field 38",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f39',
                                    displayName: "Field 39",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f40',
                                    displayName: "Field 40",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f9',
                                    displayName: "Field 9",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f10',
                                    displayName: "Field 10",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f9',
                                    displayName: "Field 9",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f10',
                                    displayName: "Field 10",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f9',
                                    displayName: "Field 9",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f10',
                                    displayName: "Field 10",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f9',
                                    displayName: "Field 9",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f10',
                                    displayName: "Field 10",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f9',
                                    displayName: "Field 9",
                                    size: 8,
                                    styles: {
                                        bleh: "bleh"
                                    }
                                },
                                {
                                    name: 'f10',
                                    displayName: "Field 10",
                                    size: 8,
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

const personSchema = {
    "entities": [
        {
            "name": "person",
            "fields": [
                {
                    "name": "name",
                    "type": "string"
                },
                {
                    "name": "lastName",
                    "type": "string"
                },
                {
                    "name": "location",
                    "type": "string"
                },
                {
                    "name": "email",
                    "type": "string"
                },
                {
                    "name": "phoneNumber",
                    "type": "string"
                },
                {
                    "name": "age",
                    "type": "string"
                }
            ],
            "layouts": [
                {
                    "name": "edit",
                    "component": "Group",
                    "groups": [
                        {
                            "title": "Person",
                            "orientation": "horizontal",
                            "fields": [
                                {
                                    "name": "name",
                                    "displayName": "Name",
                                    "styles": {
                                        "containerClassName": "form-group row",
                                        "labelClassName": "col-4 col-form-label",
                                        "inputClassName": "col-8 form-control"
                                    }
                                },
                                {
                                    "name": "lastName",
                                    "displayName": "Last Name",
                                    "styles": {
                                        "containerClassName": "form-group row",
                                        "labelClassName": "col-4 col-form-label",
                                        "inputClassName": "col-8 form-control"
                                    }
                                },
                                {
                                    "name": "location",
                                    "displayName": "Location",
                                    "styles": {
                                        "containerClassName": "form-group row",
                                        "labelClassName": "col-4 col-form-label",
                                        "inputClassName": "col-8 form-control"
                                    }
                                },
                                {
                                    "name": "email",
                                    "displayName": "Email",
                                    "styles": {
                                        "containerClassName": "form-group row",
                                        "labelClassName": "col-4 col-form-label",
                                        "inputClassName": "col-8 form-control"
                                    }
                                },
                                {
                                    "name": "phoneNumber",
                                    "displayName": "Phone Number",
                                    "styles": {
                                        "containerClassName": "form-group row",
                                        "labelClassName": "col-4 col-form-label",
                                        "inputClassName": "col-8 form-control"
                                    }
                                },
                                {
                                    "name": "age",
                                    "displayName": "Age",
                                    "styles": {
                                        "containerClassName": "form-group row",
                                        "labelClassName": "col-4 col-form-label",
                                        "inputClassName": "col-8 form-control"
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
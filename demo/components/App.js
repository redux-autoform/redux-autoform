import React from 'react';
import {Provider} from 'react-redux';
import datelocalizer from 'redux-autoform-utils/lib/localization/momentLocalizer';
import numbrolocalizer from 'redux-autoform-utils/lib/localization/numbroLocalizer';
import moment from 'moment';
import numbro from 'numbro';

import AutoForm from '../../src/AutoForm';
import { getDemoFactory } from '../demoFactory/demoFactoryHelper';
import ButtonToolbar from './ButtonToolbar';
import DevTools from './DevTools';

import personSchema from '../schemas/Person';

datelocalizer(moment);
numbrolocalizer(numbro);

const autoFormProps = {
	form: 'demo',
	layoutName: 'edit',
	schema: personSchema,
	componentFactory: getDemoFactory(),
	buttonBar: ButtonToolbar,
	onSubmit: form => console.info(JSON.stringify(form, null, 2)),
	overwriteOnInitialValuesChange: undefined
};

const App = props => (
	<Provider store={props.store}>
		<div>
			<AutoForm {...autoFormProps} />
			<DevTools />
		</div>
	</Provider>
);

export default App;
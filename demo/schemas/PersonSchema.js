import EntityField from '../../src/model/entity/Field';
import Entity from '../../src/model/entity/Entity';
import Layout from '../../src/model/layout/Layout';
import LayoutField from '../../src/model/layout/Field';
import Group from '../../src/model/layout/Group';
import Form from '../../src/model/Form';

const personSchema = [
	new EntityField({ name: 'name' }),
	new EntityField({ name: 'lastName' }),
	new EntityField({ name: 'location' }),
	new EntityField({ name: 'email' }),
	new EntityField({ name: 'phoneNumber' }),
	new EntityField({ name: 'age' })
];

const personFields = [
	new LayoutField({
		name: 'name',
		displayName: 'Name',
		styles: {
			containerClassName: 'form-group row',
			labelClassName: 'col-4 col-form-label',
			inputClassName: 'col-8 form-control'
		}
	}),
	new LayoutField({
		name: 'lastName',
		displayName: 'Last Name',
		visible: ({ name }) => name === 'juan',
		changeEvent: (event, {isVisible}) => isVisible ? event.target.value : undefined,
		styles: {
			containerClassName: 'form-group row',
			labelClassName: 'col-4 col-form-label',
			inputClassName: 'col-8 form-control'
		}
	}),
	new LayoutField({
		name: 'location',
		displayName: 'Location',
		visible: ({ name }) => name === 'pepe',
		changeEvent: (event, {isVisible}) => isVisible ? event.target.value : undefined,
		styles: {
			containerClassName: 'form-group row',
			labelClassName: 'col-4 col-form-label',
			inputClassName: 'col-8 form-control'
		}
	}),
	new LayoutField({
		name: 'email',
		displayName: 'Email',
		styles: {
			containerClassName: 'form-group row',
			labelClassName: 'col-4 col-form-label',
			inputClassName: 'col-8 form-control'
		}
	}),
	new LayoutField({
		name: 'phoneNumber',
		displayName: 'Phone Number',
		styles: {
			containerClassName: 'form-group row',
			labelClassName: 'col-4 col-form-label',
			inputClassName: 'col-8 form-control'
		}
	}),
	new LayoutField({
		name: 'age',
		displayName: 'Age',
		styles: {
			containerClassName: 'form-group row',
			labelClassName: 'col-4 col-form-label',
			inputClassName: 'col-8 form-control'
		}
	})
];

const personLayout = new Layout('edit', new Group('Person', personFields));
const personEntity = new Entity('person', personSchema, personLayout);

export default new Form(personEntity);

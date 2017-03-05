import EntityField from '../../src/model/entity/Field';
import Entity from '../../src/model/entity/Entity';
import Layout from '../../src/model/layout/Layout';
import LayoutField from '../../src/model/layout/Field';
import Group from '../../src/model/layout/Group';
import Form from '../../src/model/Form';

const personSchema = [
	new EntityField('name'),
	new EntityField('lastName'),
	new EntityField('location'),
	new EntityField('email'),
	new EntityField('phoneNumber'),
	new EntityField('age')
];

const personFields = [
	new LayoutField({
		name: 'name',
		displayName: 'Name'
	}),
	new LayoutField({
		name: 'lastName',
		displayName: 'Last Name',
		visible: m => m.name && m.name === 'juan'
	}),
	new LayoutField({
		name: 'location',
		displayName: 'Location'
	}),
	new LayoutField({
		name: 'email',
		displayName: 'Email'
	}),
	new LayoutField({
		name: 'phoneNumber',
		displayName: 'Phone Number'
	}),
	new LayoutField({
		name: 'age',
		displayName: 'Age'
	})
];

const personLayout = new Layout('edit', new Group('Person', personFields));
const personEntity = new Entity('person', personSchema, personLayout);

export default new Form(personEntity);

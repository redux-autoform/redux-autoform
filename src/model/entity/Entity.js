export default class Entity {
	constructor(name, fields, layouts) {
		if (!name) {
			throw new Error('You should provide a name!');
		}

		if (!fields) {
			throw new Error('You should provide a fields!');
		}

		if (!layouts) {
			throw new Error('You should provide a layouts!');
		}

		this.name = name;
		this.fields = fields;
		this.layouts = (typeof layouts === 'object') ? [layouts] : layouts;
	}

	addField(field) {
		if (!field) {
			throw new Error('You should provide a field!');
		}

		this.fields.push(field);

		return this;
	}

	get() {
		return {
			name: this.name,
			fields: this.fields.map(field => field.get()),
			layouts: this.layouts
		}
	}
}

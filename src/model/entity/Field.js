export default class Field {
	constructor({ name, type = 'string' }) {
		if (!name) {
			throw new Error('You should provide a name!');
		}

		this.name = name;
		this.type = type;
	}

	get() {
		return {
			name: this.name,
			type: this.type
		};
	}
}
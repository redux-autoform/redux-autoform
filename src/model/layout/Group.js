export default class Group {
	constructor(title, fields = [], orientation = 'horizontal') {
		if (!title) {
			throw new Error('You should provide a title!');
		}

		this.title = title;
		this.orientation = orientation;
		this.fields = fields;
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
			title: this.title,
			orientation: this.orientation,
			fields: this.fields.map(field => field.get())
		}
	}
}
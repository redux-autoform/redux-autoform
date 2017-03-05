export default class Form {
	constructor(entities) {
		if (!entities) {
			throw new Error('You should provide entities!')
		}

		this.entities = (typeof entities === 'object') ? [entities] : entities
	}

	addEntity(entity) {
		if (!entity) {
			throw new Error('You should provide entity!')
		}

		this.entities.push(entity);

		return this;
	}
}
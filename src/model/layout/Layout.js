export default class Layout {
	constructor(name, groups, componentName = 'Group') {
		if (!name) {
			throw new Error('You should provide a name!');
		}

		if (!groups) {
			throw new Error('You should provide a groups!');
		}

		if (!componentName) {
			throw new Error('You should provide a componentName!');
		}

		this.name = name;
		this.component = componentName;
		this.groups = (typeof groups === 'object') ? [groups] : groups;
	}

	addGroup(group) {
		if (!group) {
			throw new Error('You should provide a group!');
		}

		this.groups.push(group);

		return this;
	}

	get() {
		return {
			name: this.name,
			component: this.component,
			groups: this.groups.map(group => group.get())
		}
	}
}
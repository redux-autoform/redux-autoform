const defaultParams = {
	name: '',
	displayName: '',
	componentName: 'TextBox',
	visible: true,
	required: false,
	changeEvent: (event, context) => event.target.value,
	focusEvent: (event, context) => event,
	blurEvent: (event, context) => event,
	styles: {},
	properties: {}
}

export default class Field {
	constructor(params = defaultParams) {
		if (!params.name) {
			throw new Error('You should provide a name!');
		}

		if (!params.displayName) {
			throw new Error('You should provide a displayName');
		}

		this.name = params.name;
		this.displayName = params.displayName;
		this.component = params.componentName;
		this.visible = params.visible;
		this.required = params.required;
		this.changeEvent = params.changeEvent;
		this.focusEvent = params.focusEvent;
		this.blurEvent = params.blurEvent;
		this.styles = params.styles;
		this.properties = params.properties;
	}

	get() {
		return {
			name: this.name,
			displayName: this.displayName,
			component: this.component,
			visible: this.visible,
			required: this.required,
			changeEvent: this.changeEvent,
			focusEvent: this.focusEvent,
			blurEvent: this.blurEvent,
			styles: this.styles,
			properties: this.properties
		}
	}
}
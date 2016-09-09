import React, { Component, PropTypes } from 'react';
import BaseGroup from './BaseGroup';
import { Nav, NavItem, Row, Alert } from 'react-bootstrap';

const mergeJson = (arr) => arr.reduce((prev, actual) => ({...prev, ...actual}));
const intersect = (a, b) => new Set([...a].filter(x => b.has(x)));

class TabGroup extends BaseGroup {
	static propTypes = {
		component: PropTypes.string,
		fields: PropTypes.array.isRequired,
		layout: PropTypes.object.isRequired,
		componentFactory: PropTypes.object.isRequired
	};

	tabsContext = {
		fields: []
	};

	state = {
		position: 0,
		fieldsMap: []
	};

    getComponents = () => {
        let {layout, componentFactory, fields} = this.props;
        let components;

        if (layout.fields) {
            components = layout.fields.map(field => ({
                data: this.getFieldMetadata(field),
                length: layout.fields.length,
                component: componentFactory.buildFieldComponent(this.getFieldMetadata(field))
            }));

        } else if (layout.groups) {

            components = layout.groups.map(group => ({
                data: {...group, headLess: true},
                length: layout.groups.length,
                component: componentFactory.buildGroupComponent({
                    component: group.component,
                    layout: {...group, headLess: true},
                    fields: fields,
                    componentFactory: componentFactory
                })
            }));
        }

        return components;
    };

	updateTabContext = () => {
		let { fields } = this.props;

		// Reads each field value of autoform and creates an object fieldName => error.
		this.tabsContext.fields = Object.keys(mergeJson(fields.map(field => {
			if (field.reduxFormProps.touched) {
				return (field.reduxFormProps.error)? {[field.name]: field.reduxFormProps.error} : null
			}

			return null;
		})));
	};

	getFieldsByTabArray = (layout) => {
		let tabMap = layout.groups.map((group, index) => {
			let json;

			if (group.groups) {
				json = this.getFieldsByTabArray(group.groups);
			} else {
				json = {
					[index]: group.fields
				}
			}

			return json;
		});

		tabMap.forEach((tabNum, index) => {
			tabNum[index] = tabNum[index].map(field => field.name);
		});

		return mergeJson(tabMap);
	};

	getStyle = (position) => {
		const { fieldsMap } = this.state;
		let style = "";

		if(fieldsMap.length == 0)
			return style;

		let fieldsByTab = fieldsMap[position];

		let hasErrors = intersect(new Set(fieldsByTab), new Set(this.tabsContext.fields)).size > 0;

		if(hasErrors)
			style = "alert-danger";

		return style;
	};

	componentDidMount() {
		let { layout } = this.props;

		this.setState({
			fieldsMap: this.getFieldsByTabArray(layout)
		});
	}

	onNavItemSelected = (key) => this.setState({position: key});

	render() {
		let { layout } = this.props;
		let { position } = this.state;
		let content = this.getContent();

		this.updateTabContext();

		return (
			<section>
				<Row>
					<div className="metaform-group">
						<Nav bsStyle="tabs" activeKey={position} onSelect={this.onNavItemSelected}>
							{
								layout.groups.map(({ title }, index) => (
									<NavItem key={index} eventKey={index}>
										<div className={this.getStyle(index)}>
											{title}
										</div>
									</NavItem>
								))
							}
						</Nav>
						<div className="metaform-group-content">
							{content[position]}
						</div>
					</div>
				</Row>
			</section>
		);
	}
}

export default TabGroup;
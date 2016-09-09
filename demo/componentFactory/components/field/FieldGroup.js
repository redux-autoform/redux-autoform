import React, { Component, PropTypes } from 'react';
import FormGroup from '../common/FormGroup';

class FieldGroup extends Component {
    static propTypes = {
        value: React.PropTypes.any,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        displayName: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        error: React.PropTypes.string,
        addonBefore: React.PropTypes.string,
        addonAfter: React.PropTypes.string,
        fieldLayout: React.PropTypes.string
    };

    getGroupContent = () => {
        let { componentFactory, _extra: { layout, fields }, group: groupName } = this.props;
        let group = layout.groups.find(g => g.name == groupName);
        let groupProps = {
            component: group.component,
            layout: group,
            fields,
            componentFactory
        };

        if (!group) {
            throw Error(`Could not find group. Group: ${groupName}`);
        }

        return componentFactory.buildGroupComponent(groupProps);
    };

    render() {
        // let { value, placeholder, addonBefore, addonAfter, onChange, onBlur, componentClass, children, rows, // textarea only,};
        let { name, displayName, help, error, touched, fieldLayout, innerSize } = this.props;
        let formGroupProps = { error, touched, displayName, name, help, fieldLayout, innerSize };
        let groupContent = this.getGroupContent();

        return (
            <FormGroup className="field-group" {...formGroupProps}>
                { groupContent }
            </FormGroup>
        );
    }
}

export default FieldGroup;
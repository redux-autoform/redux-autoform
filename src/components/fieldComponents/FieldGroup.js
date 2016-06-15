import React from 'react';
import FormGroup from '../FormGroup';
import _ from 'underscore';

const FieldGroup = React.createClass({

    propTypes: {
        value: React.PropTypes.any,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        displayName: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        error: React.PropTypes.string,
        addonBefore: React.PropTypes.string,
        addonAfter: React.PropTypes.string,
        fieldLayout: React.PropTypes.string
    },

    render() {

        let {
            value,
            name,
            placeholder,
            displayName,
            help,
            error,
            addonBefore,
            addonAfter,
            touched,
            onChange,
            onBlur,
            componentClass,
            children,
            rows, // textarea only,
            fieldLayout,
            innerSize,
            componentFactory,
            _extra: { layout, fields },
            group: groupName
        } = this.props;

        let group = _.find(layout.groups, g => g.name == groupName);
        if(!group) throw Error(`Could not find group. Group: ${groupName}`);

        let formGroupProps = {
            error,
            touched,
            displayName,
            name,
            help,
            fieldLayout,
            innerSize
        };

        let groupContent = componentFactory.buildGroupComponent({
            component: group.component,
            layout: group,
            fields: fields,
            componentFactory: componentFactory
        });

        return (
            <FormGroup {...formGroupProps} className="field-group">
                { groupContent }
            </FormGroup>
        );
    }
});

export default FieldGroup;
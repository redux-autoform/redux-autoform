import React, { Component, PropTypes } from 'react';
import HorizontalComponent from '../common/HorizontalComponent';
import VerticalComponent from '../common/VerticalComponent';

class BaseGroup extends Component {
    static propTypes = {
        component: PropTypes.string,
        fields: PropTypes.array.isRequired,
        layout: PropTypes.object.isRequired,
        componentFactory: PropTypes.object.isRequired
    };

    getFieldMetadata = (field) => {
        let {layout, fields} = this.props;

        let fieldMetadata = fields.find(cp => cp.name === field.name);

        if (!fieldMetadata) {
            throw Error(`Could not find field. Field: ${field.name}`);
        }

        // in case the field is going to render layouts internally, it's going to need information about the
        // layout and fields. I'm not sure if this is the best way to do it, probably not. TODO: Review it.
        fieldMetadata._extra = {layout, fields};

        return fieldMetadata;
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
                data: group,
                length: layout.groups.length,
                component: componentFactory.buildGroupComponent({
                    component: group.component,
                    layout: group,
                    fields: fields,
                    componentFactory: componentFactory
                })
            }));
        }

        return components;
    };

    getSize = (component) => {
        let defaultSize = (this.isHorizontal()) ? Math.floor(12/component.length) : 12;
        return component.data.size || defaultSize;
    };

    isHorizontal = () => {
        let { layout } = this.props;
        return layout.orientation === 'horizontal';
    };

    isVisible = (component) => {
        return component.data.visible !== false;
    };

    getContent = () => {
        let components = this.getComponents();

        return components.map((component, index) => {
            let content, size;

            if (this.isVisible(component)) {
                size = this.getSize(component);
                content = component.component;
            } else {
                // invisible components should be hidden
                content = null;
            }

            if (this.isHorizontal()) {
                return (
                    <HorizontalComponent key={`component-${index}-wrapper`} size={size}>
                        {content}
                    </HorizontalComponent>
                );
            } else {
                return (
                    <VerticalComponent key={`component-${index}-wrapper`} size={size}>
                        {content}
                    </VerticalComponent>
                );
            }
        });
    };
}

export default BaseGroup;
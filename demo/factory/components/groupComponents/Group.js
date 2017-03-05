import React, {Component, PropTypes} from 'react';

class Group extends Component {
    static propTypes = {
        component: PropTypes.string,
        fields: PropTypes.array.isRequired,
        layout: PropTypes.object.isRequired,
        componentFactory: PropTypes.object.isRequired
    };

    getComponents = () => {
        let {layout, componentFactory, fields} = this.props;
        let components;

        if (layout.fields) {

            components = layout.fields.map(field => {
                let fieldMetadata = fields.find(cp => cp.name === field.name);

                if (!fieldMetadata) {
                    throw Error(`Could not find field. Field: ${field.name}`);
                }

                // in case the field is going to render layouts internally, it's going to need information about the
                // schemas and fields. I'm not sure if this is the best way to do it, probably not. TODO: Review it.
                fieldMetadata._extra = {layout, fields};

                return {
                    data: fieldMetadata,
                    length: layout.fields.length,
                    component: componentFactory.buildFieldComponent(fieldMetadata)
                }
            });

        } else if (layout.groups) {

            components = layout.groups.map(group => {
                return {
                    data: group,
                    length: layout.groups.length,
                    component: componentFactory.buildGroupComponent({
                        component: group.component,
                        layout: group,
                        fields: fields,
                        componentFactory: componentFactory
                    })
                }
            });
        }

        return components;
    };

    getDefaultSize = (component, gridLength = 12) => {
        let {layout} = this.props;

        return layout.orientation == 'horizontal' ? Math.floor(gridLength / component.length) : gridLength;
    };

    getContent = () => {
        let components = this.getComponents();

        return components.map((component, i) => {
            let componentContent, size = 12;

            // invisible components should be hidden
            if (component.data.visible === false) {
                componentContent = null;
            } else {
                size = component.data.size || this.getDefaultSize(component);
                componentContent = component.component;
            }

            return (
                <div key={`component-${i}-wrapper`} className={`col-md-${size}`}>
                    { componentContent }
                </div>
            );
        });
    };

    getHeader = () => {
        let {layout} = this.props;

        if (layout.title) {
            return (
                <header>
                    <span>
                        { layout.title }
                    </span>
                </header>
            );
        } else {
            return null;
        }
    };

    render() {

        // the passed in schemas can contain either fields or groups.
        // in case it contains 'fields', we're gonna render each of the fields.
        // in case it contains 'groups', we're gonna render render each group, passing the fields as a parameter
        try {
            let content = this.getContent();
            let header = this.getHeader();

            return (
                <section>
                    <div>
                        <div>
                            { header }
                            <div>
                                { content }
                            </div>
                        </div>
                    </div>
                </section>
            );

        } catch (ex) {
            return (
                <h4>
                    Could not render the MetaFormGroup component. The schema is not valid.
                </h4>
            )
        }
    }
}

export default Group;
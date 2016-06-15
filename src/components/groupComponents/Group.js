import React from 'react';
import _ from 'underscore';
import {Alert} from 'react-bootstrap';

var Group = React.createClass({
    propTypes: {
        component: React.PropTypes.string,
        layout: React.PropTypes.object.isRequired,
        fields: React.PropTypes.array.isRequired,
        componentFactory: React.PropTypes.object.isRequired
    },

    render: function () {

        let {layout, fields, componentFactory} = this.props;

        // the passed in layout can contain either fields or groups.
        // in case it contains 'fields', we're gonna render each of the fields.
        // in case it contains 'groups', we're gonna render render each group, passing the fields as a parameter
        try {
            let components;
            if (layout.fields) {
                components = layout.fields.map(field => {
                    let fieldMetadata = _.find(fields, cp => cp.name === field.name);
                    if (!fieldMetadata) throw Error(`Could not find field. Field: ${field.name}`);

                    // in case the field is going to render layouts internally, it's going to need information about the
                    // layout and fields. I'm not sure if this is the best way to do it, probably not. TODO: Review it.
                    fieldMetadata._extra = {layout, fields};

                    return {
                        data: fieldMetadata,
                        length: layout.fields.length,
                        component: componentFactory.buildFieldComponent(fieldMetadata)
                    }
                });
            }
            else if (layout.groups) {
                components = this.props.layout.groups.map(group => {
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

            let content = components.map((component, i) => {
                let componentContent;
                let colClass;
                let size;

                const GRID_LENGTH = 12;

                // invisible components should be hidden
                if (component.data.visible === false) {
                    size = GRID_LENGTH;
                    componentContent = null;
                }
                else {
                    let defaultSize = layout.orientation == 'horizontal' ? Math.floor(GRID_LENGTH / component.length) : GRID_LENGTH;
                    size = component.data.size || defaultSize;
                    componentContent = component.component;
                }

                colClass = `col-md-${size}`;
                return <div className={colClass} key={`component-${i}-wrapper`}>
                    { componentContent }
                </div>;
            });

            var header = layout.title
                ? <header className="metaform-group-header">
                <span className="metaform-group-title">{layout.title}
                </span>
            </header>
                : null;

            return <section>
                <div className='row'>
                    <div className="metaform-group">
                        { header }
                        <div className="metaform-group-content">
                            {content}
                        </div>
                    </div>
                </div>
            </section>;
        }
        catch (ex) {
            return <Alert bsStyle='danger'>
                <h4>Could not render the MetaFormGroup component. The schema is not valid.</h4>

                <p>Detailed information:
                    <b>{ex.message}</b>
                </p>
            </Alert>
        }
    }
});

export default Group;
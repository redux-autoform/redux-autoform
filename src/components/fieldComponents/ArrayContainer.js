import React from 'react';
import GlyphButton from '../GlyphButton.js';
import {Alert} from 'react-bootstrap';
import FormGroup from '../FormGroup';
import ArrayContainerItem from '../ArrayContainerItem';

const ArrayContainer = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        addText: React.PropTypes.string
    },

    handleAdd: function () {
        this.props.reduxFormProps.addField({});
    },

    handleItemAction: function (index, eventKey) {

        let {
            value,
            fields,
            onChange,
            reduxFormProps: {
                swapFields,
                removeField
            }
        } = this.props;

        switch (eventKey) {
            case "remove":
                removeField(index);
                break;
            case 'moveUp':
                if (index > 0)
                    swapFields(index, index - 1);
                break;
            case 'moveDown':
                if (index < fields.length - 1)
                    swapFields(index, index + 1);
                break;
            case 'moveFirst':
                swapFields(index, 0);
                break;
            case 'moveLast':
                swapFields(index, fields.length - 1);
                break;
        }
        if (onChange) {
            onChange({id: this.props.id, value: value});
        }
    },

    render: function () {

        let {
            displayName,
            fields,
            componentFactory,
            layout,
            addText,
            fieldLayout,
            innerSize,
            name
        } = this.props;

        let components = fields.map((fields, index) => {
            return <ArrayContainerItem index={index} onAction={this.handleItemAction} key={index}>
                {
                    componentFactory.buildGroupComponent({
                        component: layout.component,
                        layout: layout,
                        fields: fields,
                        componentFactory: componentFactory
                    })
                }
            </ArrayContainerItem>;
        });

        let addBar = components.length ?
            <div className="add-bar">
                    <span>
                        <GlyphButton glyph="plus" text={addText ? addText : "Add" } bsSize="small"
                                     onClick={this.handleAdd}/>
                    </span>
            </div>
            :
            null;

        let formGroupProps = {
            displayName,
            name,
            fieldLayout,
            innerSize
        };

        return (
            <FormGroup {...formGroupProps}>
                <div className="array-container-content">
                    {components.length
                        ? components
                        : <Alert bsStyle="warning">
                        This array is empty. Consider <a href="#" onClick={this.handleAdd}>adding a new item</a>.
                    </Alert>}
                </div>
                {addBar}
            </FormGroup>
        );
    }
});

export default ArrayContainer;
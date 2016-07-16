import React, { Component, PropTypes } from 'react';
import GlyphButton from '../GlyphButton.js';
import { Alert } from 'react-bootstrap';
import FormGroup from '../FormGroup';
import ArrayContainerItem from '../ArrayContainerItem';

class ArrayContainer extends Component {
    static events = {
        REMOVE: "remove",
        MOVE_UP: "moveUp",
        MOVE_DOWN: "moveDown",
        MOVE_FIST: "moveFirst",
        MOVE_LAST: "moveLast"
    };

    static propTypes = {
        name: PropTypes.string.isRequired,
        addText: PropTypes.string
    };

    handleAdd = () => {
        let { reduxFormProps } = this.props;
        reduxFormProps.addField({});
    };

    handleItemAction = (index, eventKey) => {
        let { id, value, fields, onChange, reduxFormProps: { swapFields, removeField } } = this.props;
        let { events } = this;

        switch (eventKey) {
            case events.REMOVE:
                removeField(index);
                break;
            case events.MOVE_UP:
                if (index > 0) {
                    swapFields(index, index - 1);
                }
                break;
            case events.MOVE_DOWN:
                if (index < fields.length - 1) {
                    swapFields(index, index + 1);
                }
                break;
            case events.MOVE_FIST:
                swapFields(index, 0);
                break;
            case events.MOVE_LAST:
                swapFields(index, fields.length - 1);
                break;
        }

        if (onChange) {
            let values = {
                id: id,
                value: value
            };
            
            onChange(values);
        }
    };
    
    getComponents = () => {
        let { fields, componentFactory, layout } = this.props;
        const groupComponentProps = {
            component: layout.component,
            layout: layout,
            fields: fields,
            componentFactory: componentFactory
        };
        
        return fields.map((fields, index) => {
            return (
                <ArrayContainerItem key={index} index={index} onAction={this.handleItemAction}>
                    { componentFactory.buildGroupComponent(groupComponentProps) }
                </ArrayContainerItem>
            );
        });
    };
    
    getAddBar = () => {
        let { addText } = this.props;
        
        let text = addText ? addText : "Add";
        let components = this.getComponents();

        if (components.length) {
            return (
                <div className="add-bar">
                    <span>
                        <GlyphButton glyph="plus" text={text} bsSize="small" onClick={ this.handleAdd }/>
                    </span>
                </div>
            ); 
            
        } else {
            return null;
        }
    };
    
    getAllComponents = () => {
        let components = this.getComponents();
        
        if (components.length) {
            return components;
        } else {
            return (
                <Alert bsStyle="warning">
                    This array is empty. Consider 
                    <a href="#" onClick={ this.handleAdd }>adding a new item</a>.
                </Alert>
            );
        }
    };

    render() {
        let { displayName, fieldLayout, innerSize, name } = this.props;
        let formGroupProps = { displayName, name, fieldLayout, innerSize };

        return (
            <FormGroup {...formGroupProps}>
                <div className="array-container-content">
                    { this.getAllComponents() }
                </div>
                { this.getAddBar() }
            </FormGroup>
        );
    }
}

export default ArrayContainer;
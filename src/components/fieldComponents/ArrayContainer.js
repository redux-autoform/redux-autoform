import React from 'react';
import GlyphButton from '../GlyphButton.js';
import {Alert, Glyphicon, MenuItem, Dropdown} from 'react-bootstrap';

const ArrayContainerItem = React.createClass({

    propTypes: {
        index: React.PropTypes.number.isRequired,
        onAction: React.PropTypes.func.isRequired,
        itemWidth: React.PropTypes.number.isRequired
    },

    handleAction: function (eventKey) {
        this.props.onAction(this.props.index, eventKey);
    },

    render: function () {

        let {index, itemWidth} = this.props;

        return <div className="array-container-item">
            <div className="row">
                <div className={`col-xs-${itemWidth}`}>
                    <div className="array-container-item-content">
                        {this.props.children}
                    </div>
                </div>
                <div className="col-xs-1">
                    <div className="array-container-item-options">
                        <Dropdown id={index + '-dropdown'} pullRight onSelect={this.handleAction}>
                            <Dropdown.Toggle noCaret bsStyle="link" bsSize="small">
                                <Glyphicon glyph="menu-hamburger"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu >
                                <MenuItem eventKey="remove"><Glyphicon glyph="remove" className="text-danger"/><span
                                    className="glyphicon-text text-danger">Remove</span></MenuItem>
                                <MenuItem divider/>
                                <MenuItem eventKey="moveUp"><Glyphicon glyph="chevron-up"/><span
                                    className="glyphicon-text">Move up</span></MenuItem>
                                <MenuItem eventKey="moveDown"><Glyphicon glyph="chevron-down"/><span
                                    className="glyphicon-text">Move down</span></MenuItem>
                                <MenuItem divider/>
                                <MenuItem eventKey="moveFirst"><Glyphicon glyph="chevron-up"/><span
                                    className="glyphicon-text">Move first</span></MenuItem>
                                <MenuItem eventKey="moveLast"><Glyphicon glyph="chevron-down"/><span
                                    className="glyphicon-text">Move last</span></MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>;
    }
});

const ArrayContainer = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        addText: React.PropTypes.string,
        itemWidth: React.PropTypes.number
    },

    getDefaultProps: function () {
        return {
            itemWidth: 11
        }
    },

    handleAdd: function () {
        this.props.reduxFormProps.addField();
    },

    handleItemAction: function (index, eventKey) {

        let {value, fields, reduxFormProps: {swapFields, removeField}} = this.props;

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
        if (this.props.onChange) {
            this.props.onChange({id: this.props.id, value: value});
        }
    },

    render: function () {

        let { itemWidth, displayName, fields, componentFactory, layout, addText } = this.props;

        var header = displayName ?
            <header className="metaform-group-header no-lateral-margin">
                <span>{displayName}</span>
            </header>
            : null;

        let components = fields.map((fields, index) => {
            return <ArrayContainerItem index={index} onAction={this.handleItemAction} key={index} itemWidth={itemWidth} >
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
                        <GlyphButton glyph="plus" text={addText ? addText : "Add" }
                                     onClick={this.handleAdd}/>
                    </span>
            </div>
            :
            null;

        return (
            <div className="array-container">
                {header}
                <div className="array-container-content">
                    {components.length
                        ? components
                        : <Alert bsStyle="warning">
                        This array is empty. Consider <a href="#" onClick={this.handleAdd}>adding a new item</a>.
                    </Alert>}
                </div>
                {addBar}
            </div>
        );
    }
});

export default ArrayContainer;
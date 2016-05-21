import React from 'react';
import GlyphButton from '../GlyphButton.js';
import {Alert, Glyphicon, MenuItem, Dropdown} from 'react-bootstrap';

const ArrayContainerItem = React.createClass({

    propTypes: {
        index: React.PropTypes.number.isRequired,
        onAction: React.PropTypes.func
    },

    handleAction: function (eventKey) {
        if (this.props.onAction) {
            this.props.onAction(this.props.index, eventKey)
        }
    },

    render: function () {

        let {index} = this.props;

        return <div className="array-container-item">
            <div className="row">
                <div className="col-xs-11">
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

        var header = this.props.displayName ?
            <header className="metaform-group-header no-lateral-margin">
                <span>{this.props.displayName}</span>
            </header>
            : null;

        let components = this.props.fields.map((fields, index) => {
            return <ArrayContainerItem index={index} onAction={this.handleItemAction} key={index}>
                {
                    this.props.componentFactory.buildGroupComponent({
                        component: this.props.layout.component,
                        layout: this.props.layout,
                        fields: fields,
                        componentFactory: this.props.componentFactory
                    })
                }
            </ArrayContainerItem>;
        });

        let addBar = components.length ?
            <div className="add-bar">
                    <span>
                        <GlyphButton glyph="plus" text={this.props.addText ? this.props.addText : "Add" }
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
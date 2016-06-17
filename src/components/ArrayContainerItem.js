import React from 'react';
import {Glyphicon, MenuItem, Dropdown} from 'react-bootstrap';

const ArrayContainerItem = React.createClass({

    propTypes: {
        index: React.PropTypes.number.isRequired,
        onAction: React.PropTypes.func.isRequired
    },

    handleAction: function (eventKey) {
        this.props.onAction(this.props.index, eventKey);
    },

    render: function () {

        let {
            index,
            children
        } = this.props;

        return <div className="array-container-item">
            <div className="row">
                <div className={`col-xs-11`}>
                    <div className="array-container-item-content">
                        { children }
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

export default ArrayContainerItem;
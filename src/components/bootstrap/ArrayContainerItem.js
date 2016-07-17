import React, { Component, PropTypes } from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Dropdown from 'react-bootstrap/lib/Dropdown';

class ArrayContainerItem extends Component {
    static propTypes = {
        index: PropTypes.number.isRequired,
        onAction: PropTypes.func.isRequired
    };

    handleAction = (eventKey) => {
        let { onAction, index } = this.props;

        onAction(index, eventKey);
    };

    render() {
        let { index, children } = this.props;

        return <div className="array-container-item">
            <div className="row">
                <div className="col-xs-11">
                    <div className="array-container-item-content">
                        { children }
                    </div>
                </div>
                <div className="col-xs-1">
                    <div className="array-container-item-options">
                        <Dropdown id={`${index}-dropdown`} onSelect={this.handleAction} pullRight>
                            <Dropdown.Toggle noCaret bsStyle="link" bsSize="small">
                                <Glyphicon glyph="menu-hamburger"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu >
                                <MenuItem eventKey="remove">
                                    <Glyphicon glyph="remove" className="text-danger"/>
                                    <span className="glyphicon-text text-danger">
                                        Remove
                                    </span>
                                </MenuItem>
                                <MenuItem divider/>
                                <MenuItem eventKey="moveUp">
                                    <Glyphicon glyph="chevron-up"/>
                                    <span className="glyphicon-text">
                                        Move up
                                    </span>
                                </MenuItem>
                                <MenuItem eventKey="moveDown">
                                    <Glyphicon glyph="chevron-down"/>
                                    <span className="glyphicon-text">
                                        Move down
                                    </span>
                                </MenuItem>
                                <MenuItem divider/>
                                <MenuItem eventKey="moveFirst">
                                    <Glyphicon glyph="chevron-up"/>
                                    <span className="glyphicon-text">
                                        Move first
                                    </span>
                                </MenuItem>
                                <MenuItem eventKey="moveLast">
                                    <Glyphicon glyph="chevron-down"/>
                                    <span className="glyphicon-text">
                                        Move last
                                    </span>
                                </MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default ArrayContainerItem;
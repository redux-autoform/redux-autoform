import React, { Component } from 'react';
import { ButtonToolbar, Button }from 'react-bootstrap'

class Layout extends Component {
    render() {

        let { submitting } = this.props;

        return (
            <ButtonToolbar className="button-toolbar">
                <Button className="pull-right" bsStyle="success" bsSize="large" type="submit"  disabled={submitting}>
                    Submit
                </Button>
            </ButtonToolbar>
        );
    }
}

export default Layout;
import React from 'react';
import { ButtonToolbar, Button }from 'react-bootstrap'

var Layout = React.createClass({

    render: function () {

        let { submitting } = this.props;

        return (
            <ButtonToolbar className="button-toolbar">
                <Button className="pull-right" bsStyle="success" bsSize="large" type="submit"  disabled={submitting}>Submit</Button>
            </ButtonToolbar>
        );
    }
});

export default Layout;
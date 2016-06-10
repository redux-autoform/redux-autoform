import React from 'react';
import { ButtonToolbar, Button }from 'react-bootstrap'

var Layout = React.createClass({

    render: function () {

        let { submitting } = this.props;

        return (
            <ButtonToolbar>
                <Button type="submit" bsStyle="primary" disabled={submitting}>Submit</Button>
                <Button disabled={submitting}>Cancel</Button>
            </ButtonToolbar>
        );
    }
});

export default Layout;
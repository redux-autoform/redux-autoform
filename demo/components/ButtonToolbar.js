import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Layout extends Component {
    render() {
        return (
            <div>
                <Button bsStyle="primary" type="submit">Submit</Button>
            </div>
        );
    }
}

export default Layout;
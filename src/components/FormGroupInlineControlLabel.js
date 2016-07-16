import React, { Component } from 'react';
import { ControlLabel } from 'react-bootstrap';

class FormGroupInlineControlLabel extends Component {
    static propTypes = {
        displayName: React.PropTypes.string
    };

    render() {
        let { displayName } = this.props;

        if (displayName == null) {
            return null;
        }

        return (
            <div className="col-fixed-140">
                <ControlLabel>
                    { displayName }
                </ControlLabel>
            </div>
        )
    }
}

export default FormGroupInlineControlLabel;
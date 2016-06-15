import React from 'react';
import { ControlLabel } from 'react-bootstrap';

const FormGroupInlineControlLabel = React.createClass({

    propTypes: {
        displayName: React.PropTypes.string
    },

    render: function () {

        let {
            displayName
        } = this.props;

        if(displayName == null)
            return null;

        return <div className="col-fixed-140">
            <ControlLabel>
                { displayName }
            </ControlLabel>
        </div>;
    }
});

export default FormGroupInlineControlLabel;
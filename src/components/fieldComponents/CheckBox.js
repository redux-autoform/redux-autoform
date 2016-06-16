import React from 'react';
import {Checkbox as BootstrapCheckbox, Col} from 'react-bootstrap';
import {getDisplayName} from '../../lib/helpers/metadataHelper';

const Checkbox = React.createClass({

    render() {

        let {
            value,
            name,
            displayName,
            error,
            touched,
            onChange,
            onBlur,
            fieldLayout
        } = this.props;

        let checkboxProps = {
            checked: value,
            onChange,
            onBlur,
            validationState: error && touched ? 'error' : null
        };

        displayName = getDisplayName(displayName, name);

        let content = <BootstrapCheckbox { ... checkboxProps }>
            { displayName }
        </BootstrapCheckbox>;

        if (fieldLayout == 'inline') {
            return (
                <div>
                    <div className="col-fixed-140">
                        <label></label>
                    </div>
                    <Col md={12} className="col-offset-140 no-padding-col">
                        { content }
                    </Col>
                </div>);
        }
        else {
            return content;
        }
    }
});

export default Checkbox;
import React, { Component } from 'react';
import { getDisplayName } from '../../lib/helpers/metadataHelper';
import { Checkbox as BootstrapCheckbox } from 'react-bootstrap';
import Col from 'react-bootstrap/lib/Col';

class Checkbox extends Component {
    getContent = () => {
        let { value, name, displayName, error, touched, onChange, onBlur } = this.props;
        let validationState = error && touched ? 'error' : null;
        let checkboxProps = { checked: value, onChange, onBlur, validationState };

        return (
            <BootstrapCheckbox className="cb-fix" {...checkboxProps}>
                { getDisplayName(displayName, name) }
            </BootstrapCheckbox>
        )
    };

    render() {
        let { fieldLayout } = this.props;
        let content = this.getContent();

        if (fieldLayout == 'inline') {
            return (
                <div>
                    <div className="col-fixed-140">
                        <label/>
                    </div>
                    <Col md={12} className="col-offset-140 no-padding-col">
                        { content }
                    </Col>
                </div>
            );
        }
        else {
            return content;
        }
    }
}

export default Checkbox;
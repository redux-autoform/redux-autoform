import React, { Component, PropTypes } from 'react';
import { FormGroup as BootstrapFormGroup } from 'react-bootstrap';
import FormGroupInlineControlLabel from './FormGroupInlineControlLabel';
import FormGroupInlineContent from './FormGroupInlineContent'
import { getDisplayName } from '../../metadata/helper/metadataHelper';

class FormGroupInline extends Component {
    static propTypes = {
        error: PropTypes.string,
        touched: PropTypes.bool,
        displayName: PropTypes.string,
        name: PropTypes.string,
        help: PropTypes.string
    };

    render() {
        let { error, touched, displayName, name, children, help, className, innerSize } = this.props;
        displayName = getDisplayName(displayName, name);

        let controlLabelProps = { displayName };
        let contentProps = { error, touched, children, help, hasControlLabel: displayName != null, innerSize };
        let formGroupProps = { className };

        if (error && touched) {
            formGroupProps.validationState = 'error';
        }

        return (
            <BootstrapFormGroup {...formGroupProps}>
                <FormGroupInlineControlLabel {...controlLabelProps}/>
                <FormGroupInlineContent {...contentProps}>
                    { children }
                </FormGroupInlineContent>
            </BootstrapFormGroup>
        )
    }
}

export default FormGroupInline;
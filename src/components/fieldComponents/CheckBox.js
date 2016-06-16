import React from 'react';
import {Checkbox as BootstrapCheckbox} from 'react-bootstrap';
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
        } = this.props;

        let checkboxProps = {
            checked: value,
            onChange,
            onBlur,
            validationState: error && touched ? 'error' : null
        };

        displayName = getDisplayName(displayName, name);

        return (
            <BootstrapCheckbox { ... checkboxProps }>
                { displayName }
            </BootstrapCheckbox>
        );

    }
});

export default Checkbox;
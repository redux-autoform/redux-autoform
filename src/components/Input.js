import React, { Component, PropTypes } from 'react';
import FormGroup from './FormGroup';
import FormControl from './FormControl';

class Input extends Component {
    static propTypes = {
        value: PropTypes.any,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        displayName: PropTypes.string,
        name: PropTypes.string.isRequired,
        error: PropTypes.string,
        addonBefore: PropTypes.string,
        addonAfter: PropTypes.string,
        fieldLayout: PropTypes.string
    };

    render() {
        let { error, touched, displayName, name, help, fieldLayout, innerSize } = this.props;
        let { value, placeholder, addonBefore, addonAfter, onChange, onBlur, componentClass, rows } = this.props;

        let formGroupProps = { error, touched, displayName, name, help, fieldLayout, innerSize };
        let formControlProps = { value, name, placeholder, displayName, help, addonBefore, addonAfter, onChange, onBlur, componentClass, rows };

        return (
            <FormGroup {...formGroupProps}>
                <FormControl {...formControlProps}>
                    { children }
                </FormControl>
            </FormGroup>
        );
    }
}

export default Input;
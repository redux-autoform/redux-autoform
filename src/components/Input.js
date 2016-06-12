import React from 'react';
import FormGroup from './FormGroup';
import FormControl from './FormControl';

const Input = React.createClass({

    propTypes: {
        value: React.PropTypes.any,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        displayName: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        error: React.PropTypes.string,
        addonBefore: React.PropTypes.string,
        addonAfter: React.PropTypes.string,
        fieldLayout: React.PropTypes.string
    },

    render() {

        let {
            value,
            name,
            placeholder,
            displayName,
            help,
            error,
            addonBefore,
            addonAfter,
            touched,
            onChange,
            onBlur,
            componentClass,
            children,
            rows, // textarea only,
            fieldLayout 
        } = this.props;


        let formGroupProps = {
            error,
            touched,
            displayName,
            name,
            help,
            fieldLayout
        };

        let formControlProps = {
            value,
            name,
            placeholder,
            displayName,
            help,
            addonBefore,
            addonAfter,
            onChange,
            onBlur,
            componentClass,
            rows
        };

        return (
            <FormGroup {...formGroupProps}>
                <FormControl {...formControlProps}>
                    {children}
                </FormControl>
            </FormGroup>
        );
    }
});

export default Input;
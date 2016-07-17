import React, { Component, PropTypes } from 'react';
import FormGroup from '../FormGroup';
import Select from 'react-select';

class Lookup extends Component {
    render() {
        let { value, name, displayName, help, error, touched, onChange, onBlur, options, fieldLayout} = this.props;
        let selectProps = { options, value, name, onChange, onBlur: (event) => onBlur() };
        let formGroupProps = { error, touched, displayName, name, help, fieldLayout};

        return (
            <FormGroup {...formGroupProps}>
                <Select {...selectProps}/>
            </FormGroup>
        )
    }
}

export default Lookup;
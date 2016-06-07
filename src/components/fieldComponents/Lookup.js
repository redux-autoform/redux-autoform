import React from 'react';
import FormGroup from '../FormGroup';
import Select2 from 'react-select';

const Lookup = React.createClass({

    render: function () {

        let {
            value,
            name,
            displayName,
            help,
            error,
            touched,
            onChange,
            onBlur,
            options
        } = this.props;

        let selectProps = {
            options,
            value,
            name,
            onChange,
            onBlur: (value) => onBlur(value)
        };

        let formGroupProps = {
            error,
            touched,
            displayName,
            name,
            help
        };

        return <FormGroup {...formGroupProps}>
            <Select2 {...selectProps} />
        </FormGroup>
    }

});

export default Lookup;
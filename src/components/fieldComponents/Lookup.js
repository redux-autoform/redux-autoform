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
            options,
            fieldLayout
        } = this.props;

        let selectProps = {
            options,
            value,
            name,
            onChange,
            onBlur: (event) => onBlur()
        };

        let formGroupProps = {
            error,
            touched,
            displayName,
            name,
            help,
            fieldLayout
        };

        return <FormGroup {...formGroupProps}>
            <Select2 {...selectProps} />
        </FormGroup>
    }

});

export default Lookup;
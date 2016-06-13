import React from 'react';
import FormGroup from '../FormGroup';
import {FormControl} from 'react-bootstrap';

const Lookup = React.createClass({

    render: function () {

        let {
            value,
            name,
            displayName,
            help,
            error,
            touched,
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

        return <FormGroup {...formGroupProps}>
            <FormControl.Static> {value} </FormControl.Static>
        </FormGroup>
    }

});

export default Lookup;
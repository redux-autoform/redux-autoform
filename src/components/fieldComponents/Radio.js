import React from 'react';
import { Radio as BootstrapRadio } from 'react-bootstrap';
import FormGroup from '../FormGroup';


const Radio = React.createClass({

    handleChange(event) {
        let { onChange } = this.props;
        onChange(event.target.value);
    },

    render: function () {

        let {
            error,
            touched,
            displayName,
            name,
            help,
            fieldLayout,
            innerSize,
            options,
            onChange
        } = this.props;

        let formGroupProps = {
            error,
            touched,
            displayName,
            name,
            help,
            fieldLayout,
            innerSize
        };

        let radioProps = {
            inline: fieldLayout == 'inline',
            name
        }

        return <FormGroup {...formGroupProps} >
            { options.map(i => { return <BootstrapRadio {...radioProps} value={i.value} onChange={this.handleChange}> {i.text} </BootstrapRadio> }) }
        </FormGroup>

    }
});

export default Radio;
import React, { Component, PropTypes } from 'react';
import { Radio as BootstrapRadio } from 'react-bootstrap';
import FormGroup from '../FormGroup';

class Radio extends Component {
    handleChange = (event) => {
        let { onChange } = this.props;
        onChange(event.target.value);
    };

    getOptions = () => {
        let { options, name, fieldLayout } = this.props;
        let radioProps = { inline: fieldLayout == 'inline', name };

        return options.map((item, index) => (
            <BootstrapRadio key={index} value={item.value} onChange={this.handleChange} {...radioProps}>
                {item.text}
            </BootstrapRadio>
        ))
    };

    render() {
        let { error, touched, displayName, name, help, fieldLayout, innerSize } = this.props;
        let formGroupProps = { error, touched, displayName, name, help, fieldLayout, innerSize };
        let options = this.getOptions();

        return (
            <FormGroup {...formGroupProps} >
                { options }
            </FormGroup>
        )
    }
}

export default Radio;
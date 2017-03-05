import React, { Component, PropTypes } from 'react';
import { Radio as BootstrapRadio } from 'react-bootstrap';
import FormGroup from '../common/FormGroup';

class Radio extends Component {
    handleChange = (event) => {
        let { onChange } = this.props;
        onChange(event.target.value);
    };

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.value !== this.props.value
	}

    getOptions = (value) => {
        let { options, name, fieldLayout } = this.props;

        // these props don't vary per item
        let invariantRadioProps = { inline: fieldLayout == 'inline', name, onChange: this.handleChange };

        return options.map((item, index) => (
            <BootstrapRadio key={index} value={item.value}  checked={item.value == value} {...invariantRadioProps}>
                {item.text}
            </BootstrapRadio>
        ))
    };

    render() {
        let { error, touched, displayName, name, help, fieldLayout, innerSize, value } = this.props;
        let formGroupProps = { error, touched, displayName, name, help, fieldLayout, innerSize };
        let options = this.getOptions(value);

        return (
            <FormGroup {...formGroupProps} >
                { options }
            </FormGroup>
        )
    }
}

export default Radio;
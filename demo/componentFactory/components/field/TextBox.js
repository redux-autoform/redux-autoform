import React, { Component, PropTypes } from 'react';
import Input from  '../common/Input';

class TextBox extends Component {
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

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.value !== this.props.value
	}

    render() {
        return <Input componentClass="input" inputType="text" {...this.props}/>;
    }
}

export default TextBox;
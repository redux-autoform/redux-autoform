import React, { Component, PropTypes } from 'react';
import Input from  '../common/Input';

class Email extends Component {
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
        return <Input componentClass="input" inputType="email" {...this.props}/>;
    }
}

export default Email;
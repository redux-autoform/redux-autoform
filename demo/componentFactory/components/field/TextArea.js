import React, { Component, PropTypes } from 'react';
import Input from  '../common/Input';

class TextArea extends Component {
    static propTypes = {
        value: PropTypes.any,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        displayName: PropTypes.string,
        name: PropTypes.string.isRequired,
        error: PropTypes.string,
        addonBefore: PropTypes.string,
        addonAfter: PropTypes.string,
        rows: PropTypes.number
    };

    render() {
        return <Input componentClass="textarea" {...this.props}/>;
    }
}

export default TextArea;
import React, { Component, PropTypes } from 'react';
import Input from  '../Input';

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
        let { rows } = this.props;

        return <Input componentClass="textarea" rows={rows} {...this.props}/>;
    }
}

export default TextArea;
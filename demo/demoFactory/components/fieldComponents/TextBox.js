import React, { Component, PropTypes } from 'react';

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

    render() {

        let { value, onChange } = this.props;
        let inputProps = { value, onChange };

        return <input type="text" {...inputProps}/>;
    }
}

export default TextBox;
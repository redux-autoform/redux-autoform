import React from 'react';
import Input from  '../Input';

const TextBox = React.createClass({

    propTypes: {
        value: React.PropTypes.any,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        displayName: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        error: React.PropTypes.string,
        addonBefore: React.PropTypes.string,
        addonAfter: React.PropTypes.string
    },

    render() {

        return (
            <Input {...this.props}  />
        );

    }
});

export default TextBox;
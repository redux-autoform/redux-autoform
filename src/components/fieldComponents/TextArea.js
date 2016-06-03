import React from 'react';
import Input from  '../Input';

const TextArea = React.createClass({

    propTypes: {
        value: React.PropTypes.any,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        displayName: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        error: React.PropTypes.string,
        addonBefore: React.PropTypes.string,
        addonAfter: React.PropTypes.string,
        rows: React.PropTypes.number
    },

    render() {

        let { rows } = this.props;

        return (
            <Input {...this.props} componentClass="textarea" rows={rows}  />
        );

    }
});

export default TextArea;
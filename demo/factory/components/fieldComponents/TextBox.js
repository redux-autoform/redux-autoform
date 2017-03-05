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
        fieldLayout: PropTypes.string,
        properties: PropTypes.object
    };

    render() {
        const { value, onChange, displayName } = this.props;
        const inputProps = { value, onChange };

        return (
            <div>
                <div>
                    <span>{displayName}</span>
                </div>
                <div>
                    <input type="text" {...inputProps}/>
                </div>
            </div>
        );
    }
}

export default TextBox;
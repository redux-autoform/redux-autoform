import React, { Component, PropTypes } from 'react';
import Input from '../Input';

class Select extends Component {
    static propTypes = {
        value: PropTypes.any,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        displayName: PropTypes.string,
        name: PropTypes.string.isRequired,
        error: PropTypes.string,
        addonBefore: PropTypes.string,
        addonAfter: PropTypes.string
    };

    getOptions = () => {
        let { options } = this.props;

        return options.map((item, index) => (
            <option key={index} value={item.value}>
                {item.text}
            </option>
        ));
    };

    render() {
        let options = this.getOptions();
        
        return (
            <Input componentClass="select" {...this.props}>
                { options }
            </Input>
        );
    }
}

export default Select;
import React from 'react';
import { any, func, string } from 'prop-types';

export default class TextBox extends React.Component {
    static propTypes = {
        value: any,
        onChange: func.isRequired,
        placeholder: string,
        displayName: string,
        name: string.isRequired,
        error: string,
        addonBefore: string,
        addonAfter: string,
        fieldLayout: string
    };

    render() {
        const { value, onChange } = this.props;
        const inputProps = { value, onChange };

        return <input type="text" {...inputProps}/>;
    }
}
import React from 'react';
import {  FormControl, InputGroup } from 'react-bootstrap';
import FormGroup from '../FormGroup';

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

        let {
            value,
            name,
            placeholder,
            displayName,
            help,
            error,
            addonBefore,
            addonAfter,
            touched,
            onChange,
            onBlur
        } = this.props;

        let input = <FormControl
            type="text"
            value={value}
            placeholder={placeholder}
            label={displayName || name}
            help={help}
            hasFeedback
            ref="input"
            onChange={(event) => onChange(event.target.value)}
            onBlur={(event) => onBlur()} />;

        let content;
        if(addonBefore || addonAfter) {
            content = <InputGroup>
                { addonBefore ? <InputGroup.Addon>{addonBefore}</InputGroup.Addon> : null }
                { input }
                { addonAfter ? <InputGroup.Addon>{addonAfter}</InputGroup.Addon> : null }
            </InputGroup>
        }
        else {
            content = input;
        }

        let formGroupProps = {
            error,
            touched,
            displayName,
            name,
            help
        };

        return (
            <FormGroup {...formGroupProps}>
                { content }
            </FormGroup>
        );
    }
});

export default TextBox;
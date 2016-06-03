import React from 'react';
import {FormControl as BootstrapFormControl, InputGroup} from 'react-bootstrap';

const FormControl = React.createClass({

    propTypes: {
        error: React.PropTypes.string,
        touched: React.PropTypes.bool,
        displayName: React.PropTypes.string,
        name: React.PropTypes.string,
        help: React.PropTypes.string
    },

    render: function () {

        let {
            value,
            name,
            placeholder,
            displayName,
            help,
            addonBefore,
            addonAfter,
            onChange,
            onBlur,
            componentClass,
            children,
            rows // for textarea only
        } = this.props;

        let input = <BootstrapFormControl
            type="text"
            value={value}
            placeholder={placeholder}
            label={displayName || name}
            help={help}
            hasFeedback
            ref="input"
            onChange={(event) => onChange(event.target.value)}
            onBlur={(event) => onBlur()}
            componentClass={componentClass}
            rows={rows}>
            { children }
        </BootstrapFormControl>;


        if (addonBefore || addonAfter) {
            return <InputGroup>
                { addonBefore ? <InputGroup.Addon>{addonBefore}</InputGroup.Addon> : null }
                { input }
                { addonAfter ? <InputGroup.Addon>{addonAfter}</InputGroup.Addon> : null }
            </InputGroup>
        }
        else {
            return input;
        }
    }
});

export default FormControl;
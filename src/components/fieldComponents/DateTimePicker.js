import React from 'react';
import {FormGroup, HelpBlock, ControlLabel} from 'react-bootstrap';
import {DateTimePicker as ReactWidgetsDateTimePicker} from 'react-widgets';
import moment from 'moment';


const DateTimePicker = React.createClass({

    propTypes: {
        value: React.PropTypes.any,
        onChange: React.PropTypes.func.isRequired,
        displayName: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        error: React.PropTypes.string,
        format: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            format: 'L'
        }
    },

    onChange: function(date, dateAsString) {
        let { onChange } = this.props;
        onChange(dateAsString);
    },

    render() {

        let {
            value,
            name,
            displayName,
            help,
            error,
            touched,
            onBlur,
            format
        } = this.props;

        if (typeof value == 'string') {
            value = value == '' ? undefined : moment(value, format).toDate();
        }

        let props = {
            value: value,
            displayName: displayName,
            onChange: this.onChange,
            onBlur: onBlur,
            format: format
        };

        let formGroupConditionalProps = {};
        if (error && touched) {
            formGroupConditionalProps.validationState = 'error';
        }

        return (
            <FormGroup {...formGroupConditionalProps}>
                <ControlLabel>{ displayName || name }</ControlLabel>
                <ReactWidgetsDateTimePicker {...props} />
                <HelpBlock>{(touched ? error : '') || help}</HelpBlock>
            </FormGroup>
        );
    }
});

export default DateTimePicker;
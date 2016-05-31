import React from 'react';
import {FormGroup, HelpBlock, ControlLabel} from 'react-bootstrap';
import {DateTimePicker as ReactWidgetsDateTimePicker} from 'react-widgets';
import { getDateLocalizer } from '../../lib/localization/dateLocalizer';

const DateTimePicker = React.createClass({

    propTypes: {
        value: React.PropTypes.any,
        onChange: React.PropTypes.func.isRequired,
        displayName: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        error: React.PropTypes.string,
        format: React.PropTypes.string
    },

    /**
     * Returns the format prop for the given DateTimePicker props
     * @param format
     * @param type
     * @param formats
     * @returns {*}
     */
    getFormat: function (format, type, formats) {
        if (!type) throw Error('\'type\' should be truthy');
        if (!formats) throw Error('\'localizer\' should be truthy');

        if(format) return format;

        switch(type) {
            case 'datetime':
                return formats.default;
            case 'date':
                return formats.date;
            case 'time':
                return formats.time;
            default:
                throw Error(`Invalid type. Type: ${type}`);
        }
    },

    /**
     * Sets ReactWidgetsDateTimePicker props depending on the the type metadata
     * @param props
     * @param type
     */
    setReactWidgetsProps: function(props, type) {
        if (!props) throw Error('\'props\' should be truthy');
        if (!type) throw Error('\'type\' should be truthy');

        switch(type) {
            case 'time':
                props.calendar = false;
                break;
            case 'date':
                props.time = false;
                break;
        }
    },

    onChange: function (date, dateAsString) {
        let {onChange} = this.props;
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
            format,
            type
        } = this.props;

        let localizer = getDateLocalizer();

        if (typeof value == 'string') {
            if(value == '') value = undefined;
            else {
                format = this.getFormat(format, type, localizer.formats);
                value = localizer.parse(value, format);
            }
        }

        let reactWidgetsProps = {
            value: value,
            displayName: displayName,
            onChange: this.onChange,
            onBlur: onBlur,
            format: format
        };
        this.setReactWidgetsProps(reactWidgetsProps, type);


        let formGroupConditionalProps = {};
        if (error && touched) {
            formGroupConditionalProps.validationState = 'error';
        }

        return (
            <FormGroup {...formGroupConditionalProps}>
                <ControlLabel>{ displayName || name }</ControlLabel>
                <ReactWidgetsDateTimePicker {...reactWidgetsProps} />
                <HelpBlock>{(touched ? error : '') || help}</HelpBlock>
            </FormGroup>
        );
    }
});

export default DateTimePicker;
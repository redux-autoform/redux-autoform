import React, { Component, PropTypes } from 'react';
import {DateTimePicker as ReactWidgetsDateTimePicker} from 'react-widgets';
import { getDateLocalizer } from '../../../localization/dateLocalizer';
import FormGroup from '../FormGroup';

class DateTimePicker extends Component {
    static propTypes = {
        value: PropTypes.any,
        onChange: PropTypes.func.isRequired,
        displayName: PropTypes.string,
        name: PropTypes.string.isRequired,
        error: PropTypes.string,
        format: PropTypes.string
    };

    /**
     * Returns the format prop for the given DateTimePicker props
     * @param format
     * @param type
     * @param formats
     * @returns {*}
     */
    getFormat = (format, type, formats) => {
        if (!type) {
            throw Error('\'type\' should be truthy');
        }

        if (!formats) {
            throw Error('\'localizer\' should be truthy');
        }

        if (format) {
            return format;
        }

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
    };

    /**
     * Sets ReactWidgetsDateTimePicker props depending on the the type metadata
     * @param props
     * @param type
     */
    setReactWidgetsProps = (props, type) => {
        if (!props) {
            throw Error('\'props\' should be truthy');
        }

        if (!type) {
            throw Error('\'type\' should be truthy');
        }

        switch(type) {
            case 'time':
                props.calendar = false;
                break;
            case 'date':
                props.time = false;
                break;
        }
    };

    onChange = (date, dateAsString) => {
        let { onChange } = this.props;
        onChange(dateAsString);
    };

    render() {
        let { value, name, displayName, help, error, touched, onBlur, format, type, fieldLayout } = this.props;
        let localizer = getDateLocalizer();

        if (typeof value == 'string') {
            if(value == '') {
                value = undefined;
            } else {
                format = this.getFormat(format, type, localizer.formats);
                value = localizer.parse(value, format);
            }
        }

        let reactWidgetsProps = { value, displayName, onChange: this.onChange, onBlur, format };
        let formGroupProps = { error, touched, displayName, name, help, fieldLayout };

        this.setReactWidgetsProps(reactWidgetsProps, type);

        return (
            <FormGroup {...formGroupProps}>
                <ReactWidgetsDateTimePicker {...reactWidgetsProps}/>
            </FormGroup>
        );
    }
}

export default DateTimePicker;
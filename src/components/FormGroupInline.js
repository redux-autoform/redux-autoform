import React from 'react';
import {FormGroup as BootstrapFormGroup } from 'react-bootstrap';
import FormGroupInlineControlLabel from './FormGroupInlineControlLabel';
import FormGroupInlineContent from './FormGroupInlineContent'
import {getDisplayName} from '../lib/helpers/metadataHelper';

const FormGroupInline = React.createClass({

    propTypes: {
        error: React.PropTypes.string,
        touched: React.PropTypes.bool,
        displayName: React.PropTypes.string,
        name: React.PropTypes.string,
        help: React.PropTypes.string
    },

    render: function () {

        let {
            error,
            touched,
            displayName,
            name,
            children,
            help,
            className
        } = this.props;

        displayName = getDisplayName(displayName, name);

        // form group props
        let formGroupProps = {className};
        if (error && touched) {
            formGroupProps.validationState = 'error';
        }

        // control label props
        let controlLabelProps = {
            displayName
        };

        // content props
        let contentProps = {
            error,
            touched,
            children,
            help,
            hasControlLabel: displayName != null
        };

        return <BootstrapFormGroup {...formGroupProps}>
            <FormGroupInlineControlLabel {...controlLabelProps} />
            <FormGroupInlineContent {...contentProps}>
                { children }
            </FormGroupInlineContent>
        </BootstrapFormGroup>;
    }
});

export default FormGroupInline;
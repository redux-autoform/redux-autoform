import React from 'react';
import { FormGroup as BootstrapFormGroup, HelpBlock, ControlLabel} from 'react-bootstrap';

const FormGroup = React.createClass({

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
            help
        } = this.props;

        let formGroupProps = {};
        if (error && touched) {
            formGroupProps.validationState = 'error';
        }

        return <BootstrapFormGroup {...formGroupProps}>
            <ControlLabel>{ displayName || name }</ControlLabel>
            { children }
            <HelpBlock>{(touched ? error : '') || help}</HelpBlock>
        </BootstrapFormGroup>
    }
});

export default FormGroup;
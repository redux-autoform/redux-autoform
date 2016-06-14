import React from 'react';
import {FormGroup as BootstrapFormGroup, HelpBlock, ControlLabel, Col} from 'react-bootstrap';

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
        } = this.props;

        let formGroupProps = {};
        if (error && touched) {
            formGroupProps.validationState = 'error';
        }

        return <BootstrapFormGroup {...formGroupProps}>
            <Col componentClass={ControlLabel} sm={2} className="no-padding-right-col">
                { displayName || name }
            </Col>
            <Col sm={10}>
                { children }
                <HelpBlock>{(touched ? error : '') || help}</HelpBlock>
            </Col>
        </BootstrapFormGroup>
    }
});

export default FormGroupInline;
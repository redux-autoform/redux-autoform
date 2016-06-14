import React from 'react';
import {FormGroup as BootstrapFormGroup, HelpBlock, ControlLabel, Col} from 'react-bootstrap';

const FormGroupStacked = React.createClass({

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
            innerSize
        } = this.props;

        let formGroupProps = {};
        if (error && touched) {
            formGroupProps.validationState = 'error';
        }

        innerSize = innerSize || 12;

        return <BootstrapFormGroup {...formGroupProps}>
            <Col md={innerSize} className="no-padding-col">
                <ControlLabel>{ displayName || name }</ControlLabel>
                { children }
                <HelpBlock>{(touched ? error : '') || help}</HelpBlock>
            </Col>
        </BootstrapFormGroup>
    }
});

export default FormGroupStacked;
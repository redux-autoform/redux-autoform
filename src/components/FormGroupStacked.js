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
            innerSize,
            className
        } = this.props;

        let formGroupProps = {
            className,
            validationState: error && touched ? 'error' : null
        };

        innerSize = innerSize || 12;
        let controlLabel = displayName != undefined ? <ControlLabel>{ displayName || name }</ControlLabel> : null;
        let helpText = (touched ? error : '') || help;
        let helpBlock = helpText ? <HelpBlock>{helpText}</HelpBlock> : null;

        return <BootstrapFormGroup {...formGroupProps}>
            <Col md={innerSize} className="no-padding-col">
                { controlLabel }
                { children }
                { helpBlock }
            </Col>
            <div className="clearfix"></div>
        </BootstrapFormGroup>
    }
});

export default FormGroupStacked;
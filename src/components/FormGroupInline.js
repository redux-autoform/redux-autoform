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
            className
        } = this.props;

        let formGroupProps = { className };
        if (error && touched) {
            formGroupProps.validationState = 'error';
        }

        let controlLabel = displayName != undefined
            ? <Col componentClass={ControlLabel} sm={2} className="no-padding-right-col">{ displayName || name }</Col>
            : null;

        let helpText = (touched ? error : '') || help;
        let helpBlock = helpText ? <HelpBlock>{helpText}</HelpBlock> : null;

        let content = <Col sm={controlLabel == null ? 12 : 10}>
            { children }
            { helpBlock }
        </Col>;


        return <BootstrapFormGroup {...formGroupProps}>
            { controlLabel }
            { content }
        </BootstrapFormGroup>
    }
});

export default FormGroupInline;
import React from 'react';
import { FormGroup as BootstrapFormGroup, HelpBlock, ControlLabel, Col} from 'react-bootstrap';

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
            help,
            fieldLayout
        } = this.props;

        let formGroupProps = {};
        if (error && touched) {
            formGroupProps.validationState = 'error';
        }

        let label = fieldLayout == 'stacked'
            ? <ControlLabel>{ displayName || name }</ControlLabel>
            : <Col componentClass={ControlLabel} sm={2}> { displayName || name } </Col>;

        let content = fieldLayout == 'stacked'
            ? <div>
                { children }
                <HelpBlock>{(touched ? error : '') || help}</HelpBlock>
            </div>
            : <Col sm={10}>
                { children }
                <HelpBlock>{(touched ? error : '') || help}</HelpBlock>
            </Col>;

        return <BootstrapFormGroup {...formGroupProps}>
            { label }
            { content }
        </BootstrapFormGroup>
    }
});

export default FormGroup;
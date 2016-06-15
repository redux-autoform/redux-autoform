import React from 'react';
import {HelpBlock, Col} from 'react-bootstrap';

const FormGroupInlineContent = React.createClass({

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
            children,
            help,
            hasControlLabel,
            innerSize
        } = this.props;

        let helpText = (touched ? error : '') || help;
        let helpBlock = helpText ? <HelpBlock>{helpText}</HelpBlock> : null;

        innerSize = innerSize || 12;

        return <Col md={12} className={ hasControlLabel ? "col-offset-140" : null}>
            <Col md={innerSize} className="no-padding-col">
                { children }
                { helpBlock }
            </Col>
        </Col>;
    }
});

export default FormGroupInlineContent;
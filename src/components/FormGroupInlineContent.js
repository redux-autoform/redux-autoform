import React, { Component, PropTypes } from 'react';
import { HelpBlock, Col } from 'react-bootstrap';

class FormGroupInlineContent extends Component {
    static propTypes = {
        error: PropTypes.string,
        touched: PropTypes.bool,
        displayName: PropTypes.string,
        name: PropTypes.string,
        help: PropTypes.string
    };

    getHelpBlock = () => {
        let { error, touched, help } = this.props;
        let helpText = (touched ? error : '') || help;

        if (helpText) {
            return (
                <HelpBlock>
                    { helpText }
                </HelpBlock>
            )
        } else {
            return null;
        }

    };

    render() {
        let { children, hasControlLabel, innerSize } = this.props;
        innerSize = innerSize || 12;

        return <Col md={12} className={ hasControlLabel ? "col-offset-140" : null}>
            <Col md={innerSize} className="no-padding-col">
                { children }
                { this.getHelpBlock() }
            </Col>
        </Col>;
    }
}

export default FormGroupInlineContent;
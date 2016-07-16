import React, { Component, PropTypes } from 'react';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Col from 'react-bootstrap/lib/Col';

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
        let className = hasControlLabel ? "col-offset-140" : null;
        let helpBlock = this.getHelpBlock();
        
        return <Col className={className} md={12}>
            <Col className="no-padding-col" md={innerSize || 12}>
                { children }
                { helpBlock }
            </Col>
        </Col>;
    }
}

export default FormGroupInlineContent;
import React, { Component, PropTypes } from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';

class GlyphButton extends Component {
    static propTypes = {
        bsStyle: PropTypes.string,
        bsSize: PropTypes.string,
        text: PropTypes.string,
        glyph: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        disabled: false
    };

    handleSave = () => {
        let { onClick } = this.props;

        if (onClick) {
            onClick();
        }
    };

    getText = () => {
        let style = { marginLeft: 6 };
        let { text } = this.props;

        if (text) {
            return (
                <span style={style}>
                    { text }
                </span>
            );
        } else {
            return null;
        }
    };

    render() {
        let { bsSize, bsStyle,glyph, disabled } = this.props;
        let text = this.getText();

        return (
            <Button disabled={disabled} bsStyle={bsStyle} bsSize={bsSize} onClick={this.handleSave}>
                <Glyphicon glyph={glyph}/>
                { text }
            </Button>
        )
    }
}

export default GlyphButton;
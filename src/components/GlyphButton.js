import React, { Component, PropTypes } from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';

class GlyphButton extends Component {
    static propTypes = {
        bsStyle: PropTypes.string,
        bsSize: PropTypes.string,
        text: PropTypes.string,
        glyph: PropTypes.string.isRequired,
        onClick: PropTypes.func
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
        let { bsSize, bsStyle,glyph } = this.props;

        return (
            <Button bsStyle={bsStyle} bsSize={bsSize} onClick={this.handleSave}>
                <Glyphicon glyph={glyph}/>
                { this.getText() }
            </Button>
        )
    }
}

export default GlyphButton;
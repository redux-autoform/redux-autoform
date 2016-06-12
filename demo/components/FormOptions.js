import React from 'react';
import {ButtonGroup, Button}from 'react-bootstrap'

var FormOptions = React.createClass({

    render: function () {

        let {
            fieldLayout,
            setStackedFieldLayout,
            setInlineFieldLayout
        } = this.props;

        return (
            <div className="form-options">
                <ButtonGroup>
                    <Button active={fieldLayout == 'stacked'} onClick={ () => setStackedFieldLayout() }>Stacked
                        labels</Button>
                    <Button active={fieldLayout == 'inline'} onClick={ () => setInlineFieldLayout() }>Inline
                        labels</Button>
                </ButtonGroup>
            </div>
        );
    },

    propTypes: {
        fieldLayout: React.PropTypes.string.isRequired,
        setStackedFieldLayout: React.PropTypes.func.isRequired,
        setInlineFieldLayout: React.PropTypes.func.isRequired
    }
});

export default FormOptions;
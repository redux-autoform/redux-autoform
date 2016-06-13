import React from 'react';
import {ButtonGroup, Button}from 'react-bootstrap'

var FormOptions = React.createClass({

    render: function () {

        let {
            fieldLayout,
            componentFactory,
            setStackedFieldLayout,
            setInlineFieldLayout,
            setEditComponentFactory,
            setDetailsComponentFactory
        } = this.props;

        return (
            <div className="form-options">
                <ButtonGroup>
                    <Button active={fieldLayout == 'stacked'}
                            onClick={ () => setStackedFieldLayout() }>Stacked</Button>
                    <Button active={fieldLayout == 'inline'}
                            onClick={ () => setInlineFieldLayout() }>Inline</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button active={componentFactory == 'edit'}
                            onClick={ () => setEditComponentFactory() }>Edit</Button>
                    <Button active={componentFactory == 'details'} onClick={ () => setDetailsComponentFactory() }>Details</Button>
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
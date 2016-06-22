import React from 'react';
import {ButtonGroup, Button, ButtonToolbar}from 'react-bootstrap'

var FormOptions = React.createClass({

    render: function () {

        let {
            fieldLayout,
            componentFactory,
            setStackedFieldLayout,
            setInlineFieldLayout,
            setEditComponentFactory,
            setDetailsComponentFactory,
            updateForm,
            editorSchema, // the schema in the editor
            schema // the actual schema
        } = this.props;
        
        return (
            <ButtonToolbar className="form-options">
                <ButtonGroup>
                    <Button bsStyle="success" onClick={ () => updateForm(editorSchema) }><i className="fa fa-refresh" aria-hidden="true"></i> Update</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button active={fieldLayout == 'stacked'} onClick={ () => setStackedFieldLayout() }>
                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i> Stacked
                    </Button>
                    <Button active={fieldLayout == 'inline'} onClick={ () => setInlineFieldLayout() }>
                        <i className="fa fa-ellipsis-h" aria-hidden="true"></i> Inline
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button active={componentFactory == 'edit'} onClick={ () => setEditComponentFactory() }>
                        <i className="fa fa-pencil" aria-hidden="true"></i> Edit
                    </Button>
                    <Button active={componentFactory == 'details'} onClick={ () => setDetailsComponentFactory() }>
                        <i className="fa fa-eye" aria-hidden="true"></i>Details
                    </Button>
                </ButtonGroup>
            </ButtonToolbar>
        );
    },

    propTypes: {
        fieldLayout: React.PropTypes.string.isRequired,
        setStackedFieldLayout: React.PropTypes.func.isRequired,
        setInlineFieldLayout: React.PropTypes.func.isRequired
    }
});

export default FormOptions;
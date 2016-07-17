import React, { Component, PropTypes } from 'react';
import { ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap'

class FormOptions extends Component {
    static propTypes = {
        fieldLayout: PropTypes.string.isRequired,
        setStackedFieldLayout: PropTypes.func.isRequired,
        setInlineFieldLayout: PropTypes.func.isRequired
    };
    
    render() {
        let { fieldLayout, componentFactory, setStackedFieldLayout, setInlineFieldLayout, setEditComponentFactory, setDetailsComponentFactory, updateForm, editorSchema, schema} = this.props;
            
        return (
            <ButtonToolbar className="form-options">
                <ButtonGroup>
                    <Button bsStyle="success" onClick={ () => updateForm(editorSchema) }>
                        <i className="fa fa-refresh" aria-hidden="true"/> 
                        Update
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button active={fieldLayout == 'stacked'} onClick={ () => setStackedFieldLayout() }>
                        <i className="fa fa-ellipsis-v" aria-hidden="true"/>
                        Stacked
                    </Button>
                    <Button active={fieldLayout == 'inline'} onClick={ () => setInlineFieldLayout() }>
                        <i className="fa fa-ellipsis-h" aria-hidden="true"/> 
                        Inline
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button active={componentFactory == 'edit'} onClick={ () => setEditComponentFactory() }>
                        <i className="fa fa-pencil" aria-hidden="true"/> 
                        Edit
                    </Button>
                    <Button active={componentFactory == 'details'} onClick={ () => setDetailsComponentFactory() }>
                        <i className="fa fa-eye" aria-hidden="true"/>
                        Details
                    </Button>
                </ButtonGroup>
            </ButtonToolbar>
        );
    }
}

export default FormOptions;
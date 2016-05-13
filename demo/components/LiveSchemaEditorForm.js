import React, {Component, PropTypes} from 'react';
import psjon from '../../package.json';
import CodeEditor from './CodeEditor';
import {FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import {reduxForm} from 'redux-form';

class LiveSchemaEditorForm extends Component {
    render() {

        const {
            fields: {preset, entityName, layoutName, formTitle, schema}
        } = this.props;

        preset.onChange = function(event) {
            console.log(event.target.value);
        };

        return <div className='row'>
            <div className="col-md-12">
                <h2>Redux-autoform demo {psjon.version}</h2>
            </div>
            <div className="col-md-5">
                <div className='row'>
                    <div className="col-md-12">
                            <span className="pull-right">Check the
                                <a target="blank"
                                   href="https://github.com/gearz-lab/react-metaform/blob/master/docs-md/Documentation.md#metadata">
                                    metadata
                                documentation</a>
                            </span>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Select</ControlLabel>
                            <FormControl
                                componentClass="select"
                                placeholder="select"
                                { ...preset}>
                                <option value="preset1">preset 1</option>
                                <option value="preset2">preset 2</option>
                                <option value="preset3">preset 3</option>
                            </FormControl>
                        </FormGroup>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-6">
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Entity name</ControlLabel>
                            <FormControl
                                type="text"
                                value=""
                                placeholder="Enter text"
                                { ... entityName }
                            />
                            <FormControl.Feedback />
                            <HelpBlock>Validation is based on string length.</HelpBlock>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup controlId="formBasicText2">
                            <ControlLabel>Layout name</ControlLabel>
                            <FormControl
                                type="text"
                                value=""
                                placeholder="Enter text"
                                { ...layoutName }
                            />
                            <FormControl.Feedback />
                            <HelpBlock>Validation is based on string length.</HelpBlock>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup controlId="formBasicText3">
                            <ControlLabel>Schema</ControlLabel>
                            <CodeEditor { ...schema} />
                            <FormControl.Feedback />
                            <HelpBlock>Validation is based on string length.</HelpBlock>
                        </FormGroup>
                    </div>
                </div>
            </div>
            <div className="col-md-7">
            </div>
        </div>;
    }
}

LiveSchemaEditorForm.propTypes = {};

export default reduxForm({
    form: 'meta',
    fields: ['preset', 'entityName', 'layoutName', 'formTitle', 'schema']
})(LiveSchemaEditorForm);
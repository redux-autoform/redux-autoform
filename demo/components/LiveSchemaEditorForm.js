import React, {Component, PropTypes} from 'react';

import CodeEditor from './CodeEditor';
import {FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import {browserHistory} from 'react-router';
import presets from '../lib/presets';

class LiveSchemaEditorForm extends Component {
    render() {

        const {
            fields: {preset, entityName, layoutName, formTitle, schema},
            reduxFormActions
        } = this.props;

        preset.onChange = function (event) {
            //reduxFormActions.initialize('meta', { entityName: 'bola', layoutName: 'outra bola'}, ['preset', 'entityName', 'layoutName', 'formTitle', 'schema']);
            browserHistory.push('?preset=bola');
        };

        return <div>
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
                            {
                                presets.map(p => {
                                    return <option key={p.name} value={p.name}>{p.displayName}</option>
                                })
                            }
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
        </div>;
    }
}

LiveSchemaEditorForm.propTypes = {
    reduxFormActions: PropTypes.object.isRequired
};

export default reduxForm({
    form: 'meta',
    fields: ['preset', 'entityName', 'layoutName', 'formTitle', 'schema']
})(LiveSchemaEditorForm);
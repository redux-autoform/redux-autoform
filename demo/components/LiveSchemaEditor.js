import React, {Component, PropTypes} from 'react';
import LiveSchemaEditorForm from './LiveSchemaEditorForm';
import presets from '../presets';
import _ from 'underscore';
import psjon from '../../package.json';
import AutoForm from '../../src/AutoForm';
import editComponentFactory from '../../src/defaultEditComponentFactory';
import detailsComponentFactory from '../../src/defaultDetailsComponentFactory';
import {Alert, Badge} from 'react-bootstrap';
import moment from 'moment';
import numbro from 'numbro';
import reactWidgetsMomentLocalizer from 'react-widgets/lib/localizers/moment';
import momentLocalizer from '../../src/lib/localization/momentLocalizer';
import numbroLocalizer from '../../src/lib/localization/numbroLocalizer';
import ButtonToolbar from './ButtonToolbar';
import FormOptions from './FormOptions';

class LiveSchemaEditor extends Component {

    getAutoFormProps(metaForm, formOptions, formName, initialValues) {
        if (!formName) throw Error('Form name cannot be empty');
        if (!metaForm)
            return undefined;

        return {
            form: formName,
            fieldLayout: formOptions.fieldLayout,
            buttonBar: ButtonToolbar,
            schema: eval('(' + metaForm.schema.value + ')'),
            entityName: metaForm.entityName.value,
            layoutName: metaForm.layoutName.value,
            componentFactory: formOptions.componentFactory == 'edit' ? editComponentFactory : detailsComponentFactory,
            errorRenderer: this.errorRenderer,
            initialValues: initialValues,
            onSubmit: (...args) => {
                console.log(args);
            }
        };
    }

    /**
     * Renders an exception box
     * @param ex
     * @returns {XML}
     */
    errorRenderer(ex) {
        return <Alert bsStyle='danger'>
            <h4>Oh snap! The configuration is not valid.</h4>
            <p>Detailed information:
                <b>{ex.message}</b>
            </p>
        </Alert>;
    }

    render() {

        // setting date localizer
        reactWidgetsMomentLocalizer(moment);
        momentLocalizer(moment);

        // setting number localizer
        numbroLocalizer(numbro);

        let {
            reduxFormActions,
            preset,
            metaForm,
            formOptions,
            formOptionsActions
        } = this.props;

        preset = preset || 'default';
        let presetObject = _.find(presets, p => p.name == preset);
        if (!presetObject) throw Error(`Could not find preset. Preset name: ${preset}`);
        let autoFormProps;
        let autoForm;
        try {
            autoFormProps = this.getAutoFormProps(metaForm, formOptions, preset, presetObject.initialValues);
            autoForm = autoFormProps ? <AutoForm {...autoFormProps} /> : null;
        } catch (ex) {
            autoForm = this.errorRenderer(ex);
        }

        let underDevelopmentAlert = formOptions.componentFactory == 'details' ?
            <Alert bsStyle="danger">
                <p><b>Experimental feature</b></p>
                <p>Details forms are still under development. For now, it's just a lot of Static components instead of
                    editing components. Also,
                    it only works when the field doesn't explicitly specify the component, and it does'nt work for all types. Arrays,
                for instance, are still not supported.</p>
            </Alert>
            : null;

        return <div className="live-schema-editor">
            <div className='row'>
                <div className="col-md-12">
                    <h2>Redux-autoform demo {psjon.version} <Badge>Ctrl + H = Redux DevTools</Badge>
                        <a className="pull-right" target="_blank" href="https://github.com/gearz-lab/redux-autoform"
                           style={{color: 'black'}}>
                            <i className="fa fa-github" aria-hidden="true"/>
                        </a>
                    </h2>
                </div>
                <div className="col-md-5">
                    <LiveSchemaEditorForm reduxFormActions={reduxFormActions} selectedPreset={preset}
                                          initialValues={presetObject}/>
                </div>
                <div className="col-md-7">

                    <div className="row">
                        <div className="col-md-12">
                            <FormOptions {...formOptions} {...formOptionsActions} />
                            { underDevelopmentAlert }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="live-schema-editor-mount-node">
                                {autoForm}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    }
}

LiveSchemaEditor.propTypes = {
    preset: PropTypes.string,
    formOptions: PropTypes.object.isRequired,
    formOptionsActions: PropTypes.object.isRequired
};

export default LiveSchemaEditor;
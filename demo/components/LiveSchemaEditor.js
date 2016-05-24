import React, {Component, PropTypes} from 'react';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import LiveSchemaEditorForm from './LiveSchemaEditorForm';
import presets from '../lib/presets';
import _ from 'underscore';
import psjon from '../../package.json';
import AutoForm from '../../src/AutoForm';
import DefaultComponentFactory from '../../src/DefaultComponentFactory';
import { Alert } from 'react-bootstrap';
import moment from 'moment';
import reactWidgetsMomentLocalizer from 'react-widgets/lib/localizers/moment';
import momentLocalizer from '../../src/lib/localization/momentDateLocalizer';

class LiveSchemaEditor extends Component {

    getAutoFormProps(metaForm) {
        if(!metaForm)
            return undefined;
        return {
            schema: eval('(' + metaForm.schema.value + ')'),
            entityName: metaForm.entityName.value,
            layoutName: metaForm.layoutName.value,
            componentFactory: DefaultComponentFactory,
            errorRenderer: this.errorRenderer,
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

        reactWidgetsMomentLocalizer(moment);
        momentLocalizer(moment);

        let { reduxFormActions, preset } = this.props;
        let presetObject = preset ? _.find(presets, p => p.name == preset) : presets[0];
        let autoFormProps;
        let autoForm;
        try {
            autoFormProps = this.getAutoFormProps(this.props.metaForm);
            autoForm = autoFormProps ?  <AutoForm {...autoFormProps} /> : null;
        }catch(ex) {
            autoForm = this.errorRenderer(ex);
        }

        return <div className="live-schema-editor">
            <GitHubForkRibbon href="https://github.com/gearz-lab/react-metaform"
                              target="_blank"
                              position="right"
                              color="black">
                Fork me on GitHub
            </GitHubForkRibbon>
            <div className='row'>
                <div className="col-md-12">
                    <h2>Redux-autoform demo {psjon.version}</h2>
                </div>
                <div className="col-md-5">
                    <LiveSchemaEditorForm reduxFormActions={reduxFormActions} initialValues={presetObject} />
                </div>
                <div className="col-md-7">
                    <div className="row">
                        <div className="col-md-12">
                            {autoForm}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    }
}

LiveSchemaEditor.propTypes = {
    preset: PropTypes.string
};

export default LiveSchemaEditor;
import React, {Component, PropTypes} from 'react';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import LiveSchemaEditorForm from './LiveSchemaEditorForm';
import presets from '../lib/presets';
import _ from 'underscore';
import psjon from '../../package.json';

class LiveSchemaEditor extends Component {

    render() {

        let { reduxFormActions, preset } = this.props;
        let presetObject = preset ? _.find(presets, p => p.name == preset) : presets[0];

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
                    
                </div>
            </div>
            
        </div>
    }
}

LiveSchemaEditor.propTypes = {
    preset: PropTypes.string
};

export default LiveSchemaEditor;
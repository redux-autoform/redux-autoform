import React, {Component, PropTypes} from 'react';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import LiveSchemaEditorForm from './LiveSchemaEditorForm';

class LiveSchemaEditor extends Component {

    render() {

        return <div className="live-schema-editor">
            <GitHubForkRibbon href="https://github.com/gearz-lab/react-metaform"
                              target="_blank"
                              position="right"
                              color="black">
                Fork me on GitHub
            </GitHubForkRibbon>
            <LiveSchemaEditorForm/>
        </div>
    }
}

LiveSchemaEditor.propTypes = {};

export default LiveSchemaEditor;
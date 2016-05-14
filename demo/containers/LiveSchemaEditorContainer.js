import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LiveSchemaEditor from '../components/LiveSchemaEditor';
import { change, initialize } from 'redux-form';

const reduxFormActions = { change, initialize };

function mapStateToProps(state) {
    return {
        presets: state.presets
    };
}

function mapDispatchToProps(dispatch) {
    return {
        reduxFormActions: bindActionCreators(reduxFormActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveSchemaEditor);
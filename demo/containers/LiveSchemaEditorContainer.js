import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LiveSchemaEditor from '../components/LiveSchemaEditor';
import { change, initialize } from 'redux-form';
import { setInlineFieldLayout, setStackedFieldLayout, setEditComponentFactory, setDetailsComponentFactory } from '../actions/formOptions';

const reduxFormActions = { change, initialize };
const formOptionsActions = { setInlineFieldLayout, setStackedFieldLayout, setEditComponentFactory, setDetailsComponentFactory };

function mapStateToProps(state) {
    return {
        presets: state.presets,
        metaForm: state.form.meta,
        formOptions: state.formOptions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        reduxFormActions: bindActionCreators(reduxFormActions, dispatch),
        formOptionsActions: bindActionCreators(formOptionsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveSchemaEditor);
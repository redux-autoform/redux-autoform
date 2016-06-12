import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import formOptions from './formOptions';

const rootReducer = combineReducers({
    routing,
    form: formReducer,
    formOptions
});

export default rootReducer;

import clone from 'clone';
import _ from 'underscore';
import presets from '../presets';
import {
    UPDATE_FORM,
    SET_STACKED_FIELD_LAYOUT,
    SET_INLINE_FIELD_LAYOUT,
    SET_EDIT_COMPONENT_FACTORY,
    SET_DETAILS_COMPONENT_FACTORY
} from '../actions/formOptions';

var defaultSchema = _.find(presets, p => p.name == 'default');

var defaultState = {
    componentFactory: 'edit',
    fieldLayout: 'stacked',
    schema: defaultSchema.schema
};

export default function reduce(state = defaultState, action) {


    let newState;
    switch (action.type) {
        case UPDATE_FORM:
            newState = clone(state);
            newState.schema = action.schema;
            return newState;
        case SET_STACKED_FIELD_LAYOUT:
            newState = clone(state);
            newState.fieldLayout = 'stacked';
            return newState;
        case SET_INLINE_FIELD_LAYOUT:
            newState = clone(state);
            newState.fieldLayout = 'inline';
            return newState;
        case SET_EDIT_COMPONENT_FACTORY:
            newState = clone(state);
            newState.componentFactory = 'edit';
            return newState;
        case SET_DETAILS_COMPONENT_FACTORY:
            newState = clone(state);
            newState.componentFactory = 'details';
            return newState;
        default:
            
            return state;
    }
}
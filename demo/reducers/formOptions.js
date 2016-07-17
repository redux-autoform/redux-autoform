import clone from 'clone';
import _ from 'underscore';
import presets from '../presets';
import FormActions from '../actions/formOptions';

const defaultSchema = _.find(presets, p => p.name == 'default');
const initialState = {
    componentFactory: 'edit',
    fieldLayout: 'stacked',
    schema: defaultSchema.schema
};

export default function reduce(state = initialState, action) {
    let newState;
    
    switch (action.type) {
        case FormActions.UPDATE_FORM:
            newState = clone(state);
            newState.schema = action.schema;
    
            return newState;
    
        case FormActions.SET_STACKED_FIELD_LAYOUT:
            newState = clone(state);
            newState.fieldLayout = 'stacked';
    
            return newState;
    
        case FormActions.SET_INLINE_FIELD_LAYOUT:
            newState = clone(state);
            newState.fieldLayout = 'inline';
    
            return newState;
       
        case FormActions.SET_EDIT_COMPONENT_FACTORY:
            newState = clone(state);
            newState.componentFactory = 'edit';
            
            return newState;
       
        case FormActions.SET_DETAILS_COMPONENT_FACTORY:
            newState = clone(state);
            newState.componentFactory = 'details';
            
            return newState;
        
        default:
            return state;
    }
}
import { SET_INLINE_FIELD_LAYOUT, SET_STACKED_FIELD_LAYOUT } from '../actions/formOptions';

var defaultState = {
    fieldLayout: 'stacked'
};

export default function reduce(state = defaultState, action) {

    switch(action.type) {
        case SET_INLINE_FIELD_LAYOUT:
            return {
                fieldLayout: 'inline'
            };
        case SET_STACKED_FIELD_LAYOUT:
            return {
                fieldLayout: 'stacked'
            };
        default:
            return state;
    }
}
const UPDATE_FORM = 'UPDATE_FORM';
const SET_STACKED_FIELD_LAYOUT = 'SET_STACKED_FIELD_LAYOUT';
const SET_INLINE_FIELD_LAYOUT = 'SET_INLINE_FIELD_LAYOUT';
const SET_EDIT_COMPONENT_FACTORY = 'SET_EDIT_COMPONENT_FACTORY';
const SET_DETAILS_COMPONENT_FACTORY = 'SET_DETAILS_COMPONENT_FACTORY';

/**
 * Updates the form
 */
export const updateForm = (schema) => ({
    type: UPDATE_FORM,
    schema: schema
});

/**
 * Sets the field layout as stacked
 * @returns {{type: string}}
 */
export const setStackedFieldLayout = () => ({
    type: SET_STACKED_FIELD_LAYOUT
});

/**
 * Sets the field layout as inline
 * @returns {{type: string}}
 */
export const setInlineFieldLayout = () => ({
    type: SET_INLINE_FIELD_LAYOUT
}); 

export const setEditComponentFactory = () => ({
    type: SET_EDIT_COMPONENT_FACTORY
});

export const setDetailsComponentFactory = () => ({     
    type: SET_DETAILS_COMPONENT_FACTORY
});

export default {
    UPDATE_FORM,
    SET_STACKED_FIELD_LAYOUT,
    SET_INLINE_FIELD_LAYOUT,
    SET_EDIT_COMPONENT_FACTORY,
    SET_DETAILS_COMPONENT_FACTORY
}
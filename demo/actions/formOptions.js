export const UPDATE_FORM = 'UPDATE_FORM';
export const SET_STACKED_FIELD_LAYOUT = 'SET_STACKED_FIELD_LAYOUT';
export const SET_INLINE_FIELD_LAYOUT = 'SET_INLINE_FIELD_LAYOUT';
export const SET_EDIT_COMPONENT_FACTORY = 'SET_EDIT_COMPONENT_FACTORY';
export const SET_DETAILS_COMPONENT_FACTORY = 'SET_DETAILS_COMPONENT_FACTORY';

/**
 * Updates the form
 */
export function updateForm(schema) {
    return {
        type: UPDATE_FORM,
        schema: schema
    }
}

/**
 * Sets the field layout as stacked
 * @returns {{type: string}}
 */
export function setStackedFieldLayout() {
    return {
        type: SET_STACKED_FIELD_LAYOUT
    }
}

/**
 * Sets the field layout as inline
 * @returns {{type: string}}
 */
export function setInlineFieldLayout() {
    return {
        type: SET_INLINE_FIELD_LAYOUT
    }
}

export function setEditComponentFactory() {
    return {
        type: SET_EDIT_COMPONENT_FACTORY
    }
}

export function  setDetailsComponentFactory() {
    return {
        type: SET_DETAILS_COMPONENT_FACTORY
    }
}
export const SET_STACKED_FIELD_LAYOUT = 'SET_STACKED_FIELD_LAYOUT';
export const SET_INLINE_FIELD_LAYOUT = 'SET_INLINE_FIELD_LAYOUT';

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
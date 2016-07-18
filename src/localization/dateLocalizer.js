var _dateLocalizer;

/**
 * Sets the date localizer
 * @param localizer
 */
export function setDateLocalizer(localizer) {
    if (!localizer) throw Error('\'localizer\' should be truthy');
    _dateLocalizer = localizer;
}

/**
 * Gets the date localizer
 * @returns {*}
 */
export function getDateLocalizer() {
    if(!_dateLocalizer)
        throw Error('Localizer has not yet been set');
    return _dateLocalizer;
}


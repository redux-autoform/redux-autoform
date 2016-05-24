var _dateLocalizer;

/**
 * Sets the date localizer
 * @param localizer
 */
export function setLocalizer(localizer) {
    if (!localizer) throw Error('\'localizer\' should be truthy');
    _dateLocalizer = localizer;
}

/**
 * Gets the date localizer
 * @returns {*}
 */
export function getLocalizer() {
    return _dateLocalizer;
}


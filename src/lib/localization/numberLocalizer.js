var _numberLocalizer;

/**
 * Sets the number localizer
 * @param localizer
 */
export function setNumberLocalizer(localizer) {
    if (!localizer) throw Error('\'localizer\' should be truthy');
    _numberLocalizer = localizer;
}

/**
 * Gets the number localizer
 * @returns {*}
 */
export function getNumberLocalizer() {
    if(!_numberLocalizer)
        throw Error('Localizer has not yet been set');
    return _numberLocalizer;
}


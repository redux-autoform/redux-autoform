import { getNumberLocalizer } from '../localization/numberLocalizer';
var localizer;

function isInt(n) {
    return n % 1 === 0;
}

export default function(propertyMetadata, modelValue, model, validator) {
    if (modelValue === '' || modelValue === undefined) return undefined; // null is considered an invalid datetime
    if (propertyMetadata.type != 'int') return undefined;

    if (!localizer) localizer = getNumberLocalizer();
    let parsedValue = localizer.parse(modelValue);

    return parsedValue == null || !isInt(parsedValue) ? 'Invalid integer' : undefined;
}
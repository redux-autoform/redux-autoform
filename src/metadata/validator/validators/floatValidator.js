//TODO JS: add redux-autoform-utils import
import { getNumberLocalizer } from '../../../localization/numberLocalizer';
var localizer;

export default function(propertyMetadata, modelValue, model, validator) {
    if (modelValue === '' || modelValue === undefined) return undefined; // null is considered an invalid datetime
    if (propertyMetadata.type != 'float') return undefined;

    if (!localizer) localizer = getNumberLocalizer();
    let parsedValue = localizer.parse(modelValue);

    return parsedValue == null ? 'Invalid decimal' : undefined;
}
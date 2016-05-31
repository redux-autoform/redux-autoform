import { getFormat } from '../helpers/dateTimeHelpers';
import { getDateLocalizer } from '../localization/dateLocalizer';
var localizer;

export default function(propertyMetadata, modelValue, model, validator) {
    if (modelValue === '' || modelValue === undefined) return undefined; // null is considered an invalid datetime
    if (propertyMetadata.type != 'datetime' && propertyMetadata.type != 'time' && propertyMetadata.type != 'date') return undefined;

    if (!localizer) localizer = getDateLocalizer();
    let format = getFormat(propertyMetadata,localizer);
    let parsedValue = localizer.parse(modelValue, format);

    return parsedValue == null ? 'Invalid date/time' : undefined;
}
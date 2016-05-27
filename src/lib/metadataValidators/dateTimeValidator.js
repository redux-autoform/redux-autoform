import { getFormat } from '../helpers/dateTimeHelpers';
import { getLocalizer } from '../localization/dateLocalizer';
var localizer;

export default function(propertyMetadata, modelValue, model, validator) {
    if (!modelValue) return undefined;
    if (propertyMetadata.type != 'datetime' && propertyMetadata.type != 'time' && propertyMetadata.type != 'date') return undefined;

    if (!localizer) localizer = getLocalizer();
    let format = getFormat(propertyMetadata,localizer);
    let parsedValue = localizer.parse(modelValue, format);

    return parsedValue == null ? 'Invalid date/time' : undefined;
}
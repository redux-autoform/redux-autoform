export default function(propertyMetadata, modelValue, model, validator) {
    if (modelValue === undefined) return undefined; // null is considered an invalid datetime
    if (propertyMetadata.type != 'datetime' && propertyMetadata.type != 'time' && propertyMetadata.type != 'date') return undefined;
    return modelValue == null ? 'Invalid date/time' : undefined;
}
function isInt(n) {
    return n % 1 === 0;
}

export default function(propertyMetadata, modelValue, model, validator) {
    if (modelValue === undefined) return undefined; // null is considered an invalid datetime
    if (propertyMetadata.type != 'int') return undefined;

    return modelValue == null || !isInt(modelValue) ? 'Invalid integer' : undefined;
}
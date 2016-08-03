import expressionEvaluator from '../evaluator/expressionEvaluator';
import { getNumberLocalizer } from 'redux-autoform-utils/lib/localization/numberLocalizer';

function isInt(n) {
    return n % 1 === 0;
}

export default class Validators {

    /**
     *
     * @param propertyMetadata
     * @param modelValue
     * @param model
     * @param validator
     * @returns {*}
     */
    static validateArray(propertyMetadata, modelValue, model, validator) {
        if (!modelValue) return undefined;
        if (propertyMetadata.type != 'array') return undefined;
        if (!modelValue.length) return undefined;

        return modelValue.map(item => validator.validate(propertyMetadata.fields, item));
    };

    /**
     *
     * @param propertyMetadata
     * @param modelValue
     * @param model
     * @param validator
     * @returns {*}
     */
    static validateDateTime(propertyMetadata, modelValue, model, validator) {
        if (modelValue === undefined) return undefined; // null is considered an invalid datetime
        if (propertyMetadata.type != 'datetime' && propertyMetadata.type != 'time' && propertyMetadata.type != 'date') return undefined;

        return modelValue == null ? 'Invalid date/time' : undefined;
    }

    /**
     *
     * @param propertyMetadata
     * @param modelValue
     * @param model
     * @param validator
     * @returns {*}
     */
    static validateDefault(propertyMetadata, modelValue, model, validator) {
        if (propertyMetadata.type == 'entity' || propertyMetadata.type == 'array') return undefined;
        if (!propertyMetadata.error) return undefined;

        return expressionEvaluator.evaluate(propertyMetadata.error, model);
    }

    /**
     *
     * @param propertyMetadata
     * @param modelValue
     * @param model
     * @param validator
     * @returns {*}
     */
    static validateEntity(propertyMetadata, modelValue, model, validator) {
        if(!modelValue) return undefined;
        if (propertyMetadata.type != 'entity') return undefined;

        return validator.validate(propertyMetadata.fields, modelValue);
    };

    /**
     *
     * @param propertyMetadata
     * @param modelValue
     * @param model
     * @param validator
     * @returns {*}
     */
    static validateFloat(propertyMetadata, modelValue, model, validator) {
        let localizer;

        // null is considered an invalid datetime
        if (modelValue === '' || modelValue === undefined) return undefined;
        if (propertyMetadata.type != 'float') return undefined;

        if (!localizer) localizer = getNumberLocalizer();
        let parsedValue = localizer.parse(modelValue);

        return parsedValue == null ? 'Invalid decimal' : undefined;
    }

    /**
     *
     * @param propertyMetadata
     * @param modelValue
     * @param model
     * @param validator
     * @returns {*}
     */
    static validateInt(propertyMetadata, modelValue, model, validator) {
        if (modelValue === undefined) return undefined; // null is considered an invalid datetime
        if (propertyMetadata.type != 'int') return undefined;

        return modelValue == null || !isInt(modelValue) ? 'Invalid integer' : undefined;
    }

    /**
     *
     * @param propertyMetadata
     * @param modelValue
     * @param model
     * @param validator
     * @returns {*}
     */
    static validateRequired(propertyMetadata, modelValue, model, validator) {
        if(!propertyMetadata.required || (modelValue !== undefined && modelValue !== null && modelValue !== ''))
            return undefined;

        return expressionEvaluator.evaluate(propertyMetadata.required, model) ? 'Required' : undefined;
    }
}
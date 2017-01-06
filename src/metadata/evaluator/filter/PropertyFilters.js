import ExpressionEvaluator from '../expression/ExpressionEvaluator.js';

export default class PropertyFilters {

    /**
     *
     * @param propertyName
     * @param propertyValue
     * @param model
     * @returns {*}
     */
    static propertyFilter(propertyName, propertyValue, model, globalScope) {
        if(!model) {
            throw new Error('model is required');
        }

        if (typeof(propertyValue) === "function" && propertyName.indexOf('$') != 0) {
            // do something
            return ExpressionEvaluator.evaluate(propertyValue, model, globalScope);
        }

        return propertyValue;
    }
}
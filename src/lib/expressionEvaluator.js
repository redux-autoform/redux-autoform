import getExpressionHelper from './helpers/expressionHelper.js';

var _expressionHelper;

/**
 * Evaluates expressions
 */
export default {
    /**
     * Evaluates the given expression
     * @param expression - the expression to be evaluated. This can be either a constant, a function or a text expression
     * @param data - the data scope in which the expression will be executed
     * @returns {Object}
     */
    evaluate: function (expression, data) {
        switch (typeof expression) {
            case 'function':
                try {
                    if(!_expressionHelper) _expressionHelper = getExpressionHelper();
                    return expression(data, _expressionHelper);
                } catch (ex) {
                    // expressions shouldn't trigger an error
                    console.error('expression evaluation failed. Details: ' + ex.message);
                    return undefined;
                }
            default:
                return expression;
        }
    }
};

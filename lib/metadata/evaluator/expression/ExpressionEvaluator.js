'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expressionHelper2 = require('redux-autoform-utils/lib/helpers/expressionHelper');

var _expressionHelper3 = _interopRequireDefault(_expressionHelper2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExpressionEvaluator = function () {
    function ExpressionEvaluator() {
        _classCallCheck(this, ExpressionEvaluator);
    }

    _createClass(ExpressionEvaluator, null, [{
        key: 'evaluate',


        /**
         * Evaluates the given expression
         * @param expression - the expression to be evaluated. This can be either a constant, a function or a text expression
         * @param data - the data scope in which the expression will be executed
         * @returns {Object}
         */
        value: function evaluate(expression, data, globalScope) {
            var _expressionHelper;
            switch (typeof expression === 'undefined' ? 'undefined' : _typeof(expression)) {
                case 'function':
                    try {
                        if (!_expressionHelper) {
                            _expressionHelper = (0, _expressionHelper3.default)();
                        }

                        var evaluation = expression(data, _expressionHelper, globalScope);

                        if ((typeof evaluation === 'undefined' ? 'undefined' : _typeof(evaluation)) === 'object' && evaluation != null) {
                            // React cannot render objects. Because of that, objects are converted to strings
                            return evaluation.toString();
                        }

                        return evaluation;
                    } catch (ex) {
                        // expressions shouldn't trigger an error
                        console.error('expression evaluation failed. Details: ' + ex.message);

                        return undefined;
                    }

                default:
                    return expression;
            }
        }
    }]);

    return ExpressionEvaluator;
}();

exports.default = ExpressionEvaluator;
;
module.exports = exports['default'];
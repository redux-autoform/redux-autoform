'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ExpressionEvaluator = require('../evaluator/expression/ExpressionEvaluator');

var _ExpressionEvaluator2 = _interopRequireDefault(_ExpressionEvaluator);

var _numberLocalizer = require('redux-autoform-utils/lib/localization/numberLocalizer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isInt(n) {
    return n % 1 === 0;
}

var Validators = function () {
    function Validators() {
        _classCallCheck(this, Validators);
    }

    _createClass(Validators, null, [{
        key: 'validateArray',


        /**
         *
         * @param propertyMetadata
         * @param modelValue
         * @param model
         * @param validator
         * @returns {*}
         */
        value: function validateArray(propertyMetadata, modelValue, model, validator) {
            if (!modelValue) return undefined;
            if (propertyMetadata.type != 'array') return undefined;
            if (!modelValue.length) return undefined;

            return modelValue.map(function (item) {
                return validator.validate(propertyMetadata.fields, item);
            });
        }
    }, {
        key: 'validateDateTime',


        /**
         *
         * @param propertyMetadata
         * @param modelValue
         * @param model
         * @param validator
         * @returns {*}
         */
        value: function validateDateTime(propertyMetadata, modelValue, model, validator) {
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

    }, {
        key: 'validateDefault',
        value: function validateDefault(propertyMetadata, modelValue, model, validator) {
            if (propertyMetadata.type == 'entity' || propertyMetadata.type == 'array') return undefined;
            if (!propertyMetadata.error) return undefined;

            return _ExpressionEvaluator2.default.evaluate(propertyMetadata.error, model);
        }

        /**
         *
         * @param propertyMetadata
         * @param modelValue
         * @param model
         * @param validator
         * @returns {*}
         */

    }, {
        key: 'validateEntity',
        value: function validateEntity(propertyMetadata, modelValue, model, validator) {
            if (!modelValue) return undefined;
            if (propertyMetadata.type != 'entity') return undefined;

            return validator.validate(propertyMetadata.fields, modelValue);
        }
    }, {
        key: 'validateFloat',


        /**
         *
         * @param propertyMetadata
         * @param modelValue
         * @param model
         * @param validator
         * @returns {*}
         */
        value: function validateFloat(propertyMetadata, modelValue, model, validator) {
            var localizer = void 0;

            // null is considered an invalid datetime
            if (modelValue === '' || modelValue === undefined) return undefined;
            if (propertyMetadata.type != 'float') return undefined;

            if (!localizer) localizer = (0, _numberLocalizer.getNumberLocalizer)();
            var parsedValue = localizer.parse(modelValue);

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

    }, {
        key: 'validateInt',
        value: function validateInt(propertyMetadata, modelValue, model, validator) {
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

    }, {
        key: 'validateRequired',
        value: function validateRequired(propertyMetadata, modelValue, model, validator) {
            if (!propertyMetadata.required || modelValue !== undefined && modelValue !== null && modelValue !== '') return undefined;

            return _ExpressionEvaluator2.default.evaluate(propertyMetadata.required, model) ? 'Required' : undefined;
        }
    }]);

    return Validators;
}();

exports.default = Validators;
module.exports = exports['default'];
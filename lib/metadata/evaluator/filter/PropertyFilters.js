'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ExpressionEvaluator = require('../expression/ExpressionEvaluator.js');

var _ExpressionEvaluator2 = _interopRequireDefault(_ExpressionEvaluator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PropertyFilters = function () {
    function PropertyFilters() {
        _classCallCheck(this, PropertyFilters);
    }

    _createClass(PropertyFilters, null, [{
        key: 'propertyFilter',


        /**
         *
         * @param propertyName
         * @param propertyValue
         * @param model
         * @returns {*}
         */
        value: function propertyFilter(propertyName, propertyValue, model, globalScope) {
            if (!model) {
                throw new Error('model is required');
            }

            if (typeof propertyValue === "function" && propertyName.indexOf('$') != 0) {
                // do something
                return _ExpressionEvaluator2.default.evaluate(propertyValue, model, globalScope);
            }

            return propertyValue;
        }
    }]);

    return PropertyFilters;
}();

exports.default = PropertyFilters;
module.exports = exports['default'];
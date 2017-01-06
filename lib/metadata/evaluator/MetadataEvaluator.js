'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PropertyFilters = require('./filter/PropertyFilters');

var _PropertyFilters2 = _interopRequireDefault(_PropertyFilters);

var _Filters = require('./filter/Filters');

var _Filters2 = _interopRequireDefault(_Filters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MetadataEvaluator = function () {
    function MetadataEvaluator() {
        _classCallCheck(this, MetadataEvaluator);
    }

    _createClass(MetadataEvaluator, null, [{
        key: 'addPropertyFilter',


        /**
         * Adds the given filter
         */


        // this array contains objects like: { property: 'invalid', filter: filter }
        // fieldFilters that don't have a property associated will act on all properties
        // in the order they were registered
        value: function addPropertyFilter(filter) {
            if (!filter) throw Error('\'filter\' should be truthy');

            this.propertyFilters.push(filter);
        }

        /**
         * Adds the given filter for the given metadata property name
         * @param metadataProperty
         * @param filter
         */


        // this array contains metadata filters

    }, {
        key: 'addPropertyFieldFilter',
        value: function addPropertyFieldFilter(filter, metadataProperty) {
            if (!filter) throw Error('\'filter\' should be truthy');

            this.fieldFilters.push({ property: metadataProperty, filter: filter });
        }

        /**
         * Evaluates the given metadata against the model
         * @param propertyMetadata - Can be either an object or an array of objects
         * @param model
         * @param keyPrefix
         * @param reduxFieldProps
         * @param onChange
         * @returns {{}}
         */

    }, {
        key: 'evaluate',
        value: function evaluate(propertyMetadata, model, keyPrefix, reduxFieldProps, onChange, globalScope) {
            var _this = this;

            if (!propertyMetadata) throw Error('Argument \'propertyMetadata\' should be truthy');
            if (!model) throw Error('\'model\' should be truthy');

            if (propertyMetadata.constructor === Array) {
                return propertyMetadata.map(function (i) {
                    return _this.evaluate(i, model, keyPrefix, reduxFieldProps, onChange, globalScope);
                });
            }

            var result = {};

            Object.keys(propertyMetadata).forEach(function (fieldName) {
                result[fieldName] = _this.filterPropertyField(fieldName, propertyMetadata[fieldName], model, globalScope);
            });

            var newPrefix = keyPrefix ? keyPrefix + '.' + propertyMetadata.name : propertyMetadata.name;

            return this.filterProperty(result, model, newPrefix, reduxFieldProps, onChange, globalScope);
        }

        /**
         * Filters the given property against the model
         * @param fieldName
         * @param fieldValue
         * @param model
         */

    }, {
        key: 'filterPropertyField',
        value: function filterPropertyField(fieldName, fieldValue, model, globalScope) {
            var fieldFilters = this.fieldFilters;

            var processedFieldValue = fieldValue;

            for (var i = 0; i < fieldFilters.length; i++) {

                if (!fieldFilters[i].property || fieldFilters[i].property === fieldName) {
                    var filter = fieldFilters[i].filter;

                    processedFieldValue = filter(fieldName, processedFieldValue, model, globalScope);
                }
            }

            return processedFieldValue;
        }

        /**
         * Filters the given metadata against the model
         * @param metadata
         * @param model
         * @param keyPrefix
         * @param metadataIndex
         * @param reduxProps
         * @returns {*}
         */

    }, {
        key: 'filterProperty',
        value: function filterProperty(metadata, model, keyPrefix, metadataIndex, reduxProps, globalScope) {
            var propertyFilters = this.propertyFilters;

            var processedMetadata = metadata;

            for (var i = 0; i < propertyFilters.length; i++) {
                var filter = propertyFilters[i];

                processedMetadata = filter(processedMetadata, model, keyPrefix, this, metadataIndex, reduxProps, globalScope);
            }

            return processedMetadata;
        }
    }]);

    return MetadataEvaluator;
}();

// register metadata filters


MetadataEvaluator.fieldFilters = [];
MetadataEvaluator.propertyFilters = [];
MetadataEvaluator.addPropertyFilter(_Filters2.default.defaultFilter); // sets redux props, key and id
MetadataEvaluator.addPropertyFilter(_Filters2.default.entityFilter); // processes entities
MetadataEvaluator.addPropertyFilter(_Filters2.default.arrayFilter); // processes arrays

// register property field filters
// evaluates functions to literals
MetadataEvaluator.addPropertyFieldFilter(_PropertyFilters2.default.propertyFilter);

exports.default = MetadataEvaluator;
module.exports = exports['default'];
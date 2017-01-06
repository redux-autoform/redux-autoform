'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filters = function () {
    function Filters() {
        _classCallCheck(this, Filters);
    }

    _createClass(Filters, null, [{
        key: 'arrayFilter',


        /**
         *
         * @param propertyMetadata
         * @param model
         * @param keyPrefix
         * @param metadataEvaluator
         * @param reduxProps
         * @param onChange
         * @returns {*}
         */
        value: function arrayFilter(propertyMetadata, model, keyPrefix, metadataEvaluator, reduxProps, onChange, globalScope) {

            if (!propertyMetadata) throw Error('Argument \'propertyMetadata\' should be truthy');
            if (!model) throw Error('Argument \'model\' should be truthy');
            if (!globalScope) globalScope = model;

            if (propertyMetadata.type == 'array' && propertyMetadata.arrayType == 'entity') {
                (function () {
                    if (!propertyMetadata.fields) {
                        throw Error('when metadata is of type \'array\' and arrayType is \'entity\', it must have a fields property');
                    }

                    if (!model.hasOwnProperty(propertyMetadata.name) || model[propertyMetadata.name] === null || model[propertyMetadata.name] === undefined) {
                        // if the property does not exist, create it
                        model[propertyMetadata.name] = [];
                    } else {
                        // if the property exists, it must be an object
                        if (!(model[propertyMetadata.name] instanceof Array)) {
                            throw Error('when metadata is of type array, the model value should be an array');
                        }
                    }

                    // returns the reduxProps for a particular array item
                    var getReduxPropsForItem = function getReduxPropsForItem(index) {
                        if (!reduxProps) return undefined;
                        if (reduxProps && !reduxProps.hasOwnProperty(propertyMetadata.name)) throw Error('reduxProps is defined but it does not have the required property metadata');
                        return reduxProps[propertyMetadata.name][index];
                    };

                    propertyMetadata.fields = model[propertyMetadata.name].map(function (item, index) {
                        return metadataEvaluator.evaluate(propertyMetadata.fields, item, keyPrefix + '.' + index, getReduxPropsForItem(index), onChange, globalScope);
                    });
                })();
            }
            return propertyMetadata;
        }

        /**
         *
         * @param propertyMetadata
         * @param model
         * @param keyPrefix
         * @param metadataEvaluator
         * @param reduxProps
         * @param onChange
         * @returns {*}
         */

    }, {
        key: 'defaultFilter',
        value: function defaultFilter(propertyMetadata, model, keyPrefix, metadataEvaluator, reduxProps, onChange, globalScope) {

            if (!propertyMetadata) throw Error('Argument \'propertyMetadata\' should be truthy');
            if (!model) throw Error('Argument \'model\' should be truthy');

            propertyMetadata.key = keyPrefix;

            // set redux properties
            if (reduxProps && reduxProps.hasOwnProperty(propertyMetadata.name)) {
                propertyMetadata.reduxFormProps = reduxProps[propertyMetadata.name];
            }

            return propertyMetadata;
        }

        /**
         *
         * @param propertyMetadata
         * @param model
         * @param keyPrefix
         * @param metadataEvaluator
         * @param reduxProps
         * @param onChange
         * @returns {*}
         */

    }, {
        key: 'entityFilter',
        value: function entityFilter(propertyMetadata, model, keyPrefix, metadataEvaluator, reduxProps, onChange, globalScope) {
            if (!propertyMetadata) throw new Error('metadata is required');
            if (!model) throw new Error('model is required');
            if (!globalScope) globalScope = model;

            if (propertyMetadata.type == 'entity') {

                if (!propertyMetadata.fields) {
                    throw Error('when metadata is of type entity, it must have a fields property');
                }

                if (model && !model.hasOwnProperty(propertyMetadata.name) || model[propertyMetadata.name] === null || model[propertyMetadata.name] === undefined) {
                    // if the property does not exist, create it
                    model[propertyMetadata.name] = {};
                } else {
                    // if the property exists, it must be an object
                    if (_typeof(model[propertyMetadata.name]) !== 'object') {
                        throw Error('when metadata is of type entity, the model value should be an object');
                    }
                }

                var itemReduxProps = reduxProps ? reduxProps[propertyMetadata.name] : undefined;
                propertyMetadata.fields = metadataEvaluator.evaluate(propertyMetadata.fields, model[propertyMetadata.name], keyPrefix, itemReduxProps, onChange, globalScope);
            }

            return propertyMetadata;
        }
    }]);

    return Filters;
}();

exports.default = Filters;
module.exports = exports['default'];
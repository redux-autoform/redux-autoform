'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Parsers = require('./Parsers');

var _Parsers2 = _interopRequireDefault(_Parsers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModelParser = function () {
    function ModelParser() {
        _classCallCheck(this, ModelParser);
    }

    _createClass(ModelParser, null, [{
        key: 'addProcessor',


        /**
         * Adds the given filters
         *
         * @param parser
         * @param types
         */
        value: function addProcessor(parser, types) {
            if (!parser) throw Error('\'filter\' should be truthy');
            if (!types) throw Error('\'type\' should be truthy');
            if (!(types instanceof Array)) throw Error('type should be an array');

            var parsers = this.parsers;


            types.forEach(function (type) {
                parsers[type] = parser;
            });
        }

        /**
         * Evaluates the given metadata against the model
         *
         * @param propertyMetadata - Can be either an object or an array of objects
         * @param model
         */

    }, {
        key: 'process',
        value: function process(model, propertyMetadata) {
            var _this = this;

            if (!model) throw Error('\'model\' should be truthy');
            if (!propertyMetadata) throw Error('Argument \'propertyMetadata\' should be truthy');
            if (propertyMetadata.constructor != Array) throw Error('propertyMetadata should be an array');

            var result = {};

            propertyMetadata.forEach(function (eachPropertyMetadata) {
                result[eachPropertyMetadata.name] = _this.processProperty(eachPropertyMetadata, model);
            });

            return result;
        }

        /**
         * Filters the given metadata against the model
         *
         * @param metadata
         * @param model
         */

    }, {
        key: 'processProperty',
        value: function processProperty(metadata, model) {
            var parsers = this.parsers;

            var value = model[metadata.name];

            // if there's a parser for the property type
            if (value != null && value != undefined && metadata.type && parsers[metadata.type]) {
                return parsers[metadata.type](metadata, value, this);
            }

            return value;
        }
    }]);

    return ModelParser;
}();

ModelParser.parsers = {};


ModelParser.addProcessor(_Parsers2.default.parseDateTime, ['datetime', 'date', 'time']);
ModelParser.addProcessor(_Parsers2.default.parseNumber, ['int', 'float']);
ModelParser.addProcessor(_Parsers2.default.parseEntity, ['entity']);
ModelParser.addProcessor(_Parsers2.default.parseArray, ['array']);

exports.default = ModelParser;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dateTimeHelpers = require('redux-autoform-utils/lib/helpers/dateTimeHelpers');

var _dateLocalizer = require('redux-autoform-utils/lib/localization/dateLocalizer');

var _numberLocalizer = require('redux-autoform-utils/lib/localization/numberLocalizer');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parsers = function () {
    function Parsers() {
        _classCallCheck(this, Parsers);
    }

    _createClass(Parsers, null, [{
        key: 'parseArray',


        /**
         *
         * @param metadata
         * @param value
         * @param modelParser
         * @returns {*}
         */
        value: function parseArray(metadata, value, modelParser) {
            return value.map(function (item) {
                return modelParser.process(item, metadata.fields);
            });
        }

        /**
         *
         * @param metadata
         * @param value
         * @returns {*}
         */

    }, {
        key: 'parseDateTime',
        value: function parseDateTime(metadata, value) {
            var localizer;

            if (typeof value == 'string') {
                if (!localizer) localizer = (0, _dateLocalizer.getDateLocalizer)();
                var format = (0, _dateTimeHelpers.getFormat)(metadata, localizer);
                return localizer.parse(value, format);
            }

            return value;
        }

        /**
         *
         * @param metadata
         * @param value
         * @param modelParser
         * @returns {*}
         */

    }, {
        key: 'parseEntity',
        value: function parseEntity(metadata, value, modelParser) {
            return modelParser.process(value, metadata.fields, modelParser);
        }

        /**
         *
         * @param metadata
         * @param value
         * @returns {*}
         */

    }, {
        key: 'parseNumber',
        value: function parseNumber(metadata, value) {
            var localizer;

            if (typeof value == 'string') {
                if (!localizer) localizer = (0, _numberLocalizer.getNumberLocalizer)();
                return localizer.parse(value);
            }
            return value;
        }
    }]);

    return Parsers;
}();

exports.default = Parsers;
module.exports = exports['default'];
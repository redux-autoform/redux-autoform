'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Validators = require('./Validators');

var _Validators2 = _interopRequireDefault(_Validators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MetadataValidator = function () {
    function MetadataValidator() {
        _classCallCheck(this, MetadataValidator);
    }

    _createClass(MetadataValidator, null, [{
        key: 'addValidator',


        /**
         *
         * @param validator
         */
        value: function addValidator(validator) {
            this.validators.push(validator);
        }

        /**
         * Evaluates the given metadata against the model
         * @param propertyMetadata - Can be either an object or an array of objects
         * @param model
         * @returns {{}}
         */

    }, {
        key: 'validate',
        value: function validate(propertyMetadata, model) {
            var _this = this;

            if (!propertyMetadata) throw Error('Argument \'propertyMetadata\' should be truthy');
            if (!model) throw Error('\'model\' should be truthy');
            if (propertyMetadata.constructor !== Array) throw Error('ApropertyMetadata should be an array');

            var validators = this.validators;

            var validationResult = {};

            propertyMetadata.forEach(function (m) {
                var propertyValidation = void 0;

                for (var i = 0; i < validators.length; i++) {
                    var validate = validators[i];
                    propertyValidation = validate(m, model[m.name], model, _this);

                    if (propertyValidation !== null && propertyValidation !== undefined) break;
                }

                validationResult[m.name] = propertyValidation;
            });

            return validationResult;
        }
    }]);

    return MetadataValidator;
}();

//Adding validators..


MetadataValidator.validators = [];
MetadataValidator.addValidator(_Validators2.default.validateRequired);
MetadataValidator.addValidator(_Validators2.default.validateArray);
MetadataValidator.addValidator(_Validators2.default.validateEntity);
MetadataValidator.addValidator(_Validators2.default.validateDefault);
MetadataValidator.addValidator(_Validators2.default.validateDateTime);
MetadataValidator.addValidator(_Validators2.default.validateInt);
MetadataValidator.addValidator(_Validators2.default.validateFloat);

exports.default = MetadataValidator;
module.exports = exports['default'];
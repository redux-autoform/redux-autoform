'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numbroLocalizer = exports.momentLocalizer = exports.ComponentFactory = exports.AutoForm = undefined;

var _AutoForm2 = require('./AutoForm.js');

var _AutoForm3 = _interopRequireDefault(_AutoForm2);

var _ComponentFactory2 = require('redux-autoform-utils/lib/factory/ComponentFactory');

var _ComponentFactory3 = _interopRequireDefault(_ComponentFactory2);

var _momentLocalizer2 = require('redux-autoform-utils/lib/localization/momentLocalizer');

var _momentLocalizer3 = _interopRequireDefault(_momentLocalizer2);

var _numbroLocalizer2 = require('redux-autoform-utils/lib/localization/numbroLocalizer');

var _numbroLocalizer3 = _interopRequireDefault(_numbroLocalizer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.AutoForm = _AutoForm3.default;

// component factories
// main component

exports.ComponentFactory = _ComponentFactory3.default;

//localizers

exports.momentLocalizer = _momentLocalizer3.default;
exports.numbroLocalizer = _numbroLocalizer3.default;
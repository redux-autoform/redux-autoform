'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//TODO Jonatan.Salas: This needs to be tested. 
var UIManager = function () {
    function UIManager() {
        _classCallCheck(this, UIManager);

        this.instance = new UIManager();
        this.factoryTypes = {};
        this.allowedUIs = ['bootstrap', 'material'];
        var factoryTypes = this.factoryTypes;


        this.allowedUIs.forEach(function (value) {
            factoryTypes[value] = require('redux-autoform-' + value + '-ui');
        });
    }

    _createClass(UIManager, [{
        key: 'getFactory',
        value: function getFactory(type) {
            return this.factoryTypes[type];
        }
    }], [{
        key: 'getFactoryPerType',
        value: function getFactoryPerType(type) {
            return this.instance.getFactory(type);
        }
    }]);

    return UIManager;
}();
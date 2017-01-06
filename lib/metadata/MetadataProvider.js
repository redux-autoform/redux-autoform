'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MetadataProvider = function () {
    function MetadataProvider() {
        _classCallCheck(this, MetadataProvider);
    }

    _createClass(MetadataProvider, null, [{
        key: 'canonizeSchema',


        /**
         * Returns a cloned schema which is canonical, meaning that every 'entities', 'fields', 'layouts' and 'groups' are
         * arrays and not objects.
         * @param schema
         * @returns {*}
         */
        value: function canonizeSchema(schema) {
            if (!schema) throw Error('\'schema\' should be truthy');

            if (!schema.entities) {
                // when no entities are specified in the schema, the schema is considered to be in the SIMPLEST form, example:
                // {
                //     name: {
                //         type: 'string'
                //     },
                //     dateOfBirth: {
                //         type: 'string'
                //     }
                // }
                // OR...
                // [
                //     { name: 'name', type: 'string' },
                //     { name: 'dateOfBirth', type: 'date' },
                // ]
                // In this case, I'm just creating a 'default' entity
                return MetadataProvider.canonizeSchema({
                    entities: [{
                        name: 'default',
                        fields: schema
                    }]
                });
            }

            schema = _extends({}, schema);
            this._canonizeArrays(schema, ["entities", "layouts", "groups"]);

            return schema;
        }
    }, {
        key: '_canonizeArrays',
        value: function _canonizeArrays(dataArray, keys) {
            var _this = this;

            var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            dataArray[keys[id]] = MetadataProvider.canonizeArray(dataArray[keys[id]]);
            if (dataArray[keys[id]]) {
                dataArray[keys[id]].forEach(function (elem) {
                    elem.fields = MetadataProvider.canonizeArray(elem.fields);
                    if (id + 1 < keys.length) _this._canonizeArrays(elem, keys, id + 1);
                });
            }
        }
        /**
         * Ensures the object passed in is an array. If it is, it is returned, otherwise, this function
         * converts the target object into an array.
         * This is important to convert this:
         *     { fields: { dateOfBirth: { type: 'string' } } // this should be acceptable as a fields definition
         * into this:
         *     { fields: [{ name: 'dateOfBirth', type: 'string' }] } // this is the canonical field definition
         * @param obj
         */

    }, {
        key: 'canonizeArray',
        value: function canonizeArray(obj) {
            // this is so the canonizeSchema method doesn't have to check every property for undefined
            if (!obj) return obj;

            if (Array.isArray(obj)) return obj;

            // let's create an array
            return Object.keys(obj).map(function (property) {
                var isObject = obj[property] && _typeof(obj[property]) === "object";
                if (!isObject) throw Error('cannot generate canonical array. Every field should be an object');

                return _extends({ name: property }, obj[property]);
            });
        }

        /**
         * Validates a field metadata
         * @param metadata
         * @private
         */

    }, {
        key: 'validateFieldMetadata',
        value: function validateFieldMetadata(metadata) {
            if (!metadata) throw Error('metadata should not be null or undefined');
            if (!metadata.name) throw Error('metadata\'s "name" property is required');
            if (!metadata.type) throw Error('metadata\'s "type" property is required');
        }

        /**
         * Gets a raw entity from the given schema. No processing.
         * @param schema
         * @param entityName
         * @returns {*}
         */

    }, {
        key: 'getEntity',
        value: function getEntity(schema, entityName) {
            if (!schema) throw Error('\'schema\' should be truthy');
            if (schema.entities === undefined || schema.entities === null || !schema.entities.length) throw Error('schema should have entities');

            var entity = void 0;

            if (entityName) {
                entity = schema.entities.find(function (e) {
                    return e.name === entityName;
                });
            } else {
                if (schema.entities.length != 1) throw Error('When an entityName is not specified, there must be one and only one entity');
                entity = schema.entities[0];
            }

            if (!entity) throw Error('Could not find entity. Entity name: ' + entityName);

            return entity;
        }

        /**
         * Gets a raw layout from the given entity. No processing.
         * @param entity
         * @param layoutName
         * @returns {*}
         */

    }, {
        key: 'getLayout',
        value: function getLayout(entity, layoutName) {
            if (!entity) throw Error('\'entity\' should be truthy');
            var layout = void 0;

            if (layoutName) {
                layout = entity.layouts ? entity.layouts.find(function (l) {
                    return l.name === layoutName;
                }) : layout;
            } else {
                if (entity.layouts.length != 1) throw Error('When the layoutName is not specified, there must be one and only one layout');
                layout = entity.layouts[0];
            }

            if (!layout) throw Error('Could not find layout. Layout name: ' + layoutName);

            return layout;
        }

        /**
         * Gets a raw entity and a raw layout from the given schema.
         * @param schema
         * @param entityName
         * @param layoutName
         * @returns {{entity: *, layout: *}}
         */

    }, {
        key: 'getEntityAndLayout',
        value: function getEntityAndLayout(schema, entityName, layoutName) {
            var entity = this.getEntity(schema, entityName);
            var layout = layoutName ? this.getLayout(entity, layoutName) : this.generateDefaultLayout(schema, entity);

            return {
                entity: entity,
                layout: layout
            };
        }

        /**
         * Internal method for merging entity and layout fields
         * @param schema
         * @param entity
         * @param layout
         * @param partialResult
         * @param callback
         * @return {*[]}
         */

    }, {
        key: 'getFieldsInternal',
        value: function getFieldsInternal(schema, entity, layout, partialResult, callback) {
            var _this2 = this;

            if (!schema) throw Error('\'schema\' should be truthy');
            if (!entity) throw Error('\'entity\' should be truthy');
            if (!layout.fields && !layout.groups) throw Error('A layout should have fields or groups');

            partialResult = partialResult || [];
            var thisGroupFields = [];

            if (layout.groups) {
                layout.groups.forEach(function (g) {
                    var fieldsInternal = _this2.getFieldsInternal(schema, entity, g, partialResult, callback);
                    thisGroupFields = _this2.merge(thisGroupFields, fieldsInternal);
                });
            }

            if (layout.fields) {
                var _loop = function _loop(i) {

                    var groupField = layout.fields[i];
                    var existingEntityProperty = entity.fields.find(function (field) {
                        return field.name == groupField.name;
                    });

                    var field = _extends({}, existingEntityProperty || {}, groupField);
                    _this2.validateFieldMetadata(field);

                    thisGroupFields.push(field);

                    if (field.type == 'entity') {

                        if (!field.entityName) {
                            throw Error('when a field is of type \'entity\', it needs to specify an \'entityName\'');
                        }

                        var entityAndLayout = _this2.getEntityAndLayout(schema, field.entityName, field.layoutName);
                        field.layout = _this2.processLayout(schema, entityAndLayout.entity, entityAndLayout.layout);
                        field.fields = _this2.getFieldsInternal(schema, entityAndLayout.entity, entityAndLayout.layout, partialResult, callback);
                    }

                    if (field.type == 'array') {
                        if (!field.arrayType) {
                            throw Error('when a field is of type \'array\', it needs to specify an \'arrayType\'');
                        }

                        if (field.arrayType != 'entity') {
                            throw Error('only entity arrays are currently supported');
                        }

                        if (!field.entityType) {
                            throw Error('when a field is of type \'array\' and arrayType is \'entity\', it needs to specify an \'entityType\'');
                        }

                        var _entityAndLayout = _this2.getEntityAndLayout(schema, field.entityType, field.layoutName);
                        field.layout = _this2.processLayout(schema, _entityAndLayout.entity, _entityAndLayout.layout);
                        field.fields = _this2.getFieldsInternal(schema, _entityAndLayout.entity, _entityAndLayout.layout, partialResult, callback);
                    }

                    if (callback) {
                        callback(field);
                    }
                };

                for (var i = 0; i < layout.fields.length; i++) {
                    _loop(i);
                }
            }

            return this.merge(partialResult, thisGroupFields);
        }

        /**
         * Merges the given field collection
         * @param schema
         * @param entity
         * @param layout
         * @param callback
         * @external https://github.com/gearz-lab/react-metaform/blob/master/docs-md/MetadataProvider.md
         */

    }, {
        key: 'getFields',
        value: function getFields(schema, entity, layout, callback) {
            entity = typeof entity === 'string' ? this.getEntity(schema, entity) : entity;

            if (!layout) {
                layout = this.generateDefaultLayout(schema, entity);
            } else {
                layout = typeof layout === 'string' ? this.getLayout(entity, layout) : layout;
            }

            return this.getFieldsInternal(schema, entity, layout, undefined, callback);
        }

        /**
         * Creates a clone of the given layout-group that maintains only the hierarchy and the 'name' property
         * for fields
         * @param layoutGroup
         * @returns {Object}
         */

    }, {
        key: 'processLayoutGroup',
        value: function processLayoutGroup(layoutGroup) {
            if (!layoutGroup) throw Error('\'layoutGroup\' should be truthy');

            var layoutGroupClone = {};
            if (layoutGroup.fields) {
                layoutGroupClone.fields = [];

                for (var i = 0; i < layoutGroup.fields.length; i++) {
                    layoutGroupClone.fields.push({ name: layoutGroup.fields[i].name });
                }
            } else if (layoutGroup.groups) {
                layoutGroupClone.groups = [];

                for (var _i = 0; _i < layoutGroup.groups.length; _i++) {
                    layoutGroupClone.groups.push(this.processLayoutGroup(layoutGroup.groups[_i]));
                }
            }

            // copying useful properties
            layoutGroupClone.orientation = layoutGroup.orientation;
            layoutGroupClone.component = layoutGroup.component;
            layoutGroupClone.title = layoutGroup.title;

            return layoutGroupClone;
        }
    }, {
        key: 'processLayout',
        value: function processLayout(schema, entity, layout) {
            entity = typeof entity === 'string' ? this.getEntity(schema, entity) : entity;
            layout = typeof layout === 'string' ? this.getLayout(entity, layout) : layout;

            return this.processLayoutGroup(layout);
        }

        /**
         * Generates a default layout for the given entity. Useful so it's not obligatory to implement layouts.
         * @param schema application schema
         * @param entity
         */

    }, {
        key: 'generateDefaultLayout',
        value: function generateDefaultLayout(schema, entity) {
            entity = typeof entity === 'string' ? this.getEntity(schema, entity) : entity;
            return {
                name: entity.name + '-default',
                fields: entity.fields.map(function (f) {
                    return {
                        name: f.name
                    };
                })
            };
        }

        /**
         * Gets the field-list for Redux-Form
         * @param fieldMetadata
         * @param prefix
         */

    }, {
        key: 'getReduxFormFields',
        value: function getReduxFormFields(fieldMetadata, prefix) {
            var _this3 = this;

            if (!fieldMetadata) throw Error('fieldMetadata should be truthy');
            var result = [];

            fieldMetadata.forEach(function (f) {
                if (f.fields) {
                    // if a field has fields, it's either an array or a complex object
                    var fieldPrefix = f.type == 'array' ? f.name + '[]' : f.name;
                    var totalPrefix = prefix ? prefix + '.' + fieldPrefix : fieldPrefix;
                    _this3.getReduxFormFields(f.fields, totalPrefix).map(function (f2) {
                        return result.push(f2);
                    });
                } else {
                    result.push(prefix ? prefix + '.' + f.name : f.name);
                }
            });

            return result;
        }
    }, {
        key: 'merge',
        value: function merge(from, to) {
            if (!from) throw Error('from should be truthy');
            if (!to) throw Error('to should be truthy');

            return [].concat(_toConsumableArray(new Set(from.concat(to))));
        }
    }]);

    return MetadataProvider;
}();

exports.default = MetadataProvider;
;
module.exports = exports['default'];
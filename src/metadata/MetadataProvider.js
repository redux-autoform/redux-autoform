export default class MetadataProvider {

    /**
     * Returns a cloned schema which is canonical, meaning that every 'entities', 'fields', 'layouts' and 'groups' are
     * arrays and not objects.
     * @param schema
     * @returns {*}
     */
    static canonizeSchema(schema) {
        if (!schema) throw Error('\'schema\' should be truthy');

        if(!schema.entities) {
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
                entities: [
                    {
                        name: 'default',
                        fields: schema
                    }
                ]
            });
        }

        schema = {...schema};
        this._canonizeArrays(schema, ["entities", "layouts", "groups"])

        //schema.entities = MetadataProvider.canonizeArray(schema.entities);
        //_.each(schema.entities, entity => {
        //    entity.fields = MetadataProvider.canonizeArray(entity.fields);
        //    entity.layouts = MetadataProvider.canonizeArray(entity.layouts);
        //    _.each(entity.layouts, layout => {
        //        layout.fields = MetadataProvider.canonizeArray(layout.fields);
        //        layout.groups = MetadataProvider.canonizeArray(layout.groups);
        //        _.each(layout.groups, group => {
        //            group.fields = MetadataProvider.canonizeArray(group.fields);
        //        })
        //    });
        //});


        return schema;
    }

    static _canonizeArrays(dataArray, keys, id = 0) {
        dataArray[keys[id]] = MetadataProvider.canonizeArray(dataArray[keys[id]]);
        if(dataArray[keys[id]]) {
            dataArray[keys[id]].forEach(elem => {
                elem.fields = MetadataProvider.canonizeArray(elem.fields);
                if(id + 1 < keys.length)
                    this._canonizeArrays(elem, keys, id + 1);
            })
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
    static canonizeArray(obj) {
        if (!obj) return obj; // this is so the canonizeSchema method doesn't have to check every property for undefined

        if (Array.isArray(obj))
            return obj;

        // let's create an array
        return Object.keys(obj).map((property) => {
            let isObject = obj[property] && typeof obj[property] === "object";
            if (!isObject)
                throw Error('cannot generate canonical array. Every field should be an object');
            return {name: property, ...obj[property]};
        });
    }

    /**
     * Validates a field metadata
     * @param metadata
     * @private
     */
    static validateFieldMetadata(metadata) {
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
    static getEntity(schema, entityName) {
        if (!schema) throw Error('\'schema\' should be truthy');
        if (schema.entities === undefined || schema.entities === null || !schema.entities.length) throw Error('schema should have entities');

        let entity;
        if(entityName)
            entity = schema.entities.find(e => e.name === entityName);
        else {
            if(schema.entities.length != 1)
                throw Error('When an entityName is not specified, there must be one and only one entity');
            entity = schema.entities[0];
        }

        if (!entity) throw Error(`Could not find entity. Entity name: ${entityName}`);
        return entity;
    }

    /**
     * Gets a raw layout from the given entity. No processing.
     * @param entity
     * @param layoutName
     * @returns {*}
     */
    static getLayout(entity, layoutName) {
        if (!entity) throw Error('\'entity\' should be truthy');
        let layout;

        if(layoutName)
            layout = entity.layouts.find(l => l.name === layoutName);
        else {
            if(entity.layouts.length != 1)
                throw Error('When the layoutName is not specified, there must be one and only one layout');
            layout = entity.layouts[0];
        }

        if (!layout) throw Error(`Could not find layout. Layout name: ${layoutName}`);
        return layout;
    }

    /**
     * Gets a raw entity and a raw layout from the given schema.
     * @param schema
     * @param entityName
     * @param layoutName
     * @returns {{entity: *, layout: *}}
     */
    static getEntityAndLayout(schema, entityName, layoutName) {
        let entity = this.getEntity(schema, entityName);
        let layout = layoutName ? this.getLayout(entity, layoutName) : this.generateDefaultLayout(schema, entity);

        return {
            entity: entity,
            layout: layout
        }
    }

    /**
     * Internal method for merging entity and layout fields
     * @param schema
     * @param entity
     * @param layout
     * @param partialResult
     * @param callback
     * @return {Number}
     */
    static getFieldsInternal(schema, entity, layout, partialResult, callback) {

        if (!schema) throw Error('\'schema\' should be truthy');
        if (!entity) throw Error('\'entity\' should be truthy');
        if (!layout.fields && !layout.groups) throw Error('A layout should have fields or groups');

        partialResult = partialResult || [];
        let thisGroupFields = [];

        if (layout.groups) {
            layout.groups.forEach(g => {
                thisGroupFields = [... new Set(thisGroupFields.concat(this.getFieldsInternal(schema, entity, g, partialResult, callback)))];
            });
        }

        if (layout.fields) {

            for (let i = 0; i < layout.fields.length; i++) {

                let groupField = layout.fields[i];
                let existingEntityProperty = entity.fields.find(field => field.name == groupField.name);

                let field = {...existingEntityProperty || {}, ...groupField};
                this.validateFieldMetadata(field);

                thisGroupFields.push(field);

                if (field.type == 'entity') {

                    if (!field.entityName) {
                        throw Error('when a field is of type \'entity\', it needs to specify an \'entityName\'')
                    }

                    let entityAndLayout = this.getEntityAndLayout(schema, field.entityName, field.layoutName);
                    field.layout = this.processLayout(schema, entityAndLayout.entity, entityAndLayout.layout);
                    field.fields = this.getFieldsInternal(schema, entityAndLayout.entity, entityAndLayout.layout, partialResult, callback);
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

                    let entityAndLayout = this.getEntityAndLayout(schema, field.entityType, field.layoutName);
                    field.layout = this.processLayout(schema, entityAndLayout.entity, entityAndLayout.layout);
                    field.fields = this.getFieldsInternal(schema, entityAndLayout.entity, entityAndLayout.layout, partialResult, callback);
                }

                if (callback) {
                    callback(field);
                }
            }
        }

        return [...new Set(partialResult.concat(thisGroupFields))];
    }

    /**
     * Merges the given field collection
     * @param schema
     * @param entity
     * @param layout
     * @param callback
     * @external https://github.com/gearz-lab/react-metaform/blob/master/docs-md/MetadataProvider.md
     */
    static getFields(schema, entity, layout, callback) {
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
    static processLayoutGroup(layoutGroup) {
        if (!layoutGroup) throw Error('\'layoutGroup\' should be truthy');

        let layoutGroupClone = {};
        if (layoutGroup.fields) {
            layoutGroupClone.fields = [];
            for (let i = 0; i < layoutGroup.fields.length; i++) {
                layoutGroupClone.fields.push({name: layoutGroup.fields[i].name});
            }
        } else if (layoutGroup.groups) {
            layoutGroupClone.groups = [];
            for (let i = 0; i < layoutGroup.groups.length; i++) {
                layoutGroupClone.groups.push(this.processLayoutGroup(layoutGroup.groups[i]));
            }
        }

        // copying useful properties
        layoutGroupClone.orientation = layoutGroup.orientation;
        layoutGroupClone.component = layoutGroup.component;
        layoutGroupClone.title = layoutGroup.title;

        return layoutGroupClone;
    }

    static processLayout(schema, entity, layout) {
        entity = typeof entity === 'string' ? this.getEntity(schema, entity) : entity;
        layout = typeof layout === 'string' ? this.getLayout(entity, layout) : layout;

        return this.processLayoutGroup(layout);
    }

    /**
     * Generates a default layout for the given entity. Useful so it's not obligatory to implement layouts.
     * @param schema application schema
     * @param entity
     */
    static generateDefaultLayout(schema, entity) {
        entity = typeof entity === 'string' ? this.getEntity(schema, entity) : entity;
        return {
            name: `${entity.name}-default`,
            fields: entity.fields.map(f => {
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
    static getReduxFormFields(fieldMetadata, prefix) {
        if (!fieldMetadata) throw Error('fieldMetadata should be truthy');
        let result = [];

        fieldMetadata.forEach(f => {
            if (f.fields) {
                // if a field has fields, it's either an array or a complex object
                let fieldPrefix = f.type == 'array' ? `${f.name}[]` : f.name;
                let totalPrefix = prefix ? `${prefix}.${fieldPrefix}` : fieldPrefix;
                this.getReduxFormFields(f.fields, totalPrefix).map(f2 => result.push(f2));
            } else {
                result.push(prefix ? `${prefix}.${f.name}` : f.name)
            }
        });

        return result;
    }
};
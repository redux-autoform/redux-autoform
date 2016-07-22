import chai from 'chai';
import metadataProvider from '../src/metadata/MetadataProvider.js';
const assert = chai.assert;

describe('MetadataProvider', function () {

    describe('getFields', function () {

        it('Basic usage', () => {
            let schema = {
                entities: []
            };
            assert.throws(() => metadataProvider.getFields(schema, 'contact', 'contact-edit'), /schema should have entities/);
        });

        it('Should work with layout only properties', function () {
            let schema = {
                entities: [
                    {
                        name: "contact",
                        fields: [
                            {
                                name: "property1",
                                type: "string"
                            },
                            {
                                name: "propertyGrouped1",
                                type: "string"
                            },
                            {
                                name: "propertyGrouped2",
                                type: "string"
                            }
                        ],
                        layouts: [
                            {
                                name: "contact-edit",
                                fields: [
                                    {
                                        name: "groupProperty",
                                        displayName: "Group property",
                                        type: "group",
                                        group: "g1"
                                    },
                                    {
                                        name: "property1",
                                        displayName: "Another property"
                                    }
                                ],
                                groups: [
                                    {
                                        name: "g1",
                                        fields: [
                                            {name: "propertyGrouped1", size: 3, displayName: null},
                                            {name: "propertyGrouped2", size: 9, displayName: null},
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            let fields = metadataProvider.getFields(schema, 'contact', 'contact-edit');
        });

        it('Text expressions', function () {
            let schema = {
                entities: [
                    {
                        name: 'contact',
                        fields: [
                            {
                                name: 'name',
                                displayName: function (m) {
                                    return m.name;
                                },
                                addonBefore: function (m) {
                                    return m.name
                                },
                                type: 'string'
                            }
                        ],
                        layouts: [{
                            name: 'contact-edit',
                            fields: [
                                {
                                    name: 'name'
                                }
                            ]
                        }]
                    }
                ]
            };
            let fields = metadataProvider.getFields(schema, 'contact', 'contact-edit');
            assert.isFunction(fields[0].displayName);
            assert.isFunction(fields[0].addonBefore);
            assert.equal(fields[0].addonBefore({name: 'Andre'}), 'Andre');
        });

        it('Should merge fields', function () {

            let schema = {
                entities: [
                    {
                        name: 'contact',
                        fields: [
                            {
                                name: 'name',
                                type: 'string',
                                displayName: 'Name'
                            },
                            {
                                name: 'date',
                                type: 'date',
                                displayName: 'Date'
                            }
                        ],
                        layouts: [
                            {
                                name: 'dumb-layout',
                                fields: []
                            },
                            {
                                name: 'contact-edit',
                                fields: [
                                    {
                                        name: 'name',
                                        layoutOnlyProp: true
                                    },
                                    {
                                        name: 'date'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            let fields = metadataProvider.getFields(schema, 'contact', 'contact-edit', f => f.fruit = 'banana');


            assert.strictEqual(fields.length, 2);
            assert.strictEqual(fields[0].layoutOnlyProp, true);
            assert.strictEqual(fields[0].type, 'string');
        });

        it('Should work with nested properties', function () {

            let schema = require('./assets/metadataProviderTestData/completeWithNestedEntity');

            let fields = metadataProvider.getFields(schema, 'contact', 'contact-edit');

            assert.strictEqual(fields.length, 3);

            assert.strictEqual(fields[0].name, 'name');
            assert.strictEqual(fields[0].type, 'string');
            assert.strictEqual(fields[0].displayName, 'Name');

            assert.strictEqual(fields[1].name, 'date');
            assert.strictEqual(fields[1].type, 'date');
            assert.strictEqual(fields[1].displayName, 'Date');

            assert.strictEqual(fields[2].name, 'phone');
            assert.strictEqual(fields[2].type, 'entity');
            assert.strictEqual(fields[2].displayName, 'Phone');
            assert.strictEqual(fields[2].fields.length, 2);

            assert.strictEqual(fields[2].fields[0].name, 'number');
            assert.strictEqual(fields[2].fields[0].type, 'string');

            assert.strictEqual(fields[2].fields[1].name, 'carrier');
            assert.strictEqual(fields[2].fields[1].type, 'entity');
            assert.strictEqual(fields[2].fields[1].entityName, 'carrier');
            assert.strictEqual(fields[2].fields[1].layoutName, 'carrier-edit');
            assert.strictEqual(fields[2].fields[1].fields.length, 1);
        });

        it('Should work with nested props 2', function () {

            let schema = {
                entities: [
                    {
                        name: 'contact',
                        fields: [
                            {
                                name: 'name',
                                type: 'string',
                                displayName: 'Name'
                            },
                            {
                                name: 'date',
                                type: 'date',
                                displayName: 'Date'
                            },
                            {
                                name: 'phone',
                                type: 'entity',
                                entityName: 'phone',
                                displayName: 'Phone'
                            }
                        ],
                        layouts: [
                            {
                                name: 'contact-edit',
                                groups: [
                                    {
                                        fields: [
                                            {
                                                name: 'name'
                                            },
                                            {
                                                name: 'date'
                                            }
                                        ]
                                    },
                                    {
                                        fields: [
                                            {
                                                name: 'phone',
                                                layoutName: 'phone-edit'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'phone',
                        fields: [
                            {
                                name: 'number',
                                type: 'string'
                            },
                            {
                                name: 'carrier',
                                type: 'entity',
                                entityName: 'carrier'
                            }
                        ],
                        layouts: [
                            {
                                name: 'phone-edit',
                                groups: [
                                    {
                                        fields: [
                                            {
                                                name: 'number'
                                            },
                                            {
                                                name: 'carrier',
                                                layoutName: 'carrier-edit'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'carrier',
                        fields: [
                            {
                                name: 'longDistanceCode',
                                type: 'int'
                            }
                        ],
                        layouts: [
                            {
                                name: 'carrier-edit',
                                fields: [
                                    {
                                        name: 'longDistanceCode'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            let {layout} = metadataProvider.getEntityAndLayout(schema, 'contact', 'contact-edit');
            let fields = metadataProvider.getFields(schema, 'contact', 'contact-edit');
        });

        it('Should merge fields with nested layouts', function () {

            let schema = {
                entities: [
                    {
                        name: 'contact',
                        fields: [
                            {
                                name: 'name',
                                type: 'string',
                                displayName: 'Name'
                            },
                            {
                                name: 'date',
                                type: 'date',
                                displayName: 'Date'
                            }],
                        layouts: [
                            {
                                name: 'contact-edit',
                                groups: [
                                    {
                                        groups: [
                                            {
                                                fields: [
                                                    {
                                                        name: 'name',
                                                        layoutOnlyProp: true
                                                    },
                                                    {
                                                        name: 'date'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            let fields = metadataProvider.getFields(schema, 'contact', 'contact-edit');
            assert.strictEqual(fields.length, 2);
            assert.strictEqual(fields[0].layoutOnlyProp, true);
            assert.strictEqual(fields[0].type, 'string');
        });

        it('Non-existing layout', function () {

            let schema = {

                entities: [
                    {
                        name: 'contact',
                        fields: [
                            {
                                name: 'name',
                                type: 'string',
                                displayName: 'Name'
                            },
                            {
                                name: 'date',
                                type: 'date',
                                displayName: 'Date'
                            }
                        ]
                    }
                ],
                layouts: []
            };
            assert.throws(() => metadataProvider.getFields(schema, 'contact', 'contact-edit'), /Could not find layout/);
        });

        it('Non-specified layout', function () {

            let schema = {

                entities: [
                    {
                        name: 'contact',
                        fields: [
                            {
                                name: 'name',
                                type: 'string',
                                displayName: 'Name'
                            },
                            {
                                name: 'date',
                                type: 'date',
                                displayName: 'Date'
                            }
                        ]
                    }
                ],
                layouts: []
            };
            let fields = metadataProvider.getFields(schema, 'contact', '');
            assert.strictEqual(fields.length, 2);
            assert.strictEqual(fields[0].name, 'name');
            assert.strictEqual(fields[1].name, 'date');
        });

    });

    describe('processLayout', function () {
        it('Should merge fields', function () {

            let schema = require('./assets/metadataProviderTestData/completeWithNestedEntity');
            let layoutProcessed = metadataProvider.processLayout(schema, 'contact', 'contact-edit');

            assert.equal(layoutProcessed.fields.length, 3);
            assert.equal(layoutProcessed.fields[0].name, 'name');
            assert.equal(layoutProcessed.fields[1].name, 'date');
            assert.equal(layoutProcessed.fields[2].name, 'phone');
        });
    });

    describe('generateDefaultLayout', function () {
        let schema = {

            entities: [
                {
                    name: 'contact',
                    fields: [
                        {
                            name: 'name',
                            type: 'string',
                            displayName: 'Name'
                        },
                        {
                            name: 'date',
                            type: 'date',
                            displayName: 'Date'
                        }
                    ]
                }
            ],
            layouts: []
        };
        let defaultLayout = metadataProvider.generateDefaultLayout(schema, 'contact');
        assert.strictEqual(defaultLayout.name, 'contact-default');
        assert.strictEqual(defaultLayout.fields.length, 2);
        assert.strictEqual(defaultLayout.fields[0].name, 'name');
        assert.strictEqual(defaultLayout.fields[1].name, 'date');
    });

    describe('getReduxFormFields', function () {
        it('default behavior', function () {

            let schema = {
                entities: [
                    {
                        name: 'contact',
                        fields: [
                            {
                                name: 'name',
                                type: 'string'
                            },
                            {
                                name: 'phones',
                                type: 'array',
                                arrayType: 'entity',
                                entityType: 'phone',
                                layoutName: 'edit'
                            }
                        ]
                    },
                    {
                        name: 'phone',
                        fields: [
                            {
                                name: 'number',
                                type: 'string'
                            }
                        ],
                        layouts: [
                            {
                                name: 'edit',
                                fields: [
                                    {
                                        name: 'number'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }

            let fields = metadataProvider.getFields(schema, 'contact');
            let reduxFields = metadataProvider.getReduxFormFields(fields);
            assert.strictEqual(reduxFields[0], 'name');
            assert.strictEqual(reduxFields[1], 'phones[].number');

        })
    });

    describe('canonizeSchema', function () {
        it('should return an exact same schema is nothing needs to be canonized', function () {

            let schema = {
                entities: [
                    {
                        name: 'contact',
                        fields: [
                            {name: 'name', type: 'string'},
                            {name: 'dateOfBirth', type: 'date'}
                        ],
                        layouts: [
                            {
                                name: 'edit',
                                fields: [
                                    {name: 'name'},
                                    {name: 'dateOfBirth'}
                                ],
                                groups: [
                                    {
                                        name: 'g1',
                                        fields: [
                                            {name: 'name'}
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            let newSchema = metadataProvider.canonizeSchema(schema);
            assert.isArray(newSchema.entities);
            assert.isArray(newSchema.entities[0].fields);
            assert.isArray(newSchema.entities[0].layouts);
            assert.isArray(newSchema.entities[0].layouts[0].fields);
            assert.isArray(newSchema.entities[0].layouts[0].groups);
            assert.isArray(newSchema.entities[0].layouts[0].groups[0].fields);
        });

        it('should return a canonical schema when the passed in schema has objects instead of arrays', function () {

            let schema = {
                entities: {
                    contact: {
                        fields: {
                            name: {type: 'string'},
                            dateOfBirth: {type: 'date'}
                        },
                        layouts: {
                            edit: {
                                fields: {
                                    name: {},
                                    dateOfBirth: {}
                                },
                                groups: {
                                    g1: {
                                        fields: {
                                            name: {}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            let newSchema = metadataProvider.canonizeSchema(schema);
            assert.isArray(newSchema.entities);
            assert.equal('contact', newSchema.entities[0].name);
            assert.isArray(newSchema.entities[0].fields);
            assert.equal('name', newSchema.entities[0].fields[0].name);
            assert.equal('string', newSchema.entities[0].fields[0].type);
            assert.isArray(newSchema.entities[0].layouts);
            assert.isArray(newSchema.entities[0].layouts[0].fields);
            assert.isArray(newSchema.entities[0].layouts[0].groups);
            assert.isArray(newSchema.entities[0].layouts[0].groups[0].fields);

        });

        it('should return a canonical schema when passing in a simple form schema', function ()
        {
            let schema = {
                name: {
                    type: 'string'
                },
                dateOfBirth: {
                    type: 'date'
                }
            };

            let newSchema = metadataProvider.canonizeSchema(schema);
            assert.isArray(newSchema.entities);
            assert.equal('default', newSchema.entities[0].name);
            assert.isArray(newSchema.entities[0].fields);
            assert.equal('name', newSchema.entities[0].fields[0].name);
            assert.equal('string', newSchema.entities[0].fields[0].type);
            assert.equal('dateOfBirth', newSchema.entities[0].fields[1].name);
            assert.equal('date', newSchema.entities[0].fields[1].type);
        });
    });

    describe('canonizeArray', function () {

        it('should return an array when it\'s already an array', function () {
            let input = [{name: 'name', type: 'string'}, {name: 'dateOfBirth', type: 'date'}];
            let result = metadataProvider.canonizeArray(input);
            assert.isArray(result);
            assert.equal(result[0].name, "name");
            assert.equal(result[0].type, "string");
            assert.equal(result[1].name, "dateOfBirth");
            assert.equal(result[1].type, "date");
        });

        it('should return an array when it\'s an object', function () {
            let input = {name: {type: 'string'}, dateOfBirth: {type: 'date'}};
            let result = metadataProvider.canonizeArray(input);
            assert.isArray(result);
            assert.equal(result[0].name, "name");
            assert.equal(result[0].type, "string");
            assert.equal(result[1].name, "dateOfBirth");
            assert.equal(result[1].type, "date");
        });

        it('should trigger an exception when the passed object contains a property that is no an object', function () {
            let input = {name: {type: 'string'}, dateOfBirth: 2};
            assert.throws(() => metadataProvider.canonizeArray(input), /cannot generate canonical array/g);
        });
    });
});

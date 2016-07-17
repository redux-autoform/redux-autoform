import _ from 'underscore';

import dateTimeParser from './modelParsers/dateTimeParser';
import numberParser from './modelParsers/numberParser';
import entityParser from './modelParsers/entityParser';
import arrayParser from './modelParsers/arrayParser';

class ModelProcessor {

    constructor() {
        this.parsers = {};
    }

    /**
     * Evaluates the given metadata against the model
     * @param propertyMetadata - Can be either an object or an array of objects
     * @param model
     */
    process(model, propertyMetadata) {
        if (!model) throw Error('\'model\' should be truthy');
        if (!propertyMetadata) throw Error('Argument \'propertyMetadata\' should be truthy');
        if (propertyMetadata.constructor != Array) throw Error('propertyMetadata should be an array');

        let result = {};

        _.each(propertyMetadata, (eachPropertyMetadata) => {
            result[eachPropertyMetadata.name] = this.processProperty(eachPropertyMetadata, model);
        });

        return result;
    }

    /**
     * Adds the given filter
     */
    addProcessor(parser, types) {
        if (!parser) throw Error('\'filter\' should be truthy');
        if (!types) throw Error('\'type\' should be truthy');
        if (!(types instanceof Array)) throw Error('type should be an array');

        _.each(types, type => {
            this.parsers[type] = parser;
        });
    }

    /**
     * Filters the given metadata against the model
     * @param metadata
     * @param model
     */
    processProperty(metadata, model) {
        let value = model[metadata.name];
        if (value != null && value != undefined && metadata.type && this.parsers[metadata.type]) { // if there's a parser for the property type
            return this.parsers[metadata.type](metadata, value, this);
        }
        return value;
    }
}

let modelParser = new ModelProcessor();
modelParser.addProcessor(dateTimeParser, ['datetime', 'date', 'time']);
modelParser.addProcessor(numberParser, ['int', 'float']);
modelParser.addProcessor(entityParser, ['entity']);
modelParser.addProcessor(arrayParser, ['array']);

export default modelParser;
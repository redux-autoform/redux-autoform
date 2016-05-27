import _ from 'underscore';

import dateTimeParser from './modelProcessors/dateTimeParser';
import entityParser from './modelProcessors/entityProcessor';
import arrayParser from './modelProcessors/arrayProcessor';

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
    addProcessor(parser, type) {
        if (!parser) throw Error('\'filter\' should be truthy');
        this.parsers[type] = parser;
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

var modelParser = new ModelProcessor();
modelParser.addProcessor(dateTimeParser, 'datetime');
modelParser.addProcessor(entityParser, 'entity');
modelParser.addProcessor(arrayParser, 'array');

export default modelParser;
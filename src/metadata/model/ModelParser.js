import Parsers from './Parsers';

class ModelParser {
    static parsers = {};

    /**
     * Adds the given filters
     *
     * @param parser
     * @param types
     */
    static addProcessor(parser, types) {
        if (!parser) throw Error('\'filter\' should be truthy');
        if (!types) throw Error('\'type\' should be truthy');
        if (!(types instanceof Array)) throw Error('type should be an array');

        types.forEach(type => {
            this.parsers[type] = parser;
        });
    }

    /**
     * Evaluates the given metadata against the model
     *
     * @param propertyMetadata - Can be either an object or an array of objects
     * @param model
     */
    static process(model, propertyMetadata) {
        if (!model) throw Error('\'model\' should be truthy');
        if (!propertyMetadata) throw Error('Argument \'propertyMetadata\' should be truthy');
        if (propertyMetadata.constructor != Array) throw Error('propertyMetadata should be an array');

        let result = {};

        propertyMetadata.forEach((eachPropertyMetadata) => {
            result[eachPropertyMetadata.name] = this.processProperty(eachPropertyMetadata, model);
        });

        return result;
    }

    /**
     * Filters the given metadata against the model
     *
     * @param metadata
     * @param model
     */
    static processProperty(metadata, model) {
        let value = model[metadata.name];
        if (value != null && value != undefined && metadata.type && this.parsers[metadata.type]) { // if there's a parser for the property type
            return this.parsers[metadata.type](metadata, value, this);
        }

        return value;
    }
}

ModelParser.addProcessor(Parsers.parseDateTime, ['datetime', 'date', 'time']);
ModelParser.addProcessor(Parsers.parseNumber, ['int', 'float']);
ModelParser.addProcessor(Parsers.parseEntity, ['entity']);
ModelParser.addProcessor(Parsers.parseArray, ['array']);

export default ModelParser;
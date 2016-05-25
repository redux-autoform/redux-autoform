import dateTimeParser from './modelParsers/dateTimeParser';
import entityParser from './modelParsers/entityParser';
import arrayParser from './modelParsers/arrayParser';

class ModelParser {

    constructor() {
        this.parsers = {};
    }

    /**
     * Evaluates the given metadata against the model
     * @param propertyMetadata - Can be either an object or an array of objects
     * @param model
     */
    parse(propertyMetadata, model) {
        if(!propertyMetadata) throw Error('Argument \'propertyMetadata\' should be truthy');
        if (!model) throw Error('\'model\' should be truthy');
        if (propertyMetadata.constructor === Array) return propertyMetadata.map(i => this.parse(i, model));

        this.parseProperty(propertyMetadata, model);
    }

    /**
     * Adds the given filter
     */
    addParser(parser, type) {
        if (!parser) throw Error('\'filter\' should be truthy');
        this.parsers[type] = parser; 
    }

    /**
     * Filters the given metadata against the model
     * @param metadata
     * @param model
     */
    parseProperty(metadata, model) {
        let value = model[metadata.name];
        if(value == null || value == undefined) return; // no need to parse null or undefined
        if(metadata.type && this.parsers[metadata.type]) { // if there's a parser for the property type
            model[metadata.name] = this.parsers[metadata.type](metadata, value, this);
        }
    }
}

var modelParser = new ModelParser();
modelParser.addParser(dateTimeParser, 'datetime');
modelParser.addParser(entityParser, 'entity');
modelParser.addParser(arrayParser, 'array');

export default modelParser;
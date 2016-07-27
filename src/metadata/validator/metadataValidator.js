import defaultValidator from './validators/defaultMetadataValidator';
import arrayValidator from './validators/arrayValidator';
import entityValidator from './validators/entityValidator';
import requiredValidator from './validators/requiredValidator';
import dateTimeValidator from './validators/dateTimeValidator';
import intValidator from './validators/intValidator';
import floatValidator from './validators/floatValidator';

var validator = {
    validators: [],
    /**
     * Evaluates the given metadata against the model
     * @param propertyMetadata - Can be either an object or an array of objects
     * @param model
     * @returns {{}}
     */
    validate(propertyMetadata, model) {
        if (!propertyMetadata) throw Error('Argument \'propertyMetadata\' should be truthy');
        if (!model) throw Error('\'model\' should be truthy');
        if (propertyMetadata.constructor !== Array) throw Error('ApropertyMetadata should be an array');

        let validationResult = {};
        propertyMetadata.forEach(m => {
            let propertyValidation;
            for(let i = 0; i < this.validators.length; i++) {
                let validate = this.validators[i];
                propertyValidation = validate(m, model[m.name], model, this);
                if(propertyValidation !== null && propertyValidation !== undefined) break;
            }
            validationResult[m.name] = propertyValidation;
        });
        return validationResult;
    }
};

validator.validators.push(requiredValidator);
validator.validators.push(arrayValidator);
validator.validators.push(entityValidator);
validator.validators.push(defaultValidator);
validator.validators.push(dateTimeValidator);
validator.validators.push(intValidator);
validator.validators.push(floatValidator);

export default validator;
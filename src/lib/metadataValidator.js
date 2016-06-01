import _ from 'underscore';
import defaultValidator from './metadataValidators/defaultMetadataValidator';
import arrayValidator from './metadataValidators/arrayValidator';
import entityValidator from './metadataValidators/entityValidator';
import requiredValidator from './metadataValidators/requiredValidator';
import dateTimeValidator from './metadataValidators/dateTimeValidator';
import intValidator from './metadataValidators/intValidator';
import floatValidator from './metadataValidators/floatValidator';

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
        _.each(propertyMetadata, m => {
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
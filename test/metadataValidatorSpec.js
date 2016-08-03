const chai = require('chai');
const metadataValidator = require('../src/metadata/MetadataValidator.js');
const assert = chai.assert;

describe('metadataValidator', function() {
   it('validate - Required', function() {
       let metadata = [
           {
                name: 'name',
                required: true
           }
       ];
       let validation = metadataValidator.validate(metadata, { name: '' });
       assert.equal(validation.name, 'Required');
   });
    it('validate - required - function', function() {
       let metadata = [
           {
                name: 'name',
                required: (m) => m.value > 500
           }
       ];
       let validation = metadataValidator.validate(metadata, { name: '', value: 1000 });
       assert.equal(validation.name, 'Required');
   });
   it('validate - Required', function() {
       let metadata = [
           {
                name: 'contact',
                required: true,
                type: 'entity',
                fields: [
                    {
                        name: 'name',
                        required: true
                    }
                ]
           }
       ];
       
       let validation = metadataValidator.validate(metadata, { contact: { name: '' } });
       assert.equal(validation.contact.name, 'Required');
   });
});
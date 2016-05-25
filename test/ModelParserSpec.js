import chai from 'chai';
import modelParser from '../src/lib/modelParser';
const assert = chai.assert;

describe('ModelParser', function () {
    it('datetime', function () {
        let metadata = [{
            name: 'dateOfBirth',
            value: '12/08/1984',
            format: 'DD/MM/YYYY',
            type: 'datetime'
        }];
        let model = { dateOfBirth: '12/08/1984'};
        modelParser.parse(metadata, model);
        assert.ok(model.dateOfBirth instanceof Date);
    });
    it('entity', function () {
        let metadata = {
            name: 'phone',
            type: 'entity',
            fields: [
                {
                    name: 'number'
                },
                {
                    name: 'carrier',
                    type: 'entity',
                    entityName: 'carrier',
                    fields: [
                        {
                            name: 'code',
                            type: 'int'
                        },
                        {
                            name: 'date',
                            type: 'datetime',
                            format: 'DD/MM/YYYY'
                        }
                    ]
                }
            ]
        };
        let model = {
            phone: {
                number: '99168204',
                carrier: {
                    code: "51",
                    date: '12/08/1984'
                }
            }
        };
        modelParser.parse(metadata, model);
        assert.ok(model.phone.carrier.date instanceof Date);
    });
});
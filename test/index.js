import 'es5-shim';
import moment from 'moment';
import momentLocalizer from '../src/localization/momentLocalizer';
import numbro from 'numbro';
import numbroLocalizer from '../src/localization/numbroLocalizer';

beforeEach(function() {
    sinon.stub(console, 'warn');
});

afterEach(function() {
    if (typeof console.warn.restore === 'function') {
        assert(!console.warn.called, () => {
            return `${console.warn.getCall(0).args[0]} \nIn '${this.currentTest.fullTitle()}'`;
        });
        console.warn.restore();
    }
});

describe('Process environment for tests', function () {
    it('Should be development for React console warnings', function () {
        assert.equal(process.env.NODE_ENV, 'development');
    });
});

const testsContext = require.context('.', true, /Spec$/);

// set localization
momentLocalizer(moment);
numbroLocalizer(numbro);

testsContext.keys().forEach(testsContext);

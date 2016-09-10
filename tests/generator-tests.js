"use strict"

var assert = require('chai').assert;
var FableNames = require('../fable-names.js');
var OptionsGenerator = require('../options-generator.js');
var Helpers = require('../helpers.js');

describe('FableNames.generateOptions', function () {
    it('1000 working options', function() {
        for (var index = 0; index < 1000; index++) 
            assert.doesNotThrow(() => new FableNames().get());
    }).timeout(3000);
});

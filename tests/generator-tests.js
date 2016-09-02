"use strict"

var assert = require('chai').assert;
var OptionsGenerator = require('../options-generator.js');

describe('FableNames.generateOptions', function () {
    it('1000 working options', function() {
        for (var index = 0; index < 1000; index++) 
            assert.doesNotThrow(() => new FableNames().get());
    }).timeout(3000);
});

describe('OptionsGenerator.get', function () {
    it('Seeded options', function() {
        var optionsGenerator = new OptionsGenerator();
        var options =  optionsGenerator.get(134);

        for (var fullCycles = 0; fullCycles < 10; fullCycles++) 
            assert.deepEqual(options, optionsGenerator.get(134));
    });
});
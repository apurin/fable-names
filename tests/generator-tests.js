"use strict"

var assert = require('chai').assert;
var FableNames = require('../fable-names.js');
var OptionsGenerator = FableNames.OptionsGenerator;

describe('OptionsGenerator.get', function () {
    it('simple', function() {
        var optionsGenerator = new OptionsGenerator(); 

        for (var i = 0; i < 1000; i++) {
            new FableNames(optionsGenerator.get()).get();
        }

        var firstNane = new FableNames(optionsGenerator.get());
        var surname = new FableNames(optionsGenerator.get());           

        for (var index = 0; index < 100; index++) {
            console.log(firstNane.get() + " " + surname.get()); 
        }    
    });
});
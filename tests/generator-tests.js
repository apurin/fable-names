"use strict"

var assert = require('chai').assert;
var FableNames = require('../fable-names.js');
var OptionsGenerator = FableNames.OptionsGenerator;

describe('OptionsGenerator.get', function () {
    it('options check', function() {
        var optionsGenerator = new OptionsGenerator(); 

        var totalPassed = 0;
        for (var fullCycles = 0; fullCycles < 100; fullCycles++) {
            for (var i = 0; i < 100; i++) {
                try {                    
                    new FableNames(optionsGenerator.get()).get();
                    totalPassed++;
                } catch (e) {
                    //console.log("Succesfull: " + i);
                    //console.log(e.message);
                    break;
                }                
            }
        }
        console.log("Success rate: " + (totalPassed / 100) + "%");

        

        var firstNane = new FableNames(optionsGenerator.get());
        var surname = new FableNames(optionsGenerator.get());           

        //for (var index = 0; index < 100; index++) {
        //    console.log(firstNane.get() + " " + surname.get()); 
        //}    
    }).timeout(10000000);
});
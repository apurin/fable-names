var assert = require('chai').assert;
var NameGenerator = require('../name-generator.js');

describe('general', function () {
    it('test', function() {  

        console.log("================");

        var localSpecific =  {
            excludeLetters: 'qxzw',
            firstLetterPreference: 'mnartp',
            lastLetterPreference: 'oiua',
        };


        var familyName = new NameGenerator(NameGenerator.getRandomOptions(undefined, localSpecific));
        var firstMaleName = new NameGenerator(NameGenerator.getRandomOptions(undefined, localSpecific));
        var firstFemaleName = new NameGenerator(NameGenerator.getRandomOptions(undefined, localSpecific));

        
        for (var i = 0; i < 30; i++) {
            console.log(firstMaleName.get() + " " + familyName.get());
        }

        console.log("================");

        var myoptions =  {
            excludeLetters: 'qxzjy',
            firstLetterPreference: 'mnartp',
            severalVowelsChance: 0.05,
            severalConsonantsChance: 0.4,
            doublesChance: 0.1
        };

        var myGenerator = new NameGenerator(myoptions);

        for (var i = 0; i < 30; i++) {
            //console.log(myGenerator.get() + " " + myGenerator.get());
        }

    });
});
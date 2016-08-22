var assert = require('chai').assert;
var NameGenerator = require('../name-generator.js');

describe('general', function () {
    it('test', function() {
        
        // for (var i = 0; i < 3; i++) {
        //      var options = NameGenerator.getRandomOptions(2 + i);
        //      var generator = new NameGenerator(options);
        //      console.log("Options # " + i);
        //      for (var j = 0; j < 10; j++) {
        //         console.log(generator.get());
        //      }
        // }

        var localSpecific =  {
            excludeLetters: 'qxzw'
        };


        var familyName = new NameGenerator(NameGenerator.getRandomOptions(undefined, localSpecific));
        var firstMaleName = new NameGenerator(NameGenerator.getRandomOptions(undefined, localSpecific));
        var firstFemaleName = new NameGenerator(NameGenerator.getRandomOptions(undefined, localSpecific));

        
        for (var i = 0; i < 30; i++) {
            console.log(firstMaleName.get() + " " + familyName.get() + " married to " + firstFemaleName.get() + " " + familyName.get());
        }

    });
});
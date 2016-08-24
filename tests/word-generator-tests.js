var assert = require('chai').assert;
var NameGenerator = require('../name-generator.js');

describe('general', function () {
//    it('test', function() {  
//
//        console.log("================");
//
//        var localSpecific =  {
//            excludeLetters: 'qxzw',
//            firstLetterPreference: 'mnartp',
//            lastLetterPreference: 'oiua',
//        };
//
//
//        var familyName = new NameGenerator(NameGenerator.getRandomOptions(undefined, localSpecific));
//        var firstMaleName = new NameGenerator(NameGenerator.getRandomOptions(undefined, localSpecific));
//        var firstFemaleName = new NameGenerator(NameGenerator.getRandomOptions(undefined, localSpecific));
//
//        
//        for (var i = 0; i < 30; i++) {
//            //console.log(firstMaleName.get() + " " + familyName.get());
//        }
//
//        console.log("================");
//
//        var myoptions =  {
//            prefixes: ['ae', 'ag', 'ae', 'al', 'an', 'app', 'av', 'ba', 'bl', 'ca', 'br', 'sex', 'her', 'gla', 'iu', 'iua'],
//            postfixes: ['ia', 'na', 'nus', 'ana', 'nus', 'appa', 'ina', 'us', 'la', 'inus'],
//            minSize: 5,
//            maxSize: 10,
//            excludeLetters: 'jxqzy'
//        };
//
//        var myGenerator = new NameGenerator(myoptions);
//
//        for (var i = 0; i < 30; i++) {
//            console.log(myGenerator.get() + " " + myGenerator.get());
//        }
//
//    });
});
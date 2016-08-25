var assert = require('chai').assert;
var WordGenerator = require('../word-generator.js');

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
//        var familyName = new WordGenerator(WordGenerator.getRandomOptions(undefined, localSpecific));
//        var firstMaleName = new WordGenerator(WordGenerator.getRandomOptions(undefined, localSpecific));
//        var firstFemaleName = new WordGenerator(WordGenerator.getRandomOptions(undefined, localSpecific));
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
//        var myGenerator = new WordGenerator(myoptions);
//
//        for (var i = 0; i < 30; i++) {
//            console.log(myGenerator.get() + " " + myGenerator.get());
//        }
//
//    });
});
var assert = require('chai').assert;
var WordAnalyzer = require('../word-analyzer.js');

describe('WordAnalyzer.getSyllables', function () {
    "use strict"

    var analyzer = new WordAnalyzer();

    it('count syllables', function() {  
        assert.deepEqual({ "as": 1, "das": 1, "ba": 2, "zar": 2, "co": 1 }, analyzer.analyze(["asdasba", "bazar", "cozar"]).syllables);
    });
    it('count prefixes', function() {  
        assert.deepEqual( { "gaz": 2, "ga": 3 }, analyzer.analyze(["gazebo", "gaz", "garda", "kinza"]).prefixes);
    });
    it('count postfixes', function() {  
        assert.deepEqual( { "atov": 2, "ov": 2, "ova": 3, "tov": 2, "va": 3 }, analyzer.analyze(["gratov", "simonova", "kuibeshev", "sova", "kritova", "satov"]).postfixes);
    });
});

describe('WordAnalyzer.getSyllables', function () {
    "use strict"

    var analyzer = new WordAnalyzer();

    var getSyllables = function (word) {
        var result = [];
        for (let syllable of WordAnalyzer.getSyllables(word, analyzer.vowels)) 
            result.push(syllable);

        return result;        
    }

    it('empty', function() {  
        assert.deepEqual(getSyllables(""), []);
    });

    it('simple', function() {  
        assert.deepEqual(getSyllables("badu"), ["ba", "du"]);
        assert.deepEqual(getSyllables("duba"), ["du", "ba"]);
    });
    it('only vowels', function() {  
        assert.deepEqual(getSyllables("a"), ["a"]);
        assert.deepEqual(getSyllables("ae"), ["a", "e"]);
        assert.deepEqual(getSyllables("uae"), ["u", "a", "e"]);
    });
    it('only consonants', function() {  
        assert.deepEqual(getSyllables("p"), ["p"]);
        assert.deepEqual(getSyllables("dr"), ["dr"]);
        assert.deepEqual(getSyllables("str"), ["str"]);
    });
    it('real examples', function() {  
        assert.deepEqual(getSyllables("arguments"), ["ar", "gu", "ments"]);
        assert.deepEqual(getSyllables("substring"), ["sub", "string"]);
        assert.deepEqual(getSyllables("treated"), ["tre", "a", "ted"]);
        assert.deepEqual(getSyllables("original"), ["o", "ri", "gi", "nal"]);
        assert.deepEqual(getSyllables("extraction"), ["ex", "trac", "ti", "on"]);
        assert.deepEqual(getSyllables("dependencies"), ["de", "pen", "den", "ci", "es"]);
        assert.deepEqual(getSyllables("przepraszam"), ["przep", "ras", "zam"]);
    });
});
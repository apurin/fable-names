var assert = require('chai').assert;
var WordAnalyzer = require('../word-analyzer.js');



describe('WordAnalyzer.getSyllables', function () {
    "use strict"
    var getSyllables = function (word) {
        var result = [];
        for (let syllable of WordAnalyzer.getSyllables(word)) 
            result.push(syllable);

        return result;        
    }

    it('simple', function() {  
        assert.deepEqual(getSyllables("badu"), ["ba", "da"]);
        assert.deepEqual(getSyllables("duba"), ["du", "ba"]);
    });
});
"use strict"
function WordAnalyzer (words) {
    var self = this instanceof WordAnalyzer 
        ? this
        : {};

    self.vowels = 'eyuioa'.split('');

    var fixInput = function (input) {
        input = input ? input : [];
        input = typeof input === 'string' ? [input] : input;        
        return input;
    }


    self.analyze = function (words) {
        words = fixInput(words);        

        var result = {
            letters: {},
            syllables: {},
            prefixes: {},
            postfixes: {}
        }

        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            for (let syllable of getSyllables(word)) {
                if (syllable in syllables === false) 
                    syllables[syllable] = 0;
                syllables[syllable]++;
            }
        }
    }



    if (words !== undefined) return self.analyze(words);
}

function hasMoreVowels (word, after, vowels) {
    for (var i = after + 1; i < word.length; i++) 
        if (vowels.indexOf(word[i]) !== -1) return true;
    
    return false;
}

WordAnalyzer.getSyllables = function* (word, vowels) {
    word = word.toLowerCase();
    var vowels = 0;
    var start = 0;
    for (var i = 0; i < word.length; i++) {
        var isVowel = word.indexOf(word[i]) !== -1;
        if (isVowel) { 
            vowels++;

            if (!hasMoreVowels(word, i, vowels)) {
                i = word.length;
                yield word.subscring(start);
            }
            if (vowels > 2) {
                
            }
        }

        // 
        if (!isVowel) {
            
        }

                    
    }
}  

module.exports = WordAnalyzer;
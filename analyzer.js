 "use strict"
 
 function Analyzer(vowels) {
    this.vowels = vowels ? vowels : "eyuioa".split("");
    this.vowels = typeof this.vowels === 'string' ? this.vowels.split("") : this.vowels;

    var fixWords = function (input) {
        input = input ? input : [];
        input = typeof input === 'string' ? [input] : input;
        var result = new Array(input.length);
        for (var i = 0; i < input.length; i++)
            result[i] = input[i].toLowerCase();
        
        return result;
    }

    this.analyze = function (words) {
        words = fixWords(words);        

        var result = {
            syllables: {},
            prefixes: {},
            postfixes: {},
            minSize: words.length > 0 ? words[0].length : 0,
            maxSize: 0,
            vowels: this.vowels
        }  

        // words' sizes
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (word.length > result.maxSize) result.maxSize = word.length;
            if (word.length < result.minSize) result.minSize = word.length;
        }

        // find syllables
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            for (let syllable of Analyzer.getSyllables(word, this.vowels)) {
                if (syllable in result.syllables === false) 
                    result.syllables[syllable] = 0;
                result.syllables[syllable]++;
            }
        }

        // find prefixes
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            
            for (var j = word.length - 1; j > 1; j--) { 
                var prefix = word.substring(0, j);
                if (prefix in result.prefixes) break;

                var prefixCount = 1;

                for (var x = 0; x < words.length; x++) {
                    if (x === i) continue;                    
                    var wordToCompare = words[x];

                    if (wordToCompare.startsWith(prefix)) prefixCount++;                    
                }

                if (prefixCount > 1) {
                    result.prefixes[prefix] = prefixCount;
                    break;
                }                
            }
        }

        // find postfixes
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            
            for (var j = 1; j < word.length - 1; j++) { 
                var postfix = word.substring(j);
                if (postfix in result.postfixes) continue;

                var postfixCount = 1;

                for (var x = 0; x < words.length; x++) {
                    if (x === i) continue;                    
                    var wordToCompare = words[x];

                    if (wordToCompare.endsWith(postfix)) postfixCount++;                    
                }

                if (postfixCount > 1) 
                    result.postfixes[postfix] = postfixCount;                
            }
        }
        result.syllables = Analyzer.makeWeighted(result.syllables);
        result.postfixes = Analyzer.makeWeighted(result.postfixes);
        result.prefixes = Analyzer.makeWeighted(result.prefixes);        

        return result;
    }
}

Analyzer.makeWeighted = function (dict) {
    var total = 0;

    for (var key in dict) 
        total += dict[key]; 

    var result = {};
    for (var key in dict) {
        var probability = total !== 0 ? dict[key] / total : 0;
        result[key] = probability;
    }

    return result;
}

Analyzer.getSyllables = function* (word, vowels) {
    function hasMoreVowels(after) {
        for (var i = after + 1; i < word.length; i++) 
            if (vowels.indexOf(word[i]) !== -1) return true;
        
        return false;
    }
    function followedByTwoConsonant(after) {
        if (after + 2 >= word.length) return false;

        return vowels.indexOf(word[after + 1]) === -1 && vowels.indexOf(word[after + 2]) === -1;
    }

    word = word.toLowerCase();

    var start = 0;

    for (var i = 0; i < word.length; i++) {
        var isVowel = vowels.indexOf(word[i]) !== -1;
        if (isVowel) { 
            // no more vowels in the word
            if (!hasMoreVowels(i)) {
                i = word.length;
                yield word.substring(start);
                break;
            }

            // closed syllable
            if (followedByTwoConsonant(i)) {
                yield word.substring(start, i + 2);
                start = i + 2;
                i++;
            } 
            // open syllable
            else {
                yield word.substring(start, i + 1);
                start = i + 1;
            }            
        }

        // End of word
        if (i === word.length - 1) {
            yield word.substring(start);
        }                    
    }
}

module.exports = Analyzer;
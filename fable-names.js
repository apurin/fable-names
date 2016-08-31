"use strict"

var Analyzer = require('./analyzer.js');

var RandomSeed = require('random-seed');

function FableNames (options) {
    this.options = this.fixOptions(options);
}

FableNames.Analyzer = Analyzer;

FableNames.prototype.fixOptions = function (options) {
    var result = {};
    
    options = options ? options : {};

    result.minSize = options.minSize ? options.minSize : 2;
    result.maxSize = options.maxSize ? options.maxSize : result.minSize * 6;
    result.prefixProbability = options.prefixProbability ? options.prefixProbability : 0.5;
    result.postfixProbability = options.postfixProbability ? options.postfixProbability : 0.8;
    result.repeatingSyllables = options.repeatingSyllables ? options.repeatingSyllables : 0;
    result.repeatingLetters = options.repeatingLetters ? options.repeatingLetters : 0.2;
    result.twoVowels = options.twoVowels ? options.twoVowels : 0.3;
    result.twoConsonants = options.twoConsonants ? options.twoConsonants : 0.3;    
    result.capitalize = options.capitalize ? options.capitalize : true;

    result.vowels = options.vowels ? options.vowels.slice(0) : "eyuioa".split(""); 

    result.prefixes = options.prefixes ? options.prefixes : undefined;
    result.syllables = options.syllables ? options.syllables : undefined;    
    result.postfixes = options.postfixes ? options.postfixes : undefined; 

    result.verifyRules = options.verifyRules;
    result.forbiddenPattern = options.forbiddenPattern;
    
    return result;
}


function getRandomWeighted(weightedDict) {
    var random = Math.random();

    for (var key in weightedDict) {
        random -= weightedDict[key];
        if (random <= 0) return key;
    }

    return getRandomWeighted(weightedDict);        
}

FableNames.prototype.get = function () {
    var result = "";
    
    // Add prefix
    if (Object.keys(this.options.prefixes).length > 0 && Math.random() < this.options.prefixProbability) 
        result = getRandomWeighted(this.options.prefixes);    

    // Add postfix
    var postfix = "";
    
    if (Object.keys(this.options.prefixes).length > 0 && Math.random() < this.options.postfixProbability) 
        postfix = getRandomWeighted(this.options.postfixes);        
    
    var targetLength = Math.floor(Math.random() * (this.options.maxSize - this.options.minSize + 1)) + this.options.minSize;
    var prevSyllable = result;
    var iterations = 0;

    do {
        iterations++;
        if (iterations > 200) throw "It is hard to find matching syllables, either provide more syllables or increase options.maxLength, and options.twoVowels, options.twoConsonants probabilities";

        var newSyllable = getRandomWeighted(this.options.syllables);

        // new syllable is same as previos syllable
        if (newSyllable === prevSyllable && Math.random() < this.options.repeatingSyllables) 
            continue;
        
        result += newSyllable;
        prevSyllable = newSyllable;
    } while (result.length + postfix.length < targetLength);

    result += postfix;    

    var prevLetter = result[0];
    var isVowel = (letter) => this.options.vowels.indexOf(letter) !== -1;
    
    for (var i = 1; i < result.length; i++) {
        var letter = result[i];

        // repeating letters
        if (prevLetter === letter) {
            if (Math.random() > this.options.repeatingLetters)
                return this.get();
            else 
                continue;
        }

        var prevIsVowel = isVowel(prevLetter);
        var thisIsVowel = isVowel(letter);

        // two vowels
        if (prevIsVowel && thisIsVowel && Math.random() > this.options.twoVowels) 
            return this.get();

        // two consonants
        if (!prevIsVowel && !thisIsVowel && Math.random() > this.options.twoConsonants) 
            return this.get();        

        prevLetter = letter;
    }

    // wrong size
    if (result.length < this.options.minSize || result.length > this.options.maxSize) 
        return this.get();

    // verification predicate
    if (this.options.verifyRules && !this.options.verifyRules(result, this.options))
        return this.get();

    // forbidden pattern
    if (this.options.forbiddenPattern && result.match(this.options.forbiddenPattern))
        return this.get();

    // capitalize
    if (this.options.capitalize) {
        result = result.split("");
        result[0] = result[0].toUpperCase();
        result = result.join("");
    }

    return result;
}

module.exports = FableNames;
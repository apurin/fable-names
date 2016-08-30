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
    result.prefixProbability = options.prefixProbability ? options.prefixProbability : 0.8;
    result.postfixProbability = options.postfixProbability ? options.postfixProbability : 0.8;
    result.repeatingSyllables = options.repeatingSyllables ? options.repeatingSyllables : 0.3;
    result.capitalize = options.capitalize ? options.capitalize : true;

    result.vowels = options.vowels ? options.vowels.slice(0) : "eyuioa".split(""); 

    result.prefixes = options.prefixes ? options.prefixes : undefined;
    result.syllables = options.syllables ? options.syllables : undefined;    
    result.postfixes = options.postfixes ? options.postfixes : undefined;    
    
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

    do {
        var newSyllable = getRandomWeighted(this.options.syllables);

        // new syllable is same as previos syllable
        if (newSyllable === prevSyllable) 
            continue;  

        // new syllable starts as previos ends
        if (prevSyllable.length > 0 && prevSyllable[prevSyllable.length - 1] === newSyllable[0]) 
            continue; 

        // postfix starts as syllable ends
        if (postfix.length > 0 &&
            result.length + newSyllable.length + postfix.length >= targetLength && 
            newSyllable[newSyllable.length - 1] === postfix[0])
            continue;
        
        result += newSyllable;


    } while (result.length + postfix.length < targetLength);

    result += postfix;

    if (this.options.capitalize) {
        result = result.split("");
        result[0] = result[0].toUpperCase();
        result = result.join("");
    }   

    return result.length >= this.options.minSize && result.length <= this.options.maxSize
        ? result
        : this.get();
}

module.exports = FableNames;
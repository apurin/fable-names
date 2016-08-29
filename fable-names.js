var RandomSeed = require('random-seed');

function FableNames (options) {
    var self = this;

    self.options = options ? options : self.getRandomOptions();
    self.prefixProbability = 0.5;
    self.postfixProbability = 0.5;
    self.capitalize = true;
}

FableNames.prototype.getRandomOptions = function (seed) {
    var generator = new RandomSeed(seed);
    throw "not implemented";
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
    if (Object.keys(this.options.prefixes).length > 0 && Math.random() < this.prefixProbability) 
        result = getRandomWeighted(this.options.prefixes);        
    

    // Add postfix
    var postfix = "";
    
    if (Object.keys(this.options.prefixes).length > 0 && Math.random() < this.postfixProbability) 
        postfix = getRandomWeighted(this.options.postfixes);        
    
    var targetLength = Math.floor(Math.random() * (this.options.maxSize - this.options.minSize + 1)) + this.options.minSize;

    do 
        result += getRandomWeighted(this.options.syllables)
    while (result.length + postfix.length < targetLength);

    result += postfix;

    if (this.capitalize) {
        result = result.split("");
        result[0] = result[0].toUpperCase();
        result = result.join("");
    }   

    return result.length >= this.options.minSize && result.length <= this.options.maxSize
        ? result
        : get();
}

module.exports = FableNames;
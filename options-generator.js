var Helpers = require('./helpers.js');

function makeDictionaryWeighted(dict) {
    var keys = Object.keys(dict);

    var values = [];    
    for (var index = 0; index < keys.length - 1; index++) 
        values.push(Math.random());    
    values.sort();

    var prev = 0;  
    var total = 0;
    for (var index = 0; index < values.length; index++) {
        var value = values[index];
        var part = value - prev;
        dict[keys[index]] = part;
        total += part;
        prev = value;
    }
    dict[keys[keys.length - 1]] = 1 - total;

    return dict;
}

function generateSyllables(options, consonants) {
    var result = {};

    var getV = () => Helpers.getRandomItem(options.vowels);
    var getC = () => Helpers.getRandomItem(consonants);

    var addSyllable = function(count, funcs) {
        for (var index = 0; index < count; index++) {
            var newSyllable = undefined;
            var attempts = 0;

            do {
                if (attempts++ > 50) 
                    return; // out of options

                newSyllable = "";
                for (var i = 0; i < funcs.length; i++) 
                    newSyllable += funcs[i]();   

                if (Helpers.checkWord(newSyllable, options.vowels, options.repeatingLetters, 1, 1)) 
                    continue;           
            } 
            while (result[newSyllable] === NaN);

            result[newSyllable] = NaN; 
        }               
    }

    addSyllable(Helpers.intBetween(Math.min(options.vowels.length, 3), options.vowels.length), [getV]);
    addSyllable(Helpers.intBetween(0, 3), [getV, getV]);
    addSyllable(Helpers.intBetween(10, 25), [getC, getV]);
    addSyllable(Helpers.intBetween(10, 25), [getV, getC]);
    addSyllable(Helpers.intBetween(0, 10), [getC, getV, getC]);
    addSyllable(Helpers.intBetween(0, 10), [getC, getC, getV]);
    addSyllable(Helpers.intBetween(0, 5), [getC, getC, getV, getC]);
    addSyllable(Helpers.intBetween(0, 5), [getC, getV, getC, getC]);

    return result;
}

function generateSuffixes(maxSyllables, options, consonants) {
    var syllables = Object.keys(options.syllables);
    var suffixes = {};
    var numberOfSuffixes = Helpers.intBetween(5, 15);

    for (var i = 0; i < numberOfSuffixes; i++) {
        var suffix = "";
        var numberOfSyllables = Helpers.intBetween(1, maxSyllables);
        for (var syllableIndex = 0; syllableIndex < numberOfSyllables; syllableIndex++) 
            suffix += Helpers.getRandomItem(syllables);        

        // this suffix is already added
        if (suffixes[suffix] !== undefined) {
            i--;
            continue;
        }

        // check for doubles, two vowels and two consonants
        if (!Helpers.checkWord(suffix, options.vowels, options.repeatingLetters, options.twoVowels, options.twoConsonants)){
            i--;
            continue;
        }

        suffixes[suffix] = NaN;

        // Add similar suffix
        if (suffix.length > 2 && Math.random() < 0.5) {
            var letters = suffix.split("");

            var indexToChange = Helpers.intBetween(0, letters.length - 1);
            letters[indexToChange] = options.vowels.indexOf(letters[indexToChange]) !== -1 
                ? Helpers.getRandomItem(options.vowels)
                : Helpers.getRandomItem(consonants);

            var similarSuffix = letters.join("");
            if (suffixes[similarSuffix] === undefined && Helpers.checkWord(similarSuffix, options.vowels, options.repeatingLetters, options.twoVowels, options.twoConsonants)) {
                i++;
                suffixes[similarSuffix] = NaN;
            }
        }
    }

    return suffixes;
}

function OptionsGenerator (vowels, consonants) {   
    this.vowels = vowels ? vowels : "aeiouy";
    this.vowels = typeof this.vowels === 'string' ? this.vowels.split("") : this.vowels;

    this.consonants = consonants ? consonants : "bcdfghjklmnpqrstvxzw";
    this.consonants = typeof this.consonants === 'string' ? this.consonants.split("") : this.consonants;

    this.get = function () {
        var result = {};      

        result.minSize = Helpers.intBetween(2, 4);
        result.maxSize = result.minSize + Helpers.intBetween(result.minSize + 3, result.minSize * 2 + 5);
        result.prefixProbability = Helpers.floatBetween(0.3, 1);
        result.postfixProbability = Helpers.floatBetween(0.5, 1);
        result.repeatingSyllables = Math.random();
        result.repeatingLetters = Math.random();
        result.twoVowels = Math.random();
        result.twoConsonants = Math.random();
        result.capitalize = true;

        result.vowels = Helpers.getRandomUniqueItems(this.vowels, Helpers.intBetween(this.vowels.length / 2, this.vowels.length)); 
        var consonants = Helpers.getRandomUniqueItems(this.consonants, Helpers.intBetween(this.consonants.length / 2, this.consonants.length)); 

        result.syllables = makeDictionaryWeighted(generateSyllables(result, consonants));
        result.prefixes = makeDictionaryWeighted(generateSuffixes(2, result, consonants));
        result.postfixes = makeDictionaryWeighted(generateSuffixes(4, result, consonants));

        result.verifyRules = undefined;
        result.forbiddenPattern = undefined;

        return result;
    }
}

module.exports = OptionsGenerator;
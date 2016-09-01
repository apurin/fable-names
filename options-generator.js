var RandomSeed = require('random-seed');
var Helpers = require('./helpers.js');
var FableNames = require('./fable-names.js');


function makeDictionaryWeighted(dict, generator) {
    var keys = Object.keys(dict);

    var values = [];    
    for (var index = 0; index < keys.length - 1; index++) 
        values.push(generator.random());    
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

function generateSyllables(options, consonants, generator) {
    var result = {};

    var getV = () => Helpers.getRandomItem(options.vowels, generator);
    var getC = () => Helpers.getRandomItem(consonants, generator);

    var addSyllable = function(count, funcs) {
        for (var index = 0; index < count; index++) {
            var newSyllable = undefined;
            var attempts = 0;

            do {
                if (attempts++ > 50) return; // out of options

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

    addSyllable(generator.intBetween(0, options.vowels.length), [getV]);
    addSyllable(generator.intBetween(0, 3), [getV, getV]);
    addSyllable(generator.intBetween(0, 25), [getC, getV]);
    addSyllable(generator.intBetween(0, 25), [getV, getC]);
    addSyllable(generator.intBetween(0, 10), [getC, getV, getC]);
    addSyllable(generator.intBetween(0, 10), [getC, getC, getV]);
    addSyllable(generator.intBetween(0, 5), [getC, getC, getV, getC]);
    addSyllable(generator.intBetween(0, 5), [getC, getV, getC, getC]);

    return makeDictionaryWeighted(result, generator);    
}

function generateSuffixes(generator, maxSyllables, options, consonants) {
    var syllables = Object.keys(options.syllables);
    var suffixes = {};
    var numberOfSuffixes = generator.intBetween(2, 5);

    for (var i = 0; i < numberOfSuffixes; i++) {
        var suffix = "";
        var numberOfSyllables = generator.intBetween(1, maxSyllables);
        for (var syllableIndex = 0; syllableIndex < numberOfSyllables; syllableIndex++) 
            suffix += Helpers.getRandomItem(syllables, generator);        

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
        if (suffix.length > 2 && generator.random() < 0.5) {
            var letters = suffix.split("");

            var indexToChange = generator.intBetween(0, letters.length - 1);
            letters[indexToChange] = options.vowels.indexOf(letters[indexToChange]) !== -1 
                ? Helpers.getRandomItem(options.vowels, generator)
                : Helpers.getRandomItem(consonants, generator);

            var similarSuffix = letters.join("");
            if (suffixes[similarSuffix] === undefined && Helpers.checkWord(similarSuffix, options.vowels, options.repeatingLetters, options.twoVowels, options.twoConsonants)) {
                i++;
                suffixes[similarSuffix] = NaN;
            }
        }
    }

    return makeDictionaryWeighted(suffixes, generator);
}

function OptionsGenerator (vowels, consonants) {   
    this.vowels = vowels ? vowels : "aeiouy";
    this.vowels = typeof this.vowels === 'string' ? this.vowels.split("") : this.vowels;

    this.consonants = consonants ? consonants : "bcdfghjklmnpqrstvxzw";
    this.consonants = typeof this.consonants === 'string' ? this.consonants.split("") : this.consonants;

    this.get = function (seed) {
        var generator = new RandomSeed(seed);

        var result = {};      

        result.minSize = generator.intBetween(2, 4);
        result.maxSize = result.minSize + generator.intBetween(result.minSize + 1, result.minSize * 2 + 2);
        result.prefixProbability = generator.floatBetween(0.2, 1);
        result.postfixProbability = generator.floatBetween(0.2, 1);
        result.repeatingSyllables = generator.floatBetween(0.2, 1);
        result.repeatingLetters = generator.floatBetween(0.3, 1);
        result.twoVowels = generator.floatBetween(0.3, 1);
        result.twoConsonants = generator.floatBetween(0.3, 1);
        result.capitalize = true;

        result.vowels = Helpers.getRandomUniqueItems(this.vowels, generator.intBetween(this.vowels.length / 2, this.vowels.length), generator); 
        var consonants = Helpers.getRandomUniqueItems(this.consonants, generator.intBetween(this.consonants.length / 2, this.consonants.length), generator); 

        result.syllables = generateSyllables(result, consonants, generator);  
        result.prefixes = generateSuffixes(generator, 2, result, consonants);          
        result.postfixes = generateSuffixes(generator, 4, result, consonants);

        result.verifyRules = undefined;
        result.forbiddenPattern = undefined;

        // check if it can generate names
        try {
            var generator = new FableNames(result);
            generator.get();
        } catch {
            return this.get();
        }

        return result;
    }
}

module.exports = OptionsGenerator;
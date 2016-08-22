var RandomSeed = require('random-seed');

function NameGenerator (options, seed) {
    var self = this;

    options = NameGenerator.normalizeOptions(options);

    var generator = new RandomSeed(seed);    

    self.get = function () {
        var length = generator.intBetween(options.minSize, options.maxSize);

        var result = [];
        var vowels = 0;
        var consonants = 0;
        var prevLetter = undefined;

        function addVowel() {
            vowels++;
            consonants = 0;

            if (options.vowels.length > 1) {
                var newLetter = options.vowels[generator(options.vowels.length)];
                while (newLetter === prevLetter)
                    newLetter = options.vowels[generator(options.vowels.length)];  
                prevLetter = newLetter;              
            } else {
                prevLetter = options.vowels[generator(options.vowels.length)];
            }

            result.push(prevLetter);
        }
        function addConsonant() {
            consonants++;
            vowels = 0;
            
            if (options.consonants.length > 1) {
                var newLetter = options.consonants[generator(options.consonants.length)];
                while (newLetter === prevLetter)
                    newLetter = options.consonants[generator(options.consonants.length)];  
                prevLetter = newLetter;              
            } else {
                prevLetter = options.consonants[generator(options.consonants.length)];
            }

            result.push(prevLetter);
        }
        function addLetter() {
            // doubled letter
            if (false && generator.random() < options.doublesChance / (vowels + consonants)) {
                result.push(prevLetter);
                if (vowels > 0) vowels++;
                else consonants++;
            }
            // ends with vowel
            else if (vowels > 0) {
                if (generator.random() < options.severalVowelsChance) addVowel();
                else addConsonant();
                return;
            }
            // ends with consonant
            else {
                if (generator.random() < options.severalConsonantsChance) addConsonant();
                else addVowel();
            }
        }

        for (var i = 0; i < length; i++) {
            // first letter
            if (i === 0) {
                if (options.firstLetterPreference.length > 0) {
                    prevLetter = options.firstLetterPreference[generator(options.firstLetterPreference.length)];
                    result.push(prevLetter);
                    if (options.vowels.indexOf(prevLetter) !== -1) vowels++;
                    else consonants++;
                }
                else {
                    if (generator.random() < options.startWithVowelChance)
                        addVowel();
                    else
                        addConsonant();     
                }
            } 
            // last letter
            else if (i === length - 1) {
                if (options.lastLetterPreference.length > 0) 
                    result.push(options.lastLetterPreference[generator(options.lastLetterPreference.length)]);
                else 
                    addLetter();  
            }
            // just letter
            else {
                addLetter();  
            }
            
        }

        result[0] = result[0].toUpperCase();

        return result.join('');
    }
}

function stringToArray (input) {
    return typeof input === 'string' ? input.toLowerCase().split('') : input;    
}

function getRandomUniqueItem(availableItems, alreadyChosenItems, generator) {
    var item = undefined;
    do {
        item = availableItems[generator(availableItems.length)];
    } while (alreadyChosenItems.indexOf(item) !== -1);
    return item;
}

function getRandomUniqueItems(availableItems, count, generator) {
    var result = [];
    for (var i = 0; i < count; i++) 
        result.push(getRandomUniqueItem(availableItems, result, generator));
    
    return result;
}

NameGenerator.normalizeOptions = function (givenOptions) {
    options = givenOptions ? JSON.parse(JSON.stringify(givenOptions)) : {};

    // Assign defaults where needed
    options.firstLetterPreference =     options.firstLetterPreference ? stringToArray(options.firstLetterPreference) : [];
    options.lastLetterPreference =      options.lastLetterPreference ? stringToArray(options.lastLetterPreference) : [];
    options.minSize =                   options.minSize ? options.minSize : 2;
    options.maxSize =                   options.maxSize ? options.maxSize : 10;    
    options.doublesChance =             options.doublesChance ? options.doublesChance : 0.05;
    options.severalConsonantsChance =   options.severalConsonantsChance ? options.severalConsonantsChance : 0.1;
    options.severalVowelsChance =       options.severalVowelsChance ? options.severalVowelsChance : 0.5;
    options.excludeLetters =            options.excludeLetters ? options.excludeLetters : [];
    options.vowels =                    options.vowels ? options.vowels : 'aeiouy';
    options.consonants =                options.consonants ? options.consonants : 'bcdfghjklmnpqrstvxz';
    options.startWithVowelChance =      options.startWithVowelChance ? options.startWithVowelChance : 0.5;

    options.excludeLetters =            stringToArray(options.excludeLetters);
    options.vowels =                    stringToArray(options.vowels);
    options.consonants =                stringToArray(options.consonants);

    options.vowels = options.vowels.filter(l => options.excludeLetters.indexOf(l) === -1);
    options.consonants = options.consonants.filter(l => options.excludeLetters.indexOf(l) === -1);
    options.allLetters = options.vowels.concat(options.vowels);

    if (options.vowels.length === 0) throw "Number of available vowels is 0";
    if (options.consonants.length === 0) throw "Number of available consonants is 0";

    return options;
}

NameGenerator.getRandomOptions = function (seed, options) {    
    var generator = RandomSeed.create(seed); // seeded random
    options = NameGenerator.normalizeOptions(options); 

    var chanceToKeepDefaults = 50;

    var allLetters = options.vowels.concat(options.consonants);    
    
    if (generator(100) > chanceToKeepDefaults) 
        options.excludeLetters = getRandomUniqueItems(options.vowels, generator(options.vowels.length - options.vowels.length / 3), generator); // exclude vowels

    if (generator(100) > chanceToKeepDefaults) 
        options.excludeLetters = options.excludeLetters.concat(getRandomUniqueItems(options.consonants, generator(options.consonants.length - options.consonants.length / 3), generator)); // exclude consonants    
    
    allLetters = allLetters.filter(l => options.excludeLetters.indexOf(l) === -1);

    if (generator(100) > chanceToKeepDefaults) options.firstLetterPreference = getRandomUniqueItems(allLetters, generator(allLetters.length / 2), generator);
    if (generator(100) > chanceToKeepDefaults) options.lastLetterPreference = getRandomUniqueItems(allLetters, generator(allLetters.length / 2), generator);

    options.startWithVowelChance = generator.random();
    options.doublesChance = generator.random() / 4;
    options.severalConsonantsChance = options.severalConsonantsChance / 2 + generator.random() / 4;
    options.severalVowelsChance = options.severalVowelsChance / 2 + generator.random() / 4;

    options.minSize = 2 + generator(5);
    options.maxSize = Math.round(options.minSize + options.minSize / 3 + generator(10));

    return options;
};

module.exports = NameGenerator;
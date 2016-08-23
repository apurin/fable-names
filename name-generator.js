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
        var totalVowels = 0;
        var prevLetter = undefined;

        function addOneOf(array) {
            // Do not make doubles unintentionally
            if (array.length > 1) {
                var letter = getRandomItem(array, generator);
                while (letter === prevLetter)
                    letter = getRandomItem(array, generator);
                addLetter(letter);            
            } 
            // Only one letter available, nothing to choose from
            else {
                addLetter(array[0]);
            }
        }

        function addRandomLetter() {
            // doubled letter
            if (prevLetter != undefined && generator.random() < options.doublesChance / (vowels + consonants + 1)) {
                addLetter(prevLetter);
            }
            // ends with vowel
            else if (vowels > 0) {
                if (generator.random() < options.severalVowelsChance / vowels) 
                    addOneOf(options.vowels);
                else 
                    addOneOf(options.consonants);
                return;
            }
            // ends with consonant
            else {
                if (generator.random() < options.severalConsonantsChance / consonants)
                    addOneOf(options.consonants);
                else
                    addOneOf(options.vowels);
            }
        }

        function isVowel(letter) { 
            return options.vowels.indexOf(letter) !== -1; 
        }

        function addLetter(letter) {
            if (isVowel(letter)) {
                vowels++;
                totalVowels++;
                consonants = 0;                
            } else {
                vowels = 0;
                consonants++;
            }

            result.push(letter);
            prevLetter = letter;
        }

        for (var i = 0; i < length; i++) {
            // first letter
            if (i === 0) {
                switch (generator.intBetween(0, options.prefixes.length > 0 ? 2 : 1))
                {
                    case 0: addOneOf(options.firstLetterPreference); 
                        break;
                    case 1: addRandomLetter(); 
                        break;
                    case 2: 
                        var prefix = getRandomItem(options.prefixes, generator);

                        for (var j = 0; j < prefix.length; j++) {
                            addLetter(prefix[j]);
                            i++;
                        }
                        break;                        
                }
            } 
            // last letter
            else if (i === length - 1) {
                if (options.lastLetterPreference.length > 0 && generator.random() < 0.7) 
                    addLetter(getRandomItem(options.lastLetterPreference, generator));
                else 
                    addRandomLetter();  
            }
            // just letter
            else {
                // Add postfix and end name
                if (options.postfixes.length > 0 && generator.random() < 0.3) {
                    var postfix = getRandomItem(options.postfixes, generator);

                    if (!isVowel(postfix[0]) && !isVowel(prevLetter)) 
                        addOneOf(options.vowels);

                    for (var j = 0; j < postfix.length; j++) {
                        addLetter(postfix[j]);                        
                    }
                    break;
                }
                // Add random letter
                else {
                    addRandomLetter();  
                }
            }
            
        }

        if (totalVowels === 0 || result.length > options.maxSize) 
            return self.get();

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

function getRandomItem(array, generator) {
    return array[generator.intBetween(0, array.length - 1)];
}

NameGenerator.normalizeOptions = function (givenOptions) {
    options = givenOptions ? JSON.parse(JSON.stringify(givenOptions)) : {};

    // Assign defaults where needed
    options.firstLetterPreference =     options.firstLetterPreference ? stringToArray(options.firstLetterPreference) : [];
    options.lastLetterPreference =      options.lastLetterPreference ? stringToArray(options.lastLetterPreference) : [];
    options.minSize =                   options.minSize ? options.minSize : 2;
    options.maxSize =                   options.maxSize ? options.maxSize : 7;    
    options.doublesChance =             options.doublesChance ? options.doublesChance : 0.05;
    options.severalConsonantsChance =   options.severalConsonantsChance ? options.severalConsonantsChance : 0.1;
    options.severalVowelsChance =       options.severalVowelsChance ? options.severalVowelsChance : 0.5;
    options.excludeLetters =            options.excludeLetters ? options.excludeLetters : [];
    options.vowels =                    options.vowels ? options.vowels : 'aeiouy';
    options.consonants =                options.consonants ? options.consonants : 'bcdfghjklmnpqrstvxz';
    options.startWithVowelChance =      options.startWithVowelChance ? options.startWithVowelChance : 0.5;
    options.prefixes =                  options.prefixes ? options.prefixes : [];
    options.postfixes =                 options.postfixes ? options.postfixes : [];

    options.excludeLetters =            stringToArray(options.excludeLetters);
    options.vowels =                    stringToArray(options.vowels);
    options.consonants =                stringToArray(options.consonants);

    options.firstLetterPreference = options.firstLetterPreference.filter(l => options.excludeLetters.indexOf(l) === -1);
    options.lastLetterPreference = options.lastLetterPreference.filter(l => options.excludeLetters.indexOf(l) === -1);
    options.vowels = options.vowels.filter(l => options.excludeLetters.indexOf(l) === -1);
    options.consonants = options.consonants.filter(l => options.excludeLetters.indexOf(l) === -1);
    options.allLetters = options.vowels.concat(options.vowels);

    if (options.vowels.length === 0) throw "Number of available vowels is 0";
    if (options.consonants.length === 0) throw "Number of available consonants is 0";

    return options;
}

var randomPrefixes = [
    ["Norr", "Stor", "Al", "Du"],
    ["Van", "Ter", "Della", "Naka", "Nin", "Vest", "Pour"], 
    ["Dele", "Ap", "Ny", "Over"],
    ["Oz", "La", "Mac", "Fitz", "Neder", "Da", "Ofver"], 
    ["Soder", "De", "Der", "Bath"],
    ["Mic", "M'", "El", "Nic", "Mc"],
    ["Dos", "Tre", "Bet"], 
    ["Nord", "Ni", "Bar", "Gil", "Ost"],
    ["Di", "Ter", "Ben", "Mhic", "Abu", "Ab"], 
    ["Del", "Le", "Das", "Degli", "Kil"],
    ["Bat", "Bint", "Bin", "Na", "Mala"] 
];
var randomPostfixes = [
    ["a", "ac", "ach", "acz", "aei"],
    ["ago", "aitis", "aite", "aty"],
    ["aj", "ak", "an", "and", "ange"],
    ["ano", "anu", "ar", "ard", "arz", "as", "au"],
    ["auskas", "iauskas", "awan"],
    ["ba", "bach", "back", "backa", "backe", "baum"],
    ["beck", "bee", "by", "berg", "bergen", "bert"],
    ["bois", "bos", "boc", "borough"],
    ["bourg", "brook", "brun", "brunn", "burg", "burn", "burne", "by", "chi", "ci"],
    ["chian", "chek", "chik", "chyk", "chuk", "czek", "czyk", "czuk", "czak", "cek"],
    ["cik", "ckas", "cki", "cka", "ckis", "cky", "cka", "cki", "cox", "cote", "cott"],
    ["cutt", "cotte", "court", "craft", "croft"],
    ["dal", "dale", "dalle", "datter"],
    ["din", "don", "dun", "dorf", "dotter", "dottir", "udóttir", "dze", "dzki"],
    ["eanu", "eau", "eault", "ec", "avec", "ee"],
    ["eff", "eiro", "ek", "ell", "el", "ema", "ems", "enas"],
    ["enko", "chenko", "ens", "ent", "enya"],
    ["er", "ero", "ers", "es", "ese", "escu", "esti", "et", "ets"],
    ["eu", "ev", "eva", "evski", "evska", "ez", "falt", "faldt", "fia", "fi", "fy", "ffy", "felt"],
    ["feldt", "ford", "fors", "fort"],
    ["gil", "gaard", "gard", "garth", "gate", "gren", "haar", "han"],
    ["holm", "haven", "hoeven", "ia", "ian", "yan", "jian", "gian"],
    ["ents", "ants", "unts"],
    ["uni", "iak", "ic", "ich", "icz", "ic", "owic", "ewic", "ovic", "ojc", "ejc", "ojic", "ejic"],
    ["yc", "ic", "begovic", "ici", "icius", "avicius", "evicius", "ics", "ovics", "evics"],
    ["ides", "idis", "idas", "ier", "ik", "ikh", "ykh", "in", "ina"],
    ["yn", "in", "in", "ing", "ino", "ipa", "ipha", "is", "ienė", "ytė", "ishin", "yshyn", "ishina", "yshyna"],
    ["iu", "ius", "iv", "j", "ka", "kan", "ken", "kawa", "gawa"],
    ["ke", "kin", "kins", "ken", "kin", "ko", "ko", "kus", "kvist", "kyzy"],
    ["la", "lay", "ley", "ly", "le", "lein", "li", "lu", "li", "lin", "litz", "lund"],
    ["maa", "magi", "mae", "man", "mann", "mand", "maz", "men", "man", "ment", "mets", "mont", "mond"],
    ["ne", "te", "nen", "nik", "nova", "novas", "novo", "ny", "nezhad", "nejad"],
    ["nyi", "o", "off", "oglu", "ok", "ois", "oy", "ais", "ay", "on"],
    ["onak", "onis", "os", "opoulos", "opulos", "osz", "os", "ot", "ots", "ou", "oui", "ous"],
    ["ov", "ova", "ová", "ovo", "ovski", "ovska", "ow"],
    ["pern", "perin", "pour", "poor"],
    ["putra", "putri", "puu", "quetil", "quin,", "quist", "qvist", "ridge", "redge", "rigg", "rud"],
    ["s", "saar", "saari", "salu", "sen", "zen", "ssen", "ssens", "sens", "shvili", "skas", "ski", "ska"],
    ["skiy", "tskiy", "skyi", "tskyi"],
    ["ivskiy", "ivskyi", "skog", "skoy", "tskoy", "sky", "tsky", "skaya", "tskaya"],
    ["ivsky", "sky", "ská", "skis", "sma", "son", "sson", "uson"],
    ["stad", "stein", "sten", "stern", "strom", "svard"],
    ["tae", "tabar", "thwait", "to", "do", "toft", "ton", "ten", "tone", "tuit", "tzki", "tzky", "turk", "uk"],
    ["ulea", "ulis", "ūnas", "uulu", "us"],
    ["velt", "verde", "vich", "vych", "wicz"],
    ["vic", "vici", "vics", "vitz", "witz", "witch", "witsch", "vicius", "viciute", "vics"],
    ["ville", "wala", "wan", "wati", "well", "white", "waite", "wi", "wood", "worth", "wright"],
    ["y", "ycz", "yk", "ynas", "ysz", "za", "zadeh", "zada", "zadegan"]
];

NameGenerator.getRandomOptions = function (seed, options) {    
    var generator = RandomSeed.create(seed); // seeded random
    options = NameGenerator.normalizeOptions(options); 

    var chanceToKeepDefaults = 0.3;

    var allLetters = options.vowels.concat(options.consonants);    
    
    if (generator.random() > chanceToKeepDefaults) 
        options.excludeLetters = getRandomUniqueItems(options.vowels, generator(options.vowels.length - options.vowels.length / 3), generator); // exclude vowels

    if (generator.random() > chanceToKeepDefaults) 
        options.excludeLetters = options.excludeLetters.concat(getRandomUniqueItems(options.consonants, generator(options.consonants.length - options.consonants.length / 3), generator)); // exclude consonants    
    
    allLetters = allLetters.filter(l => options.excludeLetters.indexOf(l) === -1);

    if (generator.random() > chanceToKeepDefaults) options.firstLetterPreference = getRandomUniqueItems(allLetters, generator(allLetters.length / 2), generator);
    if (generator.random() > chanceToKeepDefaults) options.lastLetterPreference = getRandomUniqueItems(allLetters, generator(allLetters.length / 2), generator);

    if (generator.random() > chanceToKeepDefaults) options.prefixes = getRandomItem(randomPrefixes, generator); 
    if (generator.random() > chanceToKeepDefaults) options.postfixes = getRandomItem(randomPostfixes, generator); 

    options.startWithVowelChance = generator.random();
    options.doublesChance = generator.random() / 4;
    options.severalConsonantsChance = options.severalConsonantsChance / 2 + generator.random() / 4;
    options.severalVowelsChance = options.severalVowelsChance / 2 + generator.random() / 4;

    options.minSize = 2 + generator(5);
    options.maxSize = Math.round(options.minSize + options.minSize / 3 + generator(10));

    return options;
};

module.exports = NameGenerator;
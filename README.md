[![Build Status](https://api.travis-ci.org/anpur/fable-names.svg?branch=master)](https://travis-ci.org/anpur/fable-names)
[![NPM:](https://img.shields.io/npm/v/fable-names.svg)](https://www.npmjs.com/package/fable-names)

# fable-names
FableNames is a module which can generate infinite number of names, totally random or similar to some example group (like Elven names, Irish names, Japanese names, etc.).

To install:

    npm install fable-names --save

## Random
When you're creating new `FableNames` instance without options it automatically generates some random options: 

    var FableNames = require('fable-names');
    var generator = new FableNames();
    var randomName = generator.get();

All of names from one generator will sound similar, here are names generated with one generator:
> Hu, Enej, Hexumeq, Equmeq, Apum, Qaumeq, Hexeq, Enufun, Ebufun, Dahexyh

See full example at [examples/1-random-names-example.js](https://github.com/anpur/fable-names/blob/master/examples/1-random-names-example.js).

## From examples
`FableNames` can also analyze number of names and generate similar. For good results it should contain decent number of names:

    var FableNames = require('fable-names');
    
    // Array of real Japanese names
    var japaneseNames = ["Sato", "Suzuki", "Takahashi", "Tanaka", "Watanabe", ...];
    
    var japaneseNamesOptions = FableNames.analyze(japaneseNames); 

    var japaneseNamesGenerator = new FableNames(japaneseNamesOptions);

    var newName = japaneseNamesGenerator.get();

Examples of generated names:
> Totoki, Hakada, Matowa, Hito, Ishisaday, Behi, Okata, Samigawa, Yamamika

See full example at [examples/2-japanese-names-example.js](https://github.com/anpur/fable-names/blob/master/examples/2-japanese-names-example.js).

## Non-latin languages
`FableNames` can both analyze and generate options for non-latin laguages.

To generate non-latin options you need to provide vowels and consonants:

    // random options with Estonian letters
    var randomOptions = FableNames.generateOptions("aeiouäöüõ", "bcdfghjklmnpqrstvxzw");
    var generator = new FableNames(randomOptions); 

To analyze non-latin names you need to provide only vowels:

    var russianNames = ["Авдей", "Авксентий", "Агафон", "Александр", "Алексей", ...];
    var russianNamesOptions = FableNames.analyze(russianNames, "ауоыиэяюёе");

See full example at [examples/4-russian-names-example.js](https://github.com/anpur/fable-names/blob/master/examples/4-russian-names-example.js).

## Rules and forbidden patterns
To finetune generation of some names you can inject rules verifications and forbidden regexp patterns to avoid generation of fake looking names.

    // Example of forbidden patterns for Russian names (names can't start with some letters, some letters can't be followed by others, etc.)
    russianNamesOptions.forbiddenPattern = /^[ъьйы]|й.*й|[ауоыиэяюёе]ь|й[ауоыиэяюёе]|йь/i;

    // Example verification rule, which is just callback function (it's checking that generated names will be always unique).
    romanNamesOptions.verifyRules = (name, options) => usedNames.indexOf(name) === -1;

See full example at [examples/4-russian-names-example.js](https://github.com/anpur/fable-names/blob/master/examples/4-russian-names-example.js) and [examples/3-roman-names-example.js](https://github.com/anpur/fable-names/blob/master/examples/3-roman-names-example.js).
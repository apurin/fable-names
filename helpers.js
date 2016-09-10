function intBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function floatBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomUniqueItem (availableItems, alreadyChosenItems) {
    var item = undefined;
    do {
        item = availableItems[intBetween(0, availableItems.length - 1)];
    } while (alreadyChosenItems.indexOf(item) !== -1);
    return item;
}

function getRandomUniqueItems (availableItems, count) {
    var result = [];
    for (var i = 0; i < count; i++) 
        result.push(getRandomUniqueItem(availableItems, result));
    
    return result;
}

function getRandomItem (array) {
    return array[intBetween(0, array.length - 1)];
}

function checkWord (word, vowels, repeatingLetters, twoVowels, twoConsonants) {
    var prevLetter = word[0];
    var isVowel = (letter) => vowels.indexOf(letter) !== -1;
    
    for (var i = 1; i < word.length; i++) {
        var letter = word[i];

        // repeating letters
        if (prevLetter === letter) {
            if (Math.random() > repeatingLetters)
                return false;
            else 
                continue;
        }

        var prevIsVowel = isVowel(prevLetter);
        var thisIsVowel = isVowel(letter);

        // two vowels
        if (prevIsVowel && thisIsVowel && Math.random() > twoVowels) 
            return false;

        // two consonants
        if (!prevIsVowel && !thisIsVowel && Math.random() > twoConsonants) 
            return false;        

        prevLetter = letter;
    }

    return true;
}

module.exports = {
    intBetween: intBetween,
    floatBetween: floatBetween,
    getRandomUniqueItem: getRandomUniqueItem,
    getRandomUniqueItems: getRandomUniqueItems,
    getRandomItem: getRandomItem,
    checkWord: checkWord
}
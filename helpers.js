function getRandomUniqueItem (availableItems, alreadyChosenItems, generator) {
    var item = undefined;
    do {
        item = availableItems[generator(availableItems.length)];
    } while (alreadyChosenItems.indexOf(item) !== -1);
    return item;
}

function getRandomUniqueItems (availableItems, count, generator) {
    var result = [];
    for (var i = 0; i < count; i++) 
        result.push(getRandomUniqueItem(availableItems, result, generator));
    
    return result;
}

function getRandomItem (array, generator) {
    return array[generator.intBetween(0, array.length - 1)];
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
    getRandomUniqueItem: getRandomUniqueItem,
    getRandomUniqueItems: getRandomUniqueItems,
    getRandomItem: getRandomItem,
    checkWord: checkWord
}
var RandomSeed = require('random-seed');

function FableNames (options) {
    var self = this;

    self.options = options ? options : self.getRandomOptions();
}

FableNames.prototype.getRandomOptions = function (seed) {
    var generator = new RandomSeed(seed);
    throw "not implemented";
}

FableNames.prototype.get = function () {
    
}

module.exports = FableNames;
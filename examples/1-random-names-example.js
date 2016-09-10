var FableNames = require('../fable-names.js');

describe('Random names example', function () {

    it('Creating a random names with male, female and surname specific', function() {        
        // generating random options by default
        var generator = new FableNames(); 

        // Alternative way of creating random options, so you can alter them:
        // var randomOptions = FableNames.generateOptions();
        // var generator = new FableNames(randomOptions); 

        // Generate 5 male names
        for (var index = 0; index < 10; index++) {

            var name = generator.get();

            console.log("\t" + name);
        }        
    });    
});
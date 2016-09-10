var FableNames = require('../fable-names.js');

describe('Random names example', function () {

    it('Creating a random names with male, female and surname specific', function() {
        // Creating corresponding generators
        var firstnameGenerator = new FableNames(); // generating random options

        var randomOptions = FableNames.generateOptions();
        var surnameGenerator = new FableNames(); 

        // Generate 5 male names
        for (var index = 0; index < 10; index++) {

            var firstname = firstnameGenerator.get();
            var surname = surnameGenerator.get();

            console.log("\t" + firstname + " " + surname);
        }        
    });    
});
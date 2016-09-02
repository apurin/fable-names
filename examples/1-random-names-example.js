var FableNames = require('../fable-names.js');

describe('Random names example', function () {

    it('Creating a random names with male, female and surname specific', function() {
        // Creating corresponding generators
        var firstnameGenerator = new FableNames(); // generating random options
        var surnameGenerator = new FableNames(FableNames.generateOptions(103)); // we provided randomization seed here, one number will always result in exactly same result        

        // Generate 5 male names
        for (var index = 0; index < 10; index++) {

            var firstname = firstnameGenerator.get();
            var surname = surnameGenerator.get();

            console.log("\t" + firstname + " " + surname);
        }        
    });
    
});
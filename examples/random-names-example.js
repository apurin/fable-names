var FableNames = require('../fable-names.js');
var OptionsGenerator = FableNames.OptionsGenerator;

describe('Random names example', function () {

    it('Creating a random names with male, female and surname specific', function() {
        // Creating options analyzer
        var generator = new OptionsGenerator();

        // Creating different specifics for male names, female names and surnames
        // As we provided same seeds everytime (those magic numbers) every time we will get same options per seed, so names will be different but with same specific
        var maleOptions = generator.get(33);
        var femaleOptions = generator.get(32);
        var surnameOptions = generator.get(30);

        // Creating corresponding generators
        var maleGenerator = new FableNames(maleOptions);
        var femaleGenerator = new FableNames(femaleOptions);
        var surnamGenerator = new FableNames(surnameOptions);

        // Generate 5 male names
        for (var index = 0; index < 10; index++) {

            var firstname = maleGenerator.get();
            var surname = surnamGenerator.get();

            console.log("\tMale: " + firstname + " " + surname);
        }

        // Generate 5 female names
        for (var index = 0; index < 10; index++) {

            var firstname = femaleGenerator.get();
            var surname = surnamGenerator.get();

            console.log("\tFemale: " + firstname + " " + surname);
        }

        
    });
    
});
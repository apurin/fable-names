var FableNames = require('../fable-names.js');

var japaneseNames = ["Satō", "Suzuki", "Takahashi", "Tanaka", "Watanabe", "Itō", "Nakamura", "Kobayashi", "Yamamoto", "Katō", "Yoshida", "Yamada", "Sasaki", "Yamaguchi", "Matsumoto", "Inoue", "Kimura", "Shimizu", "Hayashi", "Saitō", "Saitō", "Yamazaki", "Yamasaki", "Nakajima", "Nakashima", "Mori", "Abe", "Ikeda", "Hashimoto", "Ishikawa", "Yamashita", "Ogawa", "Ishii", "Hasegawa", "Gotō", "Okada", "Kondō", "Maeda", "Fujita", "Endō", "Aoki", "Sakamoto", "Murakami", "Ōta", "Kaneko", "Fujii", "Fukuda", "Nishimura", "Miura", "Takeuchi", "Nakagawa", "Okamoto", "Matsuda", "Harada", "Nakano"];


describe('Japanese names example', function () {

    it('Analyzing and printing 10 japanese-ish names', function() {
        // Analyzing array of real japanese names
        // We need to provide list of vowels, as they are not default
        var japaneseNamesOptions = FableNames.analyze(japaneseNames, "eyuioaō");

        // Creating name generator with japanese specific
        var japaneseNamesGenerator = new FableNames(japaneseNamesOptions);

        for (var index = 0; index < 10; index++) {

            // generate name
            var newName = japaneseNamesGenerator.get();

            console.log("\t" + newName);
        }
    });
    
});
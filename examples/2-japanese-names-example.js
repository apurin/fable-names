var FableNames = require('../fable-names.js');

var japaneseNames = ["Sato", "Suzuki", "Takahashi", "Tanaka", "Watanabe", "Ito", "Nakamura", "Kobayashi", "Yamamoto", "Kato", "Yoshida", "Yamada", "Sasaki", "Yamaguchi", "Matsumoto", "Inoue", "Kimura", "Shimizu", "Hayashi", "Saito", "Saito", "Yamazaki", "Yamasaki", "Nakajima", "Nakashima", "Mori", "Abe", "Ikeda", "Hashimoto", "Ishikawa", "Yamashita", "Ogawa", "Ishii", "Hasegawa", "Goto", "Okada", "Kondo", "Maeda", "Fujita", "Endo", "Aoki", "Sakamoto", "Murakami", "ota", "Kaneko", "Fujii", "Fukuda", "Nishimura", "Miura", "Takeuchi", "Nakagawa", "Okamoto", "Matsuda", "Harada", "Nakano"];


describe('Japanese names example', function () {

    it('Analyzing and printing 10 japanese-ish names', function() {
        // Analyzing array of real japanese names
        var japaneseNamesOptions = FableNames.analyze(japaneseNames);

        // Creating name generator with japanese specific
        var japaneseNamesGenerator = new FableNames(japaneseNamesOptions);

        for (var index = 0; index < 10; index++) {

            // generate name
            var newName = japaneseNamesGenerator.get();            

            console.log("\t" + newName);
        }
    });
    
});
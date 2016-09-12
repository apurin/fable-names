var FableNames = require('fable-names');

// ==== Get random name ====

var randomGenerator = new FableNames(); 

console.log("Random name: " + randomGenerator.get());


// ==== Analyze Japanese names ====

// Real Japanese names:
var japaneseNames = ["Sato", "Suzuki", "Takahashi", "Tanaka", "Watanabe", "Ito", "Nakamura", "Kobayashi", "Yamamoto", "Kato", "Yoshida", "Yamada", "Sasaki", "Yamaguchi", "Matsumoto", "Inoue", "Kimura", "Shimizu", "Hayashi", "Saito", "Saito", "Yamazaki", "Yamasaki", "Nakajima", "Nakashima", "Mori", "Abe", "Ikeda", "Hashimoto", "Ishikawa", "Yamashita", "Ogawa", "Ishii", "Hasegawa", "Goto", "Okada", "Kondo", "Maeda", "Fujita", "Endo", "Aoki", "Sakamoto", "Murakami", "ota", "Kaneko", "Fujii", "Fukuda", "Nishimura", "Miura", "Takeuchi", "Nakagawa", "Okamoto", "Matsuda", "Harada", "Nakano"];

var japaneseOptions = FableNames.analyze(japaneseNames);

var japaneseGenerator = new FableNames(japaneseOptions);

for (var i = 0; i < 5; i++) 
    console.log("Random Japanese-like name: " + japaneseGenerator.get());
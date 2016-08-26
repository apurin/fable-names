"use strict"

var assert = require('chai').assert;
var WordAnalyzer = require('../word-analyzer.js');

var romanNames = ["AELIA", "AELIANA", "AELIANUS", "AELIUS", "AEMILIA", "AEMILIANA", "AEMILIANUS", "AEMILIUS", "AETIUS", "AGRIPPA", "AGRIPPINA", "AHENOBARBUS", "ALBA", "ALBANUS", "ALBINA", "ALBINUS", "ALBUS", "ANTONIA", "ANTONINA", "ANTONINUS", "ANTONIUS", "APPIUS", "AQUILA", "AQUILINA", "AQUILINUS", "ATILIUS", "AUGUSTA", "AUGUSTINA", "AUGUSTINUS", "AUGUSTUS", "AULUS", "AURELIA", "AURELIANA", "AURELIANUS", "AURELIUS", "AVILIUS", "AVITUS", "BALBINA", "BALBINUS", "BALBUS", "BLANDINA", "BLANDINUS", "BLANDUS", "BLASIUS", "BRUTUS", "CAECILIA", "CAECILIUS", "CAELIA", "CAELINA", "CAELINUS", "CAELIUS", "CAESAR", "CAIUS", "CAMILLA", "CAMILLUS", "CASSIA", "CASSIAN", "CASSIANUS", "CASSIUS", "CATO", "CELSUS", "CICERO", "CLAUDIA", "CLAUDIUS", "CLOELIA", "CLOELIUS", "CNAEUS", "CORNELIA", "CORNELIUS", "CRISPINUS", "CRISPUS", "CYPRIANUS", "DECIMA", "DECIMUS", "DIOCLETIANUS", "DOMITIA", "DOMITIANUS", "DOMITILLA", "DOMITIUS", "DRUSA", "DRUSILLA", "DRUSUS", "DUILIUS", "EGNATIUS", "ENNIUS", "FABIA", "FABIANA", "FABIANUS", "FABIOLA", "FABIUS", "FABRICIA", "FABRICIUS", "FAUSTA", "FAUSTINA", "FAUSTINUS", "FAUSTUS", "FELIX", "FESTUS", "FLAVIA", "FLAVIANA", "FLAVIANUS", "FLAVIUS", "FLORIANA", "FLORIANUS", "FLORUS", "FULVIA", "FULVIUS", "GAIUS", "GALLUS", "GERMANA", "GERMANUS", "GLAUCIA", "GNAEUS", "GORDIANUS", "GRATIANA", "GRATIANUS", "HADRIANA", "HADRIANUS", "HERMINIA", "HERMINIUS", "HILARIA", "HILARIUS", "HORATIA", "HORATIUS", "HORTENSIA", "HORTENSIUS", "IANUARIUS", "IOVIANUS", "IOVITA", "IULIA", "IULIANA", "IULIANUS", "IULIUS", "IUNIA", "IUNIUS", "IUVENALIS", "JANUARIUS", "JOVIAN", "JULIA", "JULIANA", "JULIUS", "JUNIA", "JUNIUS", "LAELIA", "LAELIUS", "LAURENTIA", "LAURENTINA", "LAURENTINUS", "LAURENTIUS", "LIVIA", "LIVIANA", "LIVIANUS", "LIVIUS", "LONGINA", "LONGINUS", "LUCANUS", "LUCIA", "LUCIANA", "LUCIANUS", "LUCILIA", "LUCILIUS", "LUCILLA", "LUCIUS", "LUCRETIA", "LUCRETIUS", "MANIUS", "MANLIUS", "MARCELLA", "MARCELLINA", "MARCELLINUS", "MARCELLUS", "MARCIA", "MARCIUS", "MARCUS", "MARIANA", "MARIANUS", "MARINA", "MARINUS", "MARIUS", "MARTIALIS", "MARTINA", "MARTINUS", "MAXENTIUS", "MAXIMA", "MAXIMIANUS", "MAXIMILIANA", "MAXIMILIANUS", "MAXIMINUS", "MAXIMUS", "NAEVIUS", "NERO", "NERVA", "NONA", "NONUS", "OCTAVIA", "OCTAVIANUS", "OCTAVIUS", "OTHO", "OVIDIUS", "PAULA", "PAULINA", "PAULINUS", "PAULUS", "PETRONIA", "PETRONIUS", "PLINIUS", "POMPEIUS", "POMPILIUS", "POMPONIA", "POMPONIUS", "PONTIUS", "PORCIA", "PORCIUS", "PRISCA", "PRISCILLA", "PRISCUS", "PUBLIUS", "QUINTILIANUS", "QUINTILLUS", "QUINTINA", "QUINTINUS", "QUINTUS", "REGULUS", "RUFINA", "RUFINUS", "RUFUS", "SABINA", "SABINUS", "SATURNINA", "SATURNINUS", "SCAEVOLA", "SECUNDINUS", "SECUNDUS", "SENECA", "SEPTIMA", "SEPTIMIUS", "SEPTIMUS", "SERGIUS", "SERVIUS", "SEVERIANUS", "SEVERINA", "SEVERINUS", "SEVERUS", "SEXTILIUS", "SEXTUS", "SILVANUS", "SPURIUS", "TACITA", "TACITUS", "TARQUINIUS", "TATIANA", "TATIANUS", "TATIUS", "TERENTIUS", "TERTIUS", "THRACIUS", "TIBERIUS", "TIBURTIUS", "TITIANA", "TITIANUS", "TITUS", "TRAIANUS", "TULLIA", "TULLIUS", "VALENS", "VALENTINA", "VALENTINIANUS", "VALENTINUS", "VALERIA", "VALERIANA", "VALERIANUS", "VALERIUS", "VARINIA", "VARINIUS", "VARIUS", "VERGILIUS", "VERGINIA", "VERGINIUS", "VESPASIANUS", "VIBIANA", "VIBIANUS", "VIBIUS", "VINICIUS", "VIRGINIA", "VITA", "VITUS"];

describe('WordAnalyzer.makeWeighted', function () {
    it('simple', function() {
        assert.deepEqual({'a': 0, 'b': 0.5, 'c': 1}, WordAnalyzer.makeWeighted({'a': 0, 'b': 50, 'c': 100}));
        assert.deepEqual({'a': 0, 'b': 0.5, 'c': 1}, WordAnalyzer.makeWeighted({'a': 0, 'b': 100, 'c': 200}));
    });
    it('empty', function() {
        assert.deepEqual({}, WordAnalyzer.makeWeighted({}));
    });
    it('zero', function() {
        assert.deepEqual({'a': 0}, WordAnalyzer.makeWeighted({'a': 0}));
    });
});


describe('WordAnalyzer.analyze', function () {
    var analyzer = new WordAnalyzer();

    it('count syllables', function() {  
        assert.deepEqual({ "as": 1, "das": 1, "ba": 2, "zar": 2, "co": 1 }, analyzer.analyze(["asdasba", "bazar", "cozar"]).syllables);
    });
    it('count prefixes', function() {  
        assert.deepEqual( { "ga": 3 }, analyzer.analyze(["gazebo", "gaz", "garda", "kinza"]).prefixes);
    });
    it('count postfixes', function() {  
        assert.deepEqual( { "atov": 2, "ov": 2, "ova": 3, "tov": 2, "va": 3 }, analyzer.analyze(["gratov", "simonova", "kuibeshev", "sova", "kritova", "satov"]).postfixes);
    });
    it('roman names', function() {  
        var result = analyzer.analyze(romanNames);
    });
});

describe('WordAnalyzer.getSyllables', function () {
    var analyzer = new WordAnalyzer();

    var getSyllables = function (word) {
        var result = [];
        for (let syllable of WordAnalyzer.getSyllables(word, analyzer.vowels)) 
            result.push(syllable);

        return result;        
    }

    it('empty', function() {  
        assert.deepEqual(getSyllables(""), []);
    });

    it('simple', function() {  
        assert.deepEqual(getSyllables("badu"), ["ba", "du"]);
        assert.deepEqual(getSyllables("duba"), ["du", "ba"]);
    });
    it('only vowels', function() {  
        assert.deepEqual(getSyllables("a"), ["a"]);
        assert.deepEqual(getSyllables("ae"), ["a", "e"]);
        assert.deepEqual(getSyllables("uae"), ["u", "a", "e"]);
    });
    it('only consonants', function() {  
        assert.deepEqual(getSyllables("p"), ["p"]);
        assert.deepEqual(getSyllables("dr"), ["dr"]);
        assert.deepEqual(getSyllables("str"), ["str"]);
    });
    it('real examples', function() {  
        assert.deepEqual(getSyllables("arguments"), ["ar", "gu", "ments"]);
        assert.deepEqual(getSyllables("substring"), ["sub", "string"]);
        assert.deepEqual(getSyllables("treated"), ["tre", "a", "ted"]);
        assert.deepEqual(getSyllables("original"), ["o", "ri", "gi", "nal"]);
        assert.deepEqual(getSyllables("extraction"), ["ex", "trac", "ti", "on"]);
        assert.deepEqual(getSyllables("dependencies"), ["de", "pen", "den", "ci", "es"]);
        assert.deepEqual(getSyllables("przepraszam"), ["przep", "ras", "zam"]);
    });
});




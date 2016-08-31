var FableNames = require('../fable-names.js');
var Analyzer = FableNames.Analyzer;

var romanNames = ["AELIA", "AELIANA", "AELIANUS", "AELIUS", "AEMILIA", "AEMILIANA", "AEMILIANUS", "AEMILIUS", "AETIUS", "AGRIPPA", "AGRIPPINA", "AHENOBARBUS", "ALBA", "ALBANUS", "ALBINA", "ALBINUS", "ALBUS", "ANTONIA", "ANTONINA", "ANTONINUS", "ANTONIUS", "APPIUS", "AQUILA", "AQUILINA", "AQUILINUS", "ATILIUS", "AUGUSTA", "AUGUSTINA", "AUGUSTINUS", "AUGUSTUS", "AULUS", "AURELIA", "AURELIANA", "AURELIANUS", "AURELIUS", "AVILIUS", "AVITUS", "BALBINA", "BALBINUS", "BALBUS", "BLANDINA", "BLANDINUS", "BLANDUS", "BLASIUS", "BRUTUS", "CAECILIA", "CAECILIUS", "CAELIA", "CAELINA", "CAELINUS", "CAELIUS", "CAESAR", "CAIUS", "CAMILLA", "CAMILLUS", "CASSIA", "CASSIAN", "CASSIANUS", "CASSIUS", "CATO", "CELSUS", "CICERO", "CLAUDIA", "CLAUDIUS", "CLOELIA", "CLOELIUS", "CNAEUS", "CORNELIA", "CORNELIUS", "CRISPINUS", "CRISPUS", "CYPRIANUS", "DECIMA", "DECIMUS", "DIOCLETIANUS", "DOMITIA", "DOMITIANUS", "DOMITILLA", "DOMITIUS", "DRUSA", "DRUSILLA", "DRUSUS", "DUILIUS", "EGNATIUS", "ENNIUS", "FABIA", "FABIANA", "FABIANUS", "FABIOLA", "FABIUS", "FABRICIA", "FABRICIUS", "FAUSTA", "FAUSTINA", "FAUSTINUS", "FAUSTUS", "FELIX", "FESTUS", "FLAVIA", "FLAVIANA", "FLAVIANUS", "FLAVIUS", "FLORIANA", "FLORIANUS", "FLORUS", "FULVIA", "FULVIUS", "GAIUS", "GALLUS", "GERMANA", "GERMANUS", "GLAUCIA", "GNAEUS", "GORDIANUS", "GRATIANA", "GRATIANUS", "HADRIANA", "HADRIANUS", "HERMINIA", "HERMINIUS", "HILARIA", "HILARIUS", "HORATIA", "HORATIUS", "HORTENSIA", "HORTENSIUS", "IANUARIUS", "IOVIANUS", "IOVITA", "IULIA", "IULIANA", "IULIANUS", "IULIUS", "IUNIA", "IUNIUS", "IUVENALIS", "JANUARIUS", "JOVIAN", "JULIA", "JULIANA", "JULIUS", "JUNIA", "JUNIUS", "LAELIA", "LAELIUS", "LAURENTIA", "LAURENTINA", "LAURENTINUS", "LAURENTIUS", "LIVIA", "LIVIANA", "LIVIANUS", "LIVIUS", "LONGINA", "LONGINUS", "LUCANUS", "LUCIA", "LUCIANA", "LUCIANUS", "LUCILIA", "LUCILIUS", "LUCILLA", "LUCIUS", "LUCRETIA", "LUCRETIUS", "MANIUS", "MANLIUS", "MARCELLA", "MARCELLINA", "MARCELLINUS", "MARCELLUS", "MARCIA", "MARCIUS", "MARCUS", "MARIANA", "MARIANUS", "MARINA", "MARINUS", "MARIUS", "MARTIALIS", "MARTINA", "MARTINUS", "MAXENTIUS", "MAXIMA", "MAXIMIANUS", "MAXIMILIANA", "MAXIMILIANUS", "MAXIMINUS", "MAXIMUS", "NAEVIUS", "NERO", "NERVA", "NONA", "NONUS", "OCTAVIA", "OCTAVIANUS", "OCTAVIUS", "OTHO", "OVIDIUS", "PAULA", "PAULINA", "PAULINUS", "PAULUS", "PETRONIA", "PETRONIUS", "PLINIUS", "POMPEIUS", "POMPILIUS", "POMPONIA", "POMPONIUS", "PONTIUS", "PORCIA", "PORCIUS", "PRISCA", "PRISCILLA", "PRISCUS", "PUBLIUS", "QUINTILIANUS", "QUINTILLUS", "QUINTINA", "QUINTINUS", "QUINTUS", "REGULUS", "RUFINA", "RUFINUS", "RUFUS", "SABINA", "SABINUS", "SATURNINA", "SATURNINUS", "SCAEVOLA", "SECUNDINUS", "SECUNDUS", "SENECA", "SEPTIMA", "SEPTIMIUS", "SEPTIMUS", "SERGIUS", "SERVIUS", "SEVERIANUS", "SEVERINA", "SEVERINUS", "SEVERUS", "SEXTILIUS", "SEXTUS", "SILVANUS", "SPURIUS", "TACITA", "TACITUS", "TARQUINIUS", "TATIANA", "TATIANUS", "TATIUS", "TERENTIUS", "TERTIUS", "THRACIUS", "TIBERIUS", "TIBURTIUS", "TITIANA", "TITIANUS", "TITUS", "TRAIANUS", "TULLIA", "TULLIUS", "VALENS", "VALENTINA", "VALENTINIANUS", "VALENTINUS", "VALERIA", "VALERIANA", "VALERIANUS", "VALERIUS", "VARINIA", "VARINIUS", "VARIUS", "VERGILIUS", "VERGINIA", "VERGINIUS", "VESPASIANUS", "VIBIANA", "VIBIANUS", "VIBIUS", "VINICIUS", "VIRGINIA", "VITA", "VITUS"];

describe('Roman names example', function () {

    it('Analyzing and printing 10 roman-ish names', function() {
        // Creating analyzer
        var analyzer = new Analyzer();

        // Analyzing array of real roman names
        var romanNamesOptions = analyzer.analyze(romanNames);

        // Creating name generator with roman specific
        var romanNamesGenerator = new FableNames(romanNamesOptions);

        for (var index = 0; index < 10; index++) {

            // generate name
            var newName = romanNamesGenerator.get();

            console.log("\t" + newName);
        }
    });
    
});
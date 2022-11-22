let rootScalesToPush = {
    "major-": [0, 2, 4, 5, 7, 9, 11],
    "minor-": [0, 2, 3, 5, 7, 8, 10],
    "harmonic_minor-": [0, 2, 3, 5, 7, 8, 11],
    "melodic_minor-": [0, 2, 3, 5, 7, 9, 11],
    "harmonic_major-": [0, 2, 4, 5, 7, 8, 11],
    "hungarian_minor-": [0, 2, 3, 6, 7, 8, 11]
}

function fillModes() {

    let scales = {
    }

    for (let i = 0; i < Object.keys(rootScalesToPush).length; i++) {
        let scaleToTweak = Object.values(rootScalesToPush)[i];
        for (let j = 0; j < Object.values(rootScalesToPush)[i].length; j++) {
            let romanNumeral = "";
            switch (j) {
                case 0:
                    romanNumeral = "i";
                    break;
                case 1:
                    romanNumeral = "ii";
                    break;
                case 2:
                    romanNumeral = "iii";
                    break;
                case 3:
                    romanNumeral = "iv";
                    break;
                case 4:
                    romanNumeral = "v";
                    break;
                case 5:
                    romanNumeral = "vi";
                    break;
                case 6:
                    romanNumeral = "vii";
                    break;
            }
            scales[Object.keys(rootScalesToPush)[i] + romanNumeral] = scaleToTweak
            let removalAmount = scaleToTweak[1];
            scaleToTweak = scaleToTweak.map(e => e - removalAmount);
            scaleToTweak[0] = scaleToTweak[0] += 12;
            scaleToTweak.sort((a, b) => a - b);
        }
    }
    console.log(scales);
    return scales;
}
fillModes();

function run() {

    let startingNote = prompt("What is the first note of the scale?", "");

    //fill in scaleSteps with the steps of a scale.  Example: Major scales are whole whole half, whole whole whole half, so the entry is
    //Harmonic Minor: [2, 1, 2, 2, 1, 3, 1];
    //Natural Minor: [2, 1, 2, 2,1,2,2];
    //Melodic Minor: [2, 1, 2, 2,2,2,1]
    //Major: [2, 2, 1, 2, 2, 2, 1];
    //Hungarian Minor: [2, 1,3,1,1,3,1]
    let scaleSteps = [2, 1,3,1,1,3,1]
    let addedNotes = false;
    let guitarString1 = ["e", "f", "f#", "g", "g#", "a", "a#", "b", "c", "c#", "d", "d#"];

    const guitarStrings = {
        1: ["e", "f", "f#", "g", "g#", "a", "a#", "b", "c", "c#", "d", "d#"],
        2: ["b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#"],
        3: ["g", "g#", "a", "a#", "b", "c", "c#", "d", "d#", "e", "f", "f#"],
        4: ["d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b", "c", "c#"],
        5: ["a", "a#", "b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#"],
        6: ["e", "f", "f#", "g", "g#", "a", "a#", "b", "c", "c#", "d", "d#"],
    }

    function determineTheScaleIntervals(scaleSteps) {
        let steps = 0;
        let figuredScale = [];
        for (let i = 0; i < scaleSteps.length; i++) {
            figuredScale.push(steps)
            steps += scaleSteps[i];
        }
        return figuredScale;
    }

    const scaleIntervals = determineTheScaleIntervals(scaleSteps)

    function findNotesOfScale(startingNote, guitarString1, figuredScale) {
        let counter = 0;
        let scale = [];
        for (let i = guitarString1.indexOf(startingNote); counter < guitarString1.length; i++) {
            for (let j = 0; j < figuredScale.length; j++) {

                if (i - guitarString1.indexOf(startingNote) === figuredScale[j] || i + (12 - guitarString1.indexOf(startingNote)) === figuredScale[j]) {
                    scale.push(guitarString1[i])
                }

                if (i >= guitarString1.length) {
                    i = 0;
                }
            }
            counter++;

        }
        return scale;
    }
    const foundNotesOfScale = findNotesOfScale(startingNote, guitarString1, scaleIntervals);


    function createEmptyFretBoard() {
        let guitarFretBoard = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
        }
        return guitarFretBoard
    }
    const emptyFretBoard = createEmptyFretBoard();

    function findTheFrets(foundNotesOfScale, emptyFretBoard) {
        let guitarFretBoard = emptyFretBoard;
        for (let i = 0; i < Object.keys(guitarStrings).length; i++) {
            for (let j = 0; j < Object.values(guitarStrings)[i].length; j++) {
                for (let k = 0; k < foundNotesOfScale.length; k++) {
                    if (foundNotesOfScale[k] === Object.values(guitarStrings)[i][j]) {
                        Object.values(guitarFretBoard)[i].push(Object.values(guitarStrings)[i].indexOf(Object.values(guitarStrings)[i][j]))
                    }
                }
            }
        }

        return guitarFretBoard;
    }


    const foundFrets = findTheFrets(foundNotesOfScale, emptyFretBoard);

    function extendTheFretBoard(foundFrets) {
        for (let i = 0; i < Object.keys(foundFrets).length; i++) {
            const counter = Object.values(foundFrets)[i].length;
            for (let j = 0; j < counter; j++) {
                Object.values(foundFrets)[i].push(Object.values(foundFrets)[i][j] + 12);
            }
        }
        return foundFrets;
    }

    const extendedFretBoard = extendTheFretBoard(foundFrets);

    function adjustFretSpacing() {
        let fretSpacing = prompt("Which frets would you like to play this scale on?  Example: 4-7", "");
        fretSpacing = fretSpacing.replace(/ /g, "");
        fretSpacing = fretSpacing.split("-");
        fretSpacing[0] = Number(fretSpacing[0]);
        fretSpacing[1] = Number(fretSpacing[1]);
        const difference = fretSpacing[1] - fretSpacing[0];

        switch (difference) {
            case 0:
                fretSpacing[1] += 3;
                break;
            case 1:
                fretSpacing[1] += 2;
                break;
            case 2:
                fretSpacing[1] += 1;
                break;
        }

        return fretSpacing;
    }

    const adjustedFretSpacing = adjustFretSpacing();

    function applyFretSpacing(frets, fretSpacing) {

        let fretBoard = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
        };

        for (let i = 0; i < fretSpacing.length; i++) {
            fretSpacing[i] = Number(fretSpacing[i]);
        }

        const fretSpacing1 = fretSpacing[0];
        const fretSpacing2 = fretSpacing[1];

        for (let i = 0; i < Object.keys(frets).length; i++) {
            let counter = fretSpacing2 - fretSpacing1;
            for (let j = 0; j < Object.values(frets)[i].length; j++) {
                if (Object.values(frets)[i][j] >= fretSpacing1 && Object.values(frets)[i][j] <= fretSpacing2 && counter > 0) {
                    Object.values(fretBoard)[i].push(Object.values(frets)[i][j]);
                    counter--;
                }
            }
        }
        return fretBoard;
    }

    const chosenFretSpacing = applyFretSpacing(extendedFretBoard, adjustedFretSpacing);

    function logTheNotes(chosenFretSpacing) {
        let attemptedScale = [];
        for (let i = Object.keys(chosenFretSpacing).length - 1; i >= 0; i--) {
            for (let j = 0; j < Object.values(chosenFretSpacing)[i].length; j++) {
                for (let k = 0; k < Object.values(guitarStrings)[i].length; k++) {
                    if (Object.values(chosenFretSpacing)[i][j] === k) {
                        attemptedScale.push(Object.values(guitarStrings)[i][k])
                    }
                }
            }
        }
        return attemptedScale;
    }
    const loggedNotes = logTheNotes(chosenFretSpacing);

    function displayBrokenScale(notes, frets, scale) {

        let brokenScale = [];
        for (let i = Object.keys(frets).length - 1; i >= 0; i--) {
            for (let j = 0; j < Object.values(frets)[i].length; j++) {
                brokenScale.push(Object.values(guitarStrings)[i].at(Object.values(frets)[i][j]))
            }

        }

        return brokenScale;

    }

    const displayedBrokenScale = displayBrokenScale(loggedNotes, chosenFretSpacing, foundNotesOfScale);
    function fixTheScale(brokenScale, scale, frets, fretSpacing) {
        if (fretSpacing[1] - fretSpacing[0] <= 3) {
            addedNotes = true;
            const startingNote = guitarString1.at(frets[6][0] % 12);
            let position = scale.indexOf(startingNote);
            let double = 0;
            if (fretSpacing[1] >= 12) {
                double = 12;
            }

            for (let i = Object.keys(frets).length - 1; i >= 0; i--) {
                for (let j = 0; j < Object.values(frets)[i].length; j++) {

                    if (Object.values(guitarStrings)[i].at(Object.values(frets)[i][j]) === scale[position]) {// console.log(`Broken Scale: ${Object.values(guitarStrings)[i].at(Object.values(frets)[i][j])}`);
                    }

                    if (Object.values(guitarStrings)[i].at(Object.values(frets)[i][j] - double) !== scale[position]) {

                        for (let k = Object.values(frets)[i][j]; k >= 0; k--) {
                            if (Object.values(guitarStrings)[i][k] === scale[position] && !Object.values(frets)[i].includes(k)) {
                                if (fretSpacing[0] > 12 && fretSpacing[1] > 12) {
                                Object.values(frets)[i].unshift(k + double);
                                } else {
Object.values(frets)[i].unshift(k);
}
                            }
                        }

                    }
                    position++;
                    if (position >= scale.length) {
                        position = position - scale.length;
                    }
                }
            }
            return frets;
        }
    }
    const fixedScale = fixTheScale(displayedBrokenScale, foundNotesOfScale, chosenFretSpacing, adjustedFretSpacing);
    if (addedNotes === false) {
    }

    function tabItOut(chosenFretSpacing, fixedScale) {

        let fretBoard = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
        };

        addedNotes === false ? frets = chosenFretSpacing : frets = chosenFretSpacing;

        for (let i = 0; i < Object.keys(fretBoard).length; i++) {
            Object.values(fretBoard)[i].length = 24;
        }
        for (let i = 0; i < Object.keys(fretBoard).length; i++) {
            for (let j = 0; j < Object.values(fretBoard)[i].length; j++) {
                if (Object.values(frets)[i].includes(j)) {
                    Object.values(fretBoard)[i][j] = j;
                } else {
                    Object.values(fretBoard)[i][j] = '';
                }
            }
        }
        return fretBoard;
    }
    const tabbed = tabItOut(chosenFretSpacing, fixedScale);
    console.log(tabbed);
}
run();
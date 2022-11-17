//Convert scales to modes (basic open 1 string version- will work on updating this later)



let array = [0,2,3,6,7,8,11]

function run() {

    let everyFuckingMode = findModes(array)
    printTheModes(everyFuckingMode)
}

function findModes(array) {
    let newArray = []
    let allModes = []
    // push ionian
    allModes.push(array)

    for (let q = 0; q < array.length - 1; q ++) {
        for (let i = 0; i < array.length; i ++) {
            let removalAmount = array[1]
            newArray.push(array[i] - removalAmount)
        }

        newArray[0] = newArray[0] + 12
        newArray = newArray.sort((a,b)=> a - b)

        //push modes into array to return
        allModes.push(newArray)
        array = newArray
        newArray = []
    }
    return allModes
}

function printTheModes(array) {
    for(let i = 0; i< array.length; i++) {
        console.log(`MODE ${i+1}`)
        console.log(array[i])
    }
}

run()


//Convert scales to modes (basic open 1 string version- will work on updating this later)

let array = [0,2,3,6,7,8,11];
let newArray = [];

console.log(array);
for (let q = 0; q < array.length - 1; q ++) {
for (let i = 0; i < array.length; i ++) {
let removalAmount = array[1];
newArray.push(array[i] - removalAmount);
}

newArray[0] = newArray[0] + 12;
newArray = newArray.sort((a,b)=> a - b)

console.log(newArray);
array = newArray;
newArray = [];
}
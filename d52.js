const fs = require('fs')

let polymer = Buffer.from(fs.readFileSync('unit-data.txt').toString('ascii'))
console.log(polymer)
let newPolymer = polymer.toString('ascii')
let alphaCode = 65
let minPolymer = newPolymer.length

for (let A = alphaCode, a = alphaCode + 32; A < alphaCode + 26; A++, a++) {
  let polymerString = newPolymer
  console.log(`${A}/${a} length = ${polymerString.length}`)
  for (let i = 0; i < polymerString.length;) {
    if (polymerString.charCodeAt(i) === A || polymerString.charCodeAt(i) === a) {
      // mark for removal with null char
      polymerString = polymerString.slice(0, i) + polymerString.slice(i + 1)
    } else {
      i++
    }
  }
  let polymerLength = reactPolymer(polymerString)
  minPolymer = (minPolymer < polymerLength) ? minPolymer : polymerLength
  console.log(`${String.fromCharCode(A)} has length ${polymerLength}`)
  //console.log(polymerString)
}

console.log(minPolymer)

function reactPolymer(newPolymer) {
  let removalCount = newPolymer.length

  while (removalCount > 0) {
    removalCount = 0
    console.log(newPolymer.length)
    for (let i = 0, j = 1; j < newPolymer.length; i++, j++) {
      
      if (Math.abs(newPolymer.charCodeAt(i) - newPolymer.charCodeAt(j)) === 32) {
        // mark for removal with null char
        newPolymer = newPolymer.slice(0, i) + newPolymer.slice(j + 1)
        removalCount++
      }
    }
    console.log(`newcount:${removalCount}`)
  }
  return newPolymer.length
}

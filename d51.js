const fs = require('fs')

let polymer = Buffer.from(fs.readFileSync('unit-data.txt').toString('ascii'))
console.log(polymer)
let newPolymer = polymer.toString('ascii')
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
console.log(newPolymer.length)

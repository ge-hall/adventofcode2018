const fs = require('fs')
const readline = require('readline')
async function processLineByLine () {
  const fileStream = fs.createReadStream('coord-data.txt')
  let rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  // load coords
  const coords = []
  let maxX = 0
  let minX = Number.MAX_SAFE_INTEGER
  let maxY = 0
  let minY = Number.MAX_SAFE_INTEGER
  let labelEnum = 1
  for await (const line of rl) {
    let [x, y] = line.split(',')
    x = parseInt(x)
    y = parseInt(y)
    maxX = (maxX < x) ? x : maxX
    minX = (minX > x) ? x : minX
    maxY = (maxY < y) ? y : maxY
    minY = (minY > y) ? y : minY
    coords.push({ label: labelEnum++, x, y, closestCount: 0, excluded: false })
  }

  // for each coord
  console.log('-01234567890')
  let locAcc = 0
  for (let y = minY - 1; y <= maxY; y++) {
    let row = y
    for (let x = minX - 1; x <= maxX + 1; x++) {
      //let isBoundary = x === minX || x === maxX || y === minY || y === maxY
      //let closest = Number.MAX_SAFE_INTEGER
      //let equidistant = false
      
      let distAcc = 0
      coords.forEach((primary) => {
        distAcc += getManhattanDist({ x, y }, primary)
      })

      if (distAcc < 10000) {
        locAcc++
        row += '#'
      } else {
        row += '.'
      }
    }
    console.log(row)
  }

  console.log(locAcc)
  // mark border coords
  // determine is coord is infinite and exclude
  
  // this will be any that have a closest coord on boundary
  // boundary is x:minX || maxX-1 y:minY || maxY
  // count closest coords in row col order
}

function getManhattanDist (coord1, coord2) {
  let { x: x1, y: y1 } = coord1
  let { x: x2, y: y2 } = coord2
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}
processLineByLine()

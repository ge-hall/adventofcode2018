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
  for (let y = minY - 1; y <= maxY; y++) {
    let row = y
    for (let x = minX - 1; x <= maxX + 1; x++) {
      let isBoundary = x === minX || x === maxX || y === minY || y === maxY
      let closest = Number.MAX_SAFE_INTEGER
      let equidistant = false
      
      coords.forEach((primary) => {
        if (getManhattanDist({ x, y }, primary) === closest) {
          equidistant = true
        }
        // console.log(`xy=${x}${y}, primary= ${primary.x}${primary.y} dist = ${getManhattanDist({ x, y }, primary)}, closest = ${closest}`)
        // need to ensure equidistant check only applies to smallest distance
        if (closest > getManhattanDist({ x, y }, primary)) {
          equidistant = false
          closest = getManhattanDist({ x, y }, primary)
        }
      })

      if (equidistant) {
        row += '.'
        continue
      }

      coords.forEach((coord) => {
        if (getManhattanDist({ x, y }, coord) === closest && !equidistant) {
          if (isBoundary) {
            coord.excluded = true
          }
          if (getManhattanDist({ x, y }, coord) === 0) {
            row += String.fromCharCode(coord.label +96 - 32)
          } else {
            row += String.fromCharCode(coord.label +96)
          }
          coord.closestCount++
        }
      })
    }
    console.log(row)
  }
  console.log(coords)
  let maxArea = 0
  coords.forEach((coord) => {
    if (!coord.excluded) {
      maxArea = maxArea < coord.closestCount ? coord.closestCount : maxArea
    }
  })
  console.log(maxArea)
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

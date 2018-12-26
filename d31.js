const fs = require('fs')
const readline = require('readline')
async function processLineByLine () {
  const fileStream = fs.createReadStream('claims.txt')
  let rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  // split into array of claim objects
  // #1338 @ 136,486: 13x10
  let claims = []
  for await (const claim of rl) {
    let parts = claim.split(' ')
    let claimId = parts[0]
    let [left, top] = parts[2].replace(':', '').split(',')
    let [width, height] = parts[3].split('x')
    claims.push({ claimId, left: parseInt(left), top: parseInt(top), width: parseInt(width), height: parseInt(height) })
  }
  // get max rows and cols
  // {  claimId: '#1352',
  //    left: '406',
  //    top: '632',
  //    width: '11',
  //    height: '27' }
  let rows, cols
  rows = cols = 0
  claims.forEach(element => {
    console.log(element)
    let { top, left, height, width } = element
    rows = Math.max(rows, top + height)
    cols = Math.max(cols, left + width)
  })
  console.log(`rows:${rows}, cols:${cols}`)
  // create 2D array
  let material = new Array(rows)
  for (let i = 0; i < material.length; i++) {
    material[i] = new Array(cols)
  }
  console.log(material[10])
  // process each claim
  claims.forEach(claim => {
    const { claimId, left, top, width, height } = claim
    for (let i = top; i < top + height; i++) {
      for (let j = left; j < left + width; j++) {
        material[i][j] = (!material[i][j]) ? claimId : 'X'
        // console.log(material[i][j])
      }
    }
  }
  )

  printMaterial(material)
  console.log(overclaimedMaterial(material))
  let clearClaim = checkClearClaims(material, claims)
  console.log(clearClaim)
  printClaim(material, clearClaim)
}

function checkClearClaims (material, claims) {
  let claim =
  claims.find(claim => {
    const { left, top, width, height } = claim
    for (let i = top; i < top + height; i++) {
      for (let j = left; j < left + width; j++) {
        if (material[i][j] === 'X') return false
        // console.log(material[i][j])
      }
    }
    return true
  })
  return claim
}

function overclaimedMaterial (material) {
  let X = 0
  material.forEach((row) => {
    // let line = ''
    row.forEach((col) => {
      X += col === 'X' ? 1 : 0
    }
    )
  }
  )
  return X
}

function printClaim (material, claim) {
  const { left, top, width, height } = claim
  for (let i = top; i < top + height; i++) {
    let line = ''
    for (let j = left; j < left + width; j++) {
      line += material[i][j]
      console.log(line)
    }
  }
}

function printMaterial (material) {
  material.forEach((row) => {
    let line = ''
    row.forEach((col) => {
      line += col
    }
    )
    console.log(line)
  }
  )
}
processLineByLine()

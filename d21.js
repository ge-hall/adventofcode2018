const fs = require('fs')
const readline = require('readline')

async function processLineByLine () {
  const fileStream = fs.createReadStream('box-ids.txt')
  let rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
  let twos, threes
  twos = threes = 0
  for await (const line of rl) {
    const strArr = line.toLowerCase().split('').sort().join('').match(/(.)\1+/g)
    console.log(line)
    console.log(strArr)
    const counts = new Set()
    strArr.forEach((el) => counts.add(el.length))
    console.log(counts)
    twos += counts.has(2) ? 1 : 0
    threes += counts.has(3) ? 1 : 0
  }

  console.log(twos * threes)
}

processLineByLine()

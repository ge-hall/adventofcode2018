const fs = require('fs')
const readline = require('readline')

async function processLineByLine () {
  const fileStream = fs.createReadStream('box-ids.txt')
  let rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  const boxId = []
  for await (const line of rl) {
    boxId.push(line)
  }
  const boxDiffs = []
  boxId.forEach((el) => {
    boxId.forEach((cmp) => {
      // create obj and store {el, cmp, diff}
      const elArr = el.toLowerCase().split('')
      const cmpArr = cmp.toLowerCase().split('')
      let diff = 0
      for (let i = 0; i < elArr.length; i++) {
        diff += elArr[i] !== cmpArr[i] ? 1 : 0
      }

      boxDiffs.push({ el, cmp, diff })
    })
  })
  boxDiffs.forEach((el) => { let { diff } = el; if (diff === 1) console.log(el) })
}

processLineByLine()

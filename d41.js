const fs = require('fs')
const readline = require('readline')
async function processLineByLine () {
  const fileStream = fs.createReadStream('guard-data.txt')
  let rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  console.log(
    `Date   ID   Minute
            000000000011111111112222222222333333333344444444445555555555
            012345678901234567890123456789012345678901234567890123456789`)
  const records = []
  for await (const line of rl) {
    records.push(line)
  }
  records.sort()
  records.forEach((el) => console.log(el))

  // for each record contains Guard store #id
  // while next row not contain guard process minutes
  let guard
  let output = []
  records.forEach((el) => {
    if (el.match(/Guard #/g)) {
      if (guard) {
        output.push(guard)
        guard = ''
      }

      let reg = /#[0-9]+/
      let datetime = el.split(/[[[\]]/)
      guard = `${datetime[1].split(' ')[0]}   ${el.match(reg)[0]} `
    }
  })
  output.push(guard)
  output.forEach((el) => {
    for (let s = 20 - el.length; s > 0; s--) el += ' '
    for (let i = 0; i < 60; i++) el += '.'
    console.log(el)
  })
}

processLineByLine()

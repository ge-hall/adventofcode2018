const fs = require('fs')
const readline = require('readline')

console.log(`Problem 2 - Find first repeated freq.`)
async function processLineByLine () {
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let freq = 0
  let freqs = []
  freqs.push(0)
  let repeat
  while (!repeat) {
    const fileStream = fs.createReadStream('problem1-input.txt')
    let rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })
    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      freq += parseInt(line)
      repeat = freqs.find((el) => { return el === freq })
      console.log(freqs.find((el) => { return el === freq }))
      if (repeat) { console.log(repeat); break }
      freqs.push(freq)
      console.log(`Line from file: ${line}, current freq  = $ { freq}`)
    }
  }
  console.log(`Final Frequency is ${freq}`)
  console.log(repeat)
  // freqs.forEach((el)=> console.log(el))
}

processLineByLine()

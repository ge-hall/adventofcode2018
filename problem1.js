const fs = require('fs');
const readline = require('readline');

console.log(`Problem 1:wq
`)
async function processLineByLine() {
  const fileStream = fs.createReadStream('problem1-input.txt')
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let freq = 0
  for await (const line of rl) {
    //Each line in input.txt will be successively available here as `line`.
    freq += parseInt(line)
    console.log(`Line from file: ${line}, current freq = ${freq}`);
  }
  console.log(`Final Frequency is ${freq}`)
}


processLineByLine();

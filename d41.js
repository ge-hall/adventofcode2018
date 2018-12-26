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
  const guardSchedule = new Map()
  let minutes = new Array(60).fill(0)
  let asleepTime = 0
  // console.log(minutes)
  records.forEach((el) => {
    if (el.match(/Guard #/g)) {
      // if guard already defined then add minutes to map 
      if (guard) {
        guardSchedule.set(guard, minutes)
      }
      // now move on to process current guard shift
      let reg = /#[0-9]+/
      guard = `${el.match(reg)[0]}`
      minutes = guardSchedule.get(guard) || new Array(60).fill(0)

      asleepTime = 0
    } else {
      // process an event for current guard
      let action = el.split(' ')
      switch (action[2]) {
        case 'falls' : console.log('add')
          asleepTime = parseInt(action[1].replace(']', '').split(':')[1])
          break
        case 'wakes' : console.log('stop')
          let awakeTime = parseInt(action[1].replace(']', '').split(':')[1])
          for (let i = asleepTime; i < awakeTime; i++) {
            minutes[i]++
          }
      }
      console.log(action[2])
    }
  })
  console.log(guardSchedule)

  // get max minutes
  let maxMinutes = 0
  let maxGuard
  let maxMinute = 0
  let guardMaxMinutes
  let guardMaxMinute = 0
  guardSchedule.forEach((value, key, map) => {
    let [ guard, minutes ] = [key, value]
    guardMaxMinutes = minutes.reduce((accumulator, currentValue) => accumulator + currentValue)
    guardMaxMinute = minutes.reduce((max, currentValue) => { return (max < currentValue) ? currentValue : max })
    if (maxMinutes < guardMaxMinutes) {
      maxMinutes = guardMaxMinutes
      maxGuard = guard
      maxMinute = guardMaxMinute
    }
  })
  let maxTime = guardSchedule.get(maxGuard).indexOf(maxMinute)

  console.log(`guard:${maxGuard} was asleep most at ${maxTime}`)
  //console.log(guardSchedule.get(maxGuard))
  console.log(parseInt(maxGuard.replace('#', '')) * maxTime)

  // Part 2 guard most who slept the most in any minute
  let sleepyGuard
  let maxSleepyMinutes = 0
  let maxSleepyMinute
  guardSchedule.forEach((value, key, map) => {
    let [ guard, minutes ] = [key, value]
    for ( let i = 0; i < 60; i++) {
      if (minutes[i] > maxSleepyMinutes) {
        maxSleepyMinutes = minutes[i]
        maxSleepyMinute = i5
        sleepyGuard = guard
      }
    }
  })
  console.log(`Guard:${sleepyGuard}, minutes:${maxSleepyMinutes}, minute:${maxSleepyMinute}`)
  console.log(parseInt(sleepyGuard.replace('#', '')) * maxSleepyMinute)
}

processLineByLine()

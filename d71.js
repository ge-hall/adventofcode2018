const fs = require('fs')
const readline = require('readline')
async function processLineByLine () {
  const fileStream = fs.createReadStream('edge-data.txt')
  let rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
  let edges = []
  for await (const line of rl) {
    let tokens = line.split(' ')
    edges.push([tokens[1], tokens[7]])
    console.log(tokens[1], tokens[7])
  }
  let from = new Set()
  let to = new Set()
  let graph = new Graph()
  edges.forEach(element => {
    // create set from each part
    from.add(element[0])
    to.add(element[1])
    graph.addNode(element[0])
    graph.addNode(element[1])
  })
  let difference = new Set([...from].filter(x => !to.has(x)))
  let starters = [...difference].sort()
  console.log(starters)

  // add all edges to graph
  edges.forEach(edge => {
    graph.addEdge(edge[0], edge[1])
  })

  graph.resolve()
}

processLineByLine()

class Node {
  constructor (label) {
    this.label = label
    this.to = []
    this.from = []
  }

  addEdge (node) {
    this.from.push(node)
    node.to.push(this)
    node.to.forEach(e => {
      console.log(`Adding to node ${e} for node ${node}`)
    })
  }

  removeEdge (to) {
    this.to = this.to.filter(node => {
      return node !== to
    })
  }

  print () {
    console.log(
      `{${this.label}, from[${this.from.length}] to[${this.to.length}]`
    )
  }

  toString () {
    return this.label
  }
}

class Graph {
  constructor () {
    this.nodes = new Map()
    this.resolved = new Map()
  }

  addNode (node) {
    if (!this.nodes.has(node)) {
      this.nodes.set(node, new Node(node))
    }
  }

  addEdge (from, to) {
    this.nodes.get(from).addEdge(this.nodes.get(to))
  }

  available () {
    // any nodes that have no froms
    // console.log(this.nodes.length)
    let available = []

    this.nodes.forEach(n => {
      if (n.to.length === 0 && !this.resolved.has(n.label)) {
        available.push(n)
      }
    })
    return available
  }

  resolve () {
    let available = this.available().sort()

    while (available.length > 0) {
      // consume first
      let first = this.consumeNode(available[0])
      this.resolved.set(first.label, first)
      available = this.available().sort()
    }
  }

  consumeNode (node) {
    console.log(node.label)
    node.from.forEach(toNode => {
      toNode.removeEdge(node)
    })
    return node
  }
}

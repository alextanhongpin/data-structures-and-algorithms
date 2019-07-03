## JavaScript Version

```js
class Graph {
  constructor(numVertices) {
    this.numVertices = numVertices
    this.adjacencyList = new Map()
  }
  addVertex(vert) {
    this.adjacencyList.set(vert, [])
  }
  addEdge(fromVert, toVert) {
    this.adjacencyList.get(fromVert).push(toVert)
    this.adjacencyList.get(toVert).push(fromVert)
  }
  printEdges() {
    for (let vert of this.adjacencyList.keys()) {
      const edges = this.adjacencyList.get(vert).join(' ')
      console.log(`${vert} -> ${edges}`)
    }
  }
  bfs(startingNode) {
    const visited = new Set()
    const queue = []
    queue.push(startingNode)

    while (queue.length) {
      // Take first.
      const node = queue.shift()
      if (visited.has(node)) continue
      visited.add(node)

      // Append.
      queue.push(...this.adjacencyList.get(node))
      console.log(node)
    }
  }
  dfs(startingNode) {
    const visited = new Set()
    const stack = []
    stack.push(startingNode)
    while (stack.length) {
      // Take first.
      const node = stack.shift()
      if (visited.has(node)) continue
      visited.add(node)

      console.log(node)
      // Prepend.
      stack.unshift(...this.adjacencyList.get(node))
    }
  }
}

const vertices = ['A', 'B', 'C', 'D', 'E', 'F']
const graph = new Graph(vertices.length)
for (let vert of vertices) {
  graph.addVertex(vert)
}

graph.addEdge('A', 'B')
graph.addEdge('A', 'D')
graph.addEdge('A', 'E')
graph.addEdge('B', 'C')
graph.addEdge('D', 'E')
graph.addEdge('E', 'F')
graph.addEdge('E', 'C')
graph.addEdge('C', 'F')

graph.printEdges()

console.log('Breadth-First-Search')
graph.bfs('A') // A, B, D, E, C, F.

console.log('Depth-First-Search')
graph.dfs('A') // A, B, C, E, D, F.
```


## Golang Version

```go
package main

import (
	"fmt"
	"sync"
)

type Graph struct {
	numVertices int
	sync.RWMutex
	adjacencyList map[string][]string
}

func NewGraph(numVertices int) *Graph {
	return &Graph{
		numVertices:   numVertices,
		adjacencyList: make(map[string][]string),
	}
}

func (g *Graph) AddVertex(vert string) {
	g.RLock()
	_, exist := g.adjacencyList[vert]
	g.RUnlock()
	if exist {
		return
	}
	g.Lock()
	g.adjacencyList[vert] = make([]string, 0)
	g.Unlock()
}

func (g *Graph) AddEdge(fromVert, toVert string) {
	g.adjacencyList[fromVert] = append(g.adjacencyList[fromVert], toVert)
	g.adjacencyList[toVert] = append(g.adjacencyList[toVert], fromVert)
}

func (g *Graph) PrintEdges() {
	g.RLock()
	for node, edges := range g.adjacencyList {
		fmt.Println(node, edges)
	}
	g.RUnlock()
}

func (g *Graph) BreadthFirstSearch(node string) {
	visited := make(map[string]bool)
	queue := []string{node}
	for len(queue) > 0 {
		var hd string
		hd, queue = queue[0], queue[1:]

		if visited[hd] {
			continue
		}
		visited[hd] = true

		fmt.Print(hd)
		edges := g.adjacencyList[hd]
		queue = append(queue, edges...)
	}
	fmt.Println()
}

func (g *Graph) DepthFirstSearch(node string) {
	visited := make(map[string]bool)

	stack := []string{node}
	for len(stack) > 0 {
		var hd string
		hd, stack = stack[0], stack[1:]
		if visited[hd] {
			continue
		}
		visited[hd] = true
		fmt.Print(hd)

		edges := g.adjacencyList[hd]
		stack = append(edges, stack...)
	}
	fmt.Println()
}

func main() {
	vertices := []string{"A", "B", "C", "D", "E", "F"}
	var graph = NewGraph(len(vertices))
	for _, vert := range vertices {
		graph.AddVertex(vert)
	}
	graph.AddEdge("A", "B")
	graph.AddEdge("A", "D")
	graph.AddEdge("A", "E")
	graph.AddEdge("B", "C")
	graph.AddEdge("D", "E")
	graph.AddEdge("E", "F")
	graph.AddEdge("E", "C")
	graph.AddEdge("C", "F")
	graph.PrintEdges()

	graph.BreadthFirstSearch("A") // ABDECF
	graph.DepthFirstSearch("A")   // ABCEDF
}
```

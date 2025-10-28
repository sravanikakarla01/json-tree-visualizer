import React, { useEffect, useState, useCallback, useMemo } from 'react'
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow'
import 'reactflow/dist/style.css'

function newId() {
  return Math.random().toString(36).substr(2, 9)
}

function buildGraph(data) {
  const nodes = []
  const edges = []

  function walk(value, path, parentId) {
    const id = newId()
    const type = Array.isArray(value) ? 'array' : typeof value === 'object' && value !== null ? 'object' : 'primitive'
    const label = type === 'primitive' ? `${path.split('.').pop()}: ${String(value)}` : path.split('.').pop() || '$'
    nodes.push({ id, position: { x: 0, y: 0 }, data: { label, path, type } })
    if (parentId) edges.push({ id: `${parentId}-${id}`, source: parentId, target: id })
    if (type === 'object') Object.keys(value).forEach(k => walk(value[k], `${path}.${k}`, id))
    else if (type === 'array') value.forEach((v, i) => walk(v, `${path}[${i}]`, id))
  }

  walk(data, '$', null)
  return { nodes, edges }
}

export default function TreeVisualizer({ jsonData }) {
  const [elements, setElements] = useState({ nodes: [], edges: [] })

  useEffect(() => {
    if (!jsonData) return
    const { nodes, edges } = buildGraph(jsonData)
    nodes.forEach((n, i) => {
      n.position = { x: (i % 5) * 200, y: Math.floor(i / 5) * 100 }
    })
    setElements({ nodes, edges })
  }, [jsonData])

  return (
    <ReactFlow
      nodes={elements.nodes}
      edges={elements.edges}
      fitView
      nodesConnectable={false}
      attributionPosition="bottom-left"
    >
      <MiniMap zoomable pannable />
      <Controls />
      <Background />
    </ReactFlow>
  )
}

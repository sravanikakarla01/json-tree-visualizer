import React, { useEffect, useState } from 'react'
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
    const type = Array.isArray(value)
      ? 'array'
      : typeof value === 'object' && value !== null
      ? 'object'
      : 'primitive'

    const label =
      type === 'primitive'
        ? `${path.split('.').pop()}: ${String(value)}`
        : path.split('.').pop() || '$'

    nodes.push({
      id,
      position: { x: 0, y: 0 },
      data: { label, path, type }
    })

    if (parentId)
      edges.push({ id: `${parentId}-${id}`, source: parentId, target: id })

    if (type === 'object')
      Object.keys(value).forEach(k => walk(value[k], `${path}.${k}`, id))
    else if (type === 'array')
      value.forEach((v, i) => walk(v, `${path}[${i}]`, id))
  }

  walk(data, '$', null)
  return { nodes, edges }
}

export default function TreeVisualizer({ jsonData, searchPath, setNotice }) {
  const [elements, setElements] = useState({ nodes: [], edges: [] })
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  // 🧠 Build graph whenever JSON changes
  useEffect(() => {
    if (!jsonData) return
    const theme = localStorage.getItem('theme') || 'dark'

    const { nodes, edges } = buildGraph(jsonData)
    nodes.forEach((n, i) => {
      n.position = { x: (i % 5) * 200, y: Math.floor(i / 5) * 100 }

      // 🌗 Apply color and text depending on theme
      const isDark = theme === 'dark'
      const objectColor = isDark ? '#4338ca33' : '#c7d2fe'
      const arrayColor = isDark ? '#05966933' : '#bbf7d0'
      const primitiveColor = isDark ? '#f9731633' : '#fed7aa'
      const textColor = isDark ? '#ffffff' : '#000000'

      n.style = {
        padding: 8,
        borderRadius: 8,
        border: '2px solid transparent',
        background:
          n.data.type === 'object'
            ? objectColor
            : n.data.type === 'array'
            ? arrayColor
            : primitiveColor,
        color: textColor,
        fontSize: 13,
        fontWeight: 500
      }
    })
    setElements({ nodes, edges })
  }, [jsonData])

  // 🔍 Highlight node when searching
  useEffect(() => {
    if (!searchPath || !elements.nodes.length || !reactFlowInstance) return

    const normalized = searchPath.replace(/^\$\./, '$').trim()
    let found = false

    const updatedNodes = elements.nodes.map(n => {
      const nodePath = n.data.path.replace(/^\$\./, '$')
      if (nodePath === normalized) {
        found = true
        reactFlowInstance.setCenter(
          n.position.x + 100,
          n.position.y + 50,
          { zoom: 1.5, duration: 800 }
        )
        return {
          ...n,
          style: {
            ...n.style,
            border: '3px solid #3b82f6',
            boxShadow: '0 0 15px 4px #3b82f666',
            transition: 'all 0.3s ease-in-out'
          }
        }
      }
      return {
        ...n,
        style: {
          ...n.style,
          border: '2px solid transparent',
          boxShadow: 'none'
        }
      }
    })

    setElements(prev => ({ ...prev, nodes: updatedNodes }))
    if (found) setNotice(`✅ Found: ${searchPath}`)
    else setNotice('❌ No match found')
  }, [searchPath])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={elements.nodes}
        edges={elements.edges}
        onInit={setReactFlowInstance}
        fitView
        nodesConnectable={false}
        attributionPosition='bottom-left'
      >
        <MiniMap
          zoomable
          pannable
          nodeStrokeColor="#64748b"
          nodeColor="#334155"
        />
        <Controls />

        {/* 🌗 Background color changes with theme */}
        <Background
          color={localStorage.getItem('theme') === 'dark' ? '#1e293b' : '#e2e8f0'}
          gap={20}
        />
      </ReactFlow>
    </div>
  )
}

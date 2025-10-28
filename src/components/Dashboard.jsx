import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import JsonInput from './JsonInput'
import TreeVisualizer from './TreeVisualizer'

export default function Dashboard() {
  const nav = useNavigate()
  const [jsonData, setJsonData] = useState(null)
  const [notice, setNotice] = useState('')

  return (
    <div className='app-shell'>
      <div className='header'>
        <div className='brand'>
          <div className='logo'>JT</div>
          <div>
            <div className='title'>Dashboard</div>
            <div className='subtitle'>Visualize and search JSON</div>
          </div>
        </div>
        <button className='btn secondary' onClick={() => nav('/')}>Home</button>
      </div>

      <div style={{marginTop:18, display:'grid', gridTemplateColumns:'360px 1fr', gap:16}}>
        <div className='card'>
          <JsonInput onGenerate={data => setJsonData(data)} setNotice={setNotice} />
        </div>
        <div className='card'>
          <h3>Tree Visualizer</h3>
          <div className='visualizer-wrap'>
            <TreeVisualizer jsonData={jsonData} setNotice={setNotice} />
          </div>
        </div>
      </div>
    </div>
  )
}

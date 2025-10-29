import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import JsonInput from './JsonInput'
import TreeVisualizer from './TreeVisualizer'
import SearchBar from './SearchBar'

export default function Dashboard() {
  const nav = useNavigate()
  const [jsonData, setJsonData] = useState(null)
  const [notice, setNotice] = useState('')
  const [searchPath, setSearchPath] = useState('')
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.body.className = `theme-${savedTheme}`
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.body.className = `theme-${newTheme}`
    localStorage.setItem('theme', newTheme)
  }

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
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className='btn secondary' onClick={toggleTheme}>
            {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
          </button>
          <button className='btn secondary' onClick={() => nav('/')}>Home</button>
        </div>
      </div>

      {notice && <div className="notice" style={{ marginTop: 12 }}>{notice}</div>}

      <div style={{marginTop:18, display:'grid', gridTemplateColumns:'360px 1fr', gap:16}}>
        <div className='card'>
          <JsonInput onGenerate={data => setJsonData(data)} setNotice={setNotice} />
        </div>
        <div className='card'>
          <h3>Tree Visualizer</h3>
          <SearchBar onSearch={setSearchPath} />
          <div className='visualizer-wrap'>
            <TreeVisualizer jsonData={jsonData} searchPath={searchPath} setNotice={setNotice} />
          </div>
        </div>
      </div>
    </div>
  )
}

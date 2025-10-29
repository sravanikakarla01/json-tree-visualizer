import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const nav = useNavigate()
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
            <div className='title'>JSON Tree Visualizer</div>
            <div className='subtitle'>Paste JSON, visualize with React Flow</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className='btn secondary' onClick={toggleTheme}>
            {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
          </button>
          <button className='btn' onClick={() => nav('/dashboard')}>Go to Dashboard</button>
        </div>
      </div>

      <div className='card' style={{marginTop:18}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{fontWeight:700}}>Welcome!</div>
            <div className='small'>Click Dashboard to start visualizing your JSON data.</div>
          </div>
          <button className='btn secondary' onClick={() => nav('/dashboard')}>Open Dashboard</button>
        </div>
      </div>
    </div>
  )
}

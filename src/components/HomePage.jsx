import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const nav = useNavigate()
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
        <button className='btn' onClick={() => nav('/dashboard')}>Go to Dashboard</button>
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

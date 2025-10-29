import React, { useState, useEffect } from 'react'

export default function JsonInput({ onGenerate, setNotice }) {
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [savedList, setSavedList] = useState([])

  // ✅ Load saved data when the component mounts
  useEffect(() => {
    const saved = localStorage.getItem('jsonData')
    const history = JSON.parse(localStorage.getItem('jsonHistory') || '[]')
    if (saved) setText(saved)
    setSavedList(history)
  }, [])

  // ✅ Save current JSON as you type
  const handleChange = (e) => {
    const newText = e.target.value
    setText(newText)
    localStorage.setItem('jsonData', newText)
  }

  // ✅ Parse and visualize
  const handleGenerate = () => {
    try {
      const parsed = JSON.parse(text)
      setError('')
      onGenerate(parsed)
      setNotice('JSON parsed successfully')
    } catch (e) {
      setError('Invalid JSON: ' + e.message)
    }
  }

  // ✅ Save current JSON to history
  const handleSave = () => {
    if (!text.trim()) {
      setNotice('Nothing to save')
      return
    }
    let name = prompt('Enter a name for this JSON:')
    if (!name) return
    const history = JSON.parse(localStorage.getItem('jsonHistory') || '[]')
    history.push({ name, data: text, time: new Date().toLocaleString() })
    localStorage.setItem('jsonHistory', JSON.stringify(history))
    setSavedList(history)
    setNotice(`Saved as "${name}"`)
  }

  // ✅ Load a saved JSON
  const handleLoad = (data) => {
    setText(data)
    localStorage.setItem('jsonData', data)
    setNotice('Loaded saved JSON')
  }

  // ✅ Clear everything
  const handleClear = () => {
    setText('')
    setError('')
    localStorage.removeItem('jsonData')
    setNotice('Cleared input')
  }

  // ✅ Delete one saved JSON
  const handleDelete = (index) => {
    const history = JSON.parse(localStorage.getItem('jsonHistory') || '[]')
    history.splice(index, 1)
    localStorage.setItem('jsonHistory', JSON.stringify(history))
    setSavedList(history)
    setNotice('Deleted saved item')
  }

  return (
    <div>
      <h4>JSON Input</h4>
      <textarea
        className='json-input'
        placeholder='Paste your JSON here'
        value={text}
        onChange={handleChange}
      />
      {error && <div style={{ color: '#ffb4b4', marginTop: 8 }}>{error}</div>}

      <div className='footer'>
        <button className='btn' onClick={handleGenerate}>Visualize</button>
        <button className='btn secondary' onClick={handleClear}>Clear</button>
        <button className='btn secondary' onClick={handleSave}>Save JSON</button>
      </div>

      {/* ✅ Saved History List */}
      {savedList.length > 0 && (
        <div style={{ marginTop: 14 }}>
          <h5>Saved JSON History</h5>
          <div style={{
            maxHeight: '200px',
            overflowY: 'auto',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '8px',
            padding: '8px'
          }}>
            {savedList.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.03)',
                padding: '6px 8px',
                borderRadius: '6px',
                marginBottom: '6px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div className='small'>{item.time}</div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className='btn secondary' onClick={() => handleLoad(item.data)}>Load</button>
                  <button className='btn secondary' style={{ color: '#ff9f9f' }} onClick={() => handleDelete(i)}>X</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

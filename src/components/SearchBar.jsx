import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (!query.trim()) return
    onSearch(query.trim())
  }

  return (
    <div className='controls' style={{ marginBottom: 10 }}>
      <input
        className='search-input'
        placeholder='Enter path, e.g. $.user.address.city'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button className='btn secondary' onClick={handleSearch}>Search</button>
    </div>
  )
}

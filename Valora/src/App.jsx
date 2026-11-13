import React from 'react'

const App = () => {

  const onSubmit = (e) => {
    e.preventDefault()

    alert("Hey")
  }

  return (
  
    <div className='min-h-screen bg-slate-950 text-white overflow-hidden'>
      <div className='search'>
        <div className='searchBox'>
          <form onSubmit={onSubmit} role='search' className='searchForm'>
            <input 
              id='searchInput'
              type='text' 
              role='combobox'
              spellCheck='false'
              placeholder='Enter a stock symbol'
            />
            
            <button type='submit' className='searchBtn'>
              Search
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default App

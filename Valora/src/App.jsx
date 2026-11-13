import React from 'react'
import { useState, useRef } from 'react'

const nav_Links = ['Home', 'Placeholder1', 'Placeholder2', 'Placeholder3']

const App = () => {

  const [query, setQuery] = useState('')
  const [activeLink, setActiveLink] = useState('Home')

  //Handling the submit request
  const handleSubmit = (e) => {
    e.preventDefault()

    //Stock search ran here (to be completed)
    console.log('Searching for:', query.trim())
  }

  return(
    <div className='page'>
      
      <header className='header'>
        <h1 className='stockSearch-brand'>Valora</h1>
        {/* Navigation Bar */}
        <nav className='navBar' aria-label='Main'>
          <ul className='navBarLinks'>
            {nav_Links.map((link) => (
              <li key={link}>
                <a href="#" 
                  className='linkOnNavBar'
                  aria-current={link === activeLink ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveLink(link)
                  }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      
      {/* Main content */}
      <main className='main-search'>
          {/* //Search bar for stocks */}
        <form className='search-stock-form' role='search' onSubmit={handleSubmit}>

          <input 
            id='stock-search' 
            className='search-input' 
            type='text' 
            autoComplete='off'
            spellCheck='false'
            placeholder='Search for a stock' 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
          />

          <button type='submit' className='search-stock-btn'>
            Search
          </button>

        </form>
      </main>

    </div>
  )

}

export default App

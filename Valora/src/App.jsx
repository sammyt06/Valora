import React from 'react'
import { useState, useRef } from 'react'

const nav_Links = ['Home', 'Placeholder1', 'Placeholder2', 'Placeholder3']

const App = () => {

  //Stock Query
  const [query, setQuery] = useState('')
  //Navigation bar links
  const [activeLink, setActiveLink] = useState('Home')

  //Query data 
  const [stock, setStock] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const searched = Boolean(loading || stock || error)

  const API_KEY = import.meta.env.VITE_FINNHUB_KEY

  //Formatting helpers 
  const formatPrice = (n) => 
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  const formatSigned = (n) =>
    `${n >= 0 ? '+' : ''}${n.toFixed(2)}`

  const formatDate = (unixSeconds) =>
    new Date(unixSeconds * 1000).toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

  //Handling the submit request
  const handleSubmit = async (e) => {
    e.preventDefault()

    //Stock search ran here
    console.log('Searching for:', query.trim())

    //Formatting symbol correctly
    const symbol = query.trim().toUpperCase()
    if (!symbol) return

    setLoading(true)
    setError('')
    //Clear the previous result
    setStock(null)

    try {   
      //pauses function until answer arrives
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${API_KEY}`
      )

      //Error message
      if (!res.ok){
        throw new Error(res.status, "Query not found/ error occured")
      }
      
      //turn response into a JavaScript object
      const data = await res.json()
      if (!data.c) throw new Error(`No data found for "${symbol}"`)
      //Keeping ticker and quote
      setStock({symbol, ...data})

    } catch (err){
      setError("Invalid query or error occured!")
    } finally{
      //runs whether worked or failed
      setLoading(false)
    }

  }

  return(
    <div className={`page ${searched ? 'searched' : ''}`}>
      
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
            placeholder='Search for a stock (symbol)' 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
          />

          <button type='submit' disabled={loading} className='search-stock-btn'>
            {loading ? 'Searching...': 'Search'}
          </button>

        </form>
      </main>
      
      {stock && (
        <section className='quoteCard'>
          <h2 className='quoteSymbol'>{stock.symbol}</h2>

          <p className='quotePrice'>{formatPrice(stock.c)}</p>

          <p className={`quoteChange ${stock.d >= 0 ? 'up' : 'down'}`}>
            {formatSigned(stock.d)} ({formatSigned(stock.dp)}%)
          </p>

          <dl className='quoteStats'>
            <div>
              <dt>Open</dt>
              <dd>{formatPrice(stock.o)}</dd>
            </div>
            <div>
              <dt>High</dt>
              <dd>{formatPrice(stock.h)}</dd>
            </div>
            <div>
              <dt>Low</dt>
              <dd>{formatPrice(stock.l)}</dd>
            </div>
            <div>
              <dt>Previous Close</dt>
              <dd>{formatPrice(stock.pc)}</dd>
            </div>
          </dl>

          <p className='quoteDate'>Last updated: {formatDate(stock.t)}</p>
        </section>
      )}

    </div>
  )

}

export default App

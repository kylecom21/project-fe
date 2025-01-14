import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Home'
import Cryptos from './Components/Cryptos'
import Stocks from './Components/Stocks'
import Crypto from './Components/Crypto'
import Stock from './Components/Stock'

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/crypto' element={<Cryptos/>} />
        <Route path='/crypto/:id' element={<Crypto/>} />
        <Route path='/stocks' element={<Stocks/>} />
        <Route path='stocks/:id' element={<Stock/>}/>
      </Routes>
    </div>
  )
}

export default App

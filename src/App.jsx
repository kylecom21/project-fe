import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Home'
import Crypto from './Components/Crypto'
import Stocks from './Components/Stocks'

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/crypto' element={<Crypto/>} />
        <Route path='/stocks' element={<Stocks/>} />
      </Routes>
    </div>
  )
}

export default App

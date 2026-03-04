import './App.css'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import Footer from './components/layout/Footer'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <div className="w-full min-h-screen bg-black">
        <Navbar/>
        <Home/>
        <Footer/>
      </div>
    </CartProvider>
  )
}

export default App

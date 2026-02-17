import './App.css'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="w-full min-h-screen bg-black">
      <Navbar/>
      <Home/>
      <Footer/>
    </div>
  )
}

export default App

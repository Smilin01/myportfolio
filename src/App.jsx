import Home from './pages/Home'
import About from './components/About'
import Skills from './components/Skills'
import Navbar from './components/Navbar'
import DevOpsFlows from './components/DevOpsFlows'
import Footer from './components/Footer'
import Projects from './components/Projects'
import Contact from './components/Contact'
import CustomCursor from './utils/CursorAnimation'

export default function App() {
  return (
    <div className='font-sora scroll-smooth overflow-x-hidden'>
      <CustomCursor />
      <Navbar />
      <Home />
      <Skills />
      <About />
      <DevOpsFlows />
      <Projects />
      <Contact />

      <Footer />
    </div>
  )
}

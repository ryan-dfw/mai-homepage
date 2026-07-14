import { Routes, Route } from 'react-router-dom'
import { EditableProvider } from './editable/EditableContext'
import { ImagesProvider } from './editable/ImagesContext'
import { GalleryDataProvider } from './editable/GalleryDataContext'
import { ControlsVisibilityProvider } from './editable/ControlsVisibilityContext'
import Nav from './components/Nav'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Schedule from './pages/Schedule'
import UnlockGate from './components/UnlockGate'

export default function App() {
  return (
    <ControlsVisibilityProvider>
      <EditableProvider>
        <ImagesProvider>
          <GalleryDataProvider>
            <ScrollToTop />
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/supersecretpassword" element={<UnlockGate />} />
            </Routes>
            <Footer />
          </GalleryDataProvider>
        </ImagesProvider>
      </EditableProvider>
    </ControlsVisibilityProvider>
  )
}

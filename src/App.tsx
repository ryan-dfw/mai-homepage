import { Routes, Route } from 'react-router-dom'
import { EditableProvider } from './editable/EditableContext'
import { ImagesProvider } from './editable/ImagesContext'
import { GalleryDataProvider } from './editable/GalleryDataContext'
import { ControlsVisibilityProvider } from './editable/ControlsVisibilityContext'
import { EDIT_PREFIX } from './editable/editPrefix'
import Nav from './components/Nav'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Schedule from './pages/Schedule'

// Every real page is mounted twice: once at its normal (read-only) path, and
// once under the secret edit-mode prefix. Both point at the same component
// reading the same Firebase/Cloudinary data — only ControlsVisibilityContext
// (driven by which of these paths matched) decides whether editing UI shows.
const pages: { path: string; element: JSX.Element }[] = [
  { path: '/', element: <Home /> },
  { path: '/services', element: <Services /> },
  { path: '/gallery', element: <Gallery /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/schedule', element: <Schedule /> },
]

export default function App() {
  return (
    <ControlsVisibilityProvider>
      <EditableProvider>
        <ImagesProvider>
          <GalleryDataProvider>
            <ScrollToTop />
            <Nav />
            <Routes>
              {pages.map(p => (
                <Route key={p.path} path={p.path} element={p.element} />
              ))}
              {pages.map(p => (
                <Route
                  key={`edit${p.path}`}
                  path={p.path === '/' ? EDIT_PREFIX : `${EDIT_PREFIX}${p.path}`}
                  element={p.element}
                />
              ))}
            </Routes>
            <Footer />
          </GalleryDataProvider>
        </ImagesProvider>
      </EditableProvider>
    </ControlsVisibilityProvider>
  )
}

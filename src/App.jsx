import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import KfzKaufvertrag from './pages/KfzKaufvertrag'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import Layout from './components/Layout'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/kfz-kaufvertrag" element={<KfzKaufvertrag />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

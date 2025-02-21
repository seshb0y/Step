
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ChangePassword from './components/ChangePassword'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

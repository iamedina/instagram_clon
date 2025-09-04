import './App.css'
import Home from './components/inicio/Main'
import Register from './components/register/Main'
import Login from './components/login/Main'
import Birthday from './components/register/Birthday'
import CodigoVerificacion from './components/register/Verificacion'
import Instagram from '../instagram'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/birthday' element={<Birthday />} />
          <Route path='/codigo' element={<CodigoVerificacion />} />
          <Route path='/home' element={<Instagram />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

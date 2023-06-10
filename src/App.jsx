import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './layout/Auth/auth'
import Header from './layout/header/header'
import Home from './views/home'
import Test from './views/test'
import './assets/style/main.scss'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          <Route path='/' element={<Home />} />
          {/* Routes authentifier :  */}
          <Route element={<AuthLayout />}>
            <Route path='test' element={<Test />} />
          </Route>
          {/* fin des routes auth...  */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

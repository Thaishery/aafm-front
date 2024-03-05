import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthLayout from './layout/Auth/auth'
import GoogleAuthLayout from './layout/GoogleAuth/googleAuth'
import Header from './layout/header/header'
import Home from './views/home'
import Content from './views/content'
import './assets/style/main.scss'
import { useEffect, useState } from 'react'



const App = () => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  console.log(userIsLoggedIn)
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          <Route path='/' element={<Home userIsLoggedIn={userIsLoggedIn} />} />
          {/* Route guard for authenticated routes */}
          <Route path="/auth" element={<AuthLayout userIsLoggedIn={userIsLoggedIn} setUserIsLoggedIn={setUserIsLoggedIn} />} />
          <Route path="/googleauth" element={<Navigate to={"/"} />} />
          <Route path="/googleauth/:token" element={<GoogleAuthLayout userIsLoggedIn={userIsLoggedIn} setUserIsLoggedIn={setUserIsLoggedIn} />} />
          {/* End of authenticated routes */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

// function App() {
//   const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
//   useEffect(()=>{
//     localStorage()
//   },[])
//   console.log(userIsLoggedIn);
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<Header />}>
//           <Route path='/' element={<Home userIsLoggedIn={userIsLoggedIn} />} />
//           {/* <Route path='/googleauth' element={<GoogleAuth />}/> */}
//           {/* Routes authentifier :  */}
//           <Route path="/auth" element={<AuthLayout userIsLoggedIn={userIsLoggedIn} setUserIsLoggedIn={setUserIsLoggedIn} />}>
//             <Route path='content' element={<Content />} />
//           </Route>
//           {/* fin des routes auth...  */}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }

export default App

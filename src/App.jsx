import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './views/Auth/auth';
import GoogleAuth from './views/GoogleAuth/googleAuth';
import Home from './views/home';
// import Content from './views/content';
import './assets/style/main.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import urls from './constants/urls';
// import Header from './componant/header/header';
import PublicLayout from './layout/Public/PublicLayout';
import LogedLayout from './layout/Loged/LogedLayout';
import FourOFour from './views/404';
import MonCompte from './views/MonCompte/MonCompte';
import Deconnection from './views/Deconnection/Deconnection';
import GestionDonneesRgpd from './views/GestionDonneesRgpd.jsx';
import Activitees from './views/Activitees/Activitees.jsx';
import Pages from './views/Pages/pages.jsx';

// import {LoaderContext} from "./context/Context";

const App = () => {
  // const [isLoading, setLoading] = useState(true)
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    validLocalToken();
  }, []);
  const validLocalToken = async () => {
    let token = localStorage.getItem('token');
    if (token == null) {
      // setLoading(false);
      return;
    }
    let splited = token.split('.');
    if (splited[1] == null) {
      // setLoading(false);
      return;
    }
    let payload = JSON.parse(atob(splited[1]));
    if (payload?.exp == null) {
      // setLoading(false);
      return;
    }
    if (payload.exp > Math.ceil(Date.now() / 1000)) {
      try {
        const res = await axios({
          url: `${urls.apiUrl}/api/users/internal/validateToken`,
          method: 'POST',
          data: {
            token: token
          },
          headers: { 'Content-Type': 'application/json' }
        });
        if (res?.data?.token) {
          localStorage.setItem('token', res.data.token);
          setToken(res.data.token);
          setUserIsLoggedIn(true);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Error validating token:', error);
      } finally {
        // setLoading(false);
      }
    }
  };

  return (
    // <LoaderContext.Provider value={context}>
      <BrowserRouter>
        <Routes>
          {// mettre ici les routes protégé par login : 
            userIsLoggedIn &&
            <Route element={<LogedLayout userIsLoggedIn={userIsLoggedIn} token={token} />}>
              <Route path='/activitees' element={<Activitees userIsLoggedIn={userIsLoggedIn} token={token} />} />
              <Route path='/monCompte' element={<MonCompte userIsLoggedIn={userIsLoggedIn} token={token} />} />
              <Route path='/Deconnection' element={<Deconnection setUserIsLoggedIn={setUserIsLoggedIn} />} /> 
            </Route>
          }
          <Route element={<PublicLayout userIsLoggedIn={userIsLoggedIn} token={token} />}>
            <Route path="*" element={<FourOFour />} />
            <Route path='/' element={<Home userIsLoggedIn={userIsLoggedIn} token={token} />} />
            {/* affichage des pages :  */}
            <Route path="/pages/:pagenom" element={<Pages userIsLoggedIn={userIsLoggedIn} token={token} />}/>
            
            {/* affichage des catégories :  */}
            {/* <Route path="/categories/" elements={< />}/> */}
            
            {/* affichage d'une catégorie et de ses articles associé */}
            {/* <Route path="/categorie/:nom/" elements={< />}/> */}
            
            {/* affichage d'un article d'une catégorie */}
            {/* <Route path="/categorie/:nom/:article" elements={< />}/> */}
            <Route path='/mesDonnees' element={<GestionDonneesRgpd />}/>
            {/* Routes d'authentification */}
            <Route path="/connexion" element={<Auth userIsLoggedIn={userIsLoggedIn} setUserIsLoggedIn={setUserIsLoggedIn} setToken={setToken} token={token} />} />
            <Route path="/googleauth" element={<Navigate to={"/"} />} />
            <Route path="/googleauth/:gtoken" element={<GoogleAuth userIsLoggedIn={userIsLoggedIn} setUserIsLoggedIn={setUserIsLoggedIn} setToken={setToken} token={token} />} />
            {/* FIN Routes d'authentification */}
          </Route>
        </Routes>
      </BrowserRouter>
    // </LoaderContext.Provider>
  );
};

export default App;
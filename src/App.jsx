import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './views/Auth/auth';
import GoogleAuth from './views/GoogleAuth/googleAuth';
import Home from './views/home';
import './assets/style/main.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import urls from './constants/urls';
import PublicLayout from './layout/Public/PublicLayout';
import LogedLayout from './layout/Loged/LogedLayout';
import FourOFour from './views/404';
import MonCompte from './views/MonCompte/MonCompte';
import Deconnection from './views/Deconnection/Deconnection';
// import GestionDonneesRgpd from './views/GestionDonneesRgpd.jsx';
import Activitees from './views/Activitees/Activitees.jsx';
import Pages from './views/Pages/Pages.jsx';
import Categories from './views/Categories/Categories.jsx';
import Categorie from './views/Categorie/Categorie.jsx';
import Article from './views/Article/Article.jsx';
import ModedLayout from './layout/Moded/ModedLayout.jsx';
import Moderation from './views/Moderation/Moderation.jsx';

// import {LoaderContext} from "./context/Context";

const App = () => {
  // const [isLoading, setLoading] = useState(true)
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [userRoles, setUserRoles] = useState("");

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
          setUserRoles(JSON.parse(atob(res?.data?.token.split('.')[1])).roles);
          localStorage.setItem('token', res.data.token);
          setToken(res.data.token);
          setUserIsLoggedIn(true);
          setInterval(refreshToken, 7180*1000)
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        localStorage.removeItem('token');
        console.error('Error validating token:', error);
      } finally {
        // setLoading(false);
      }
    }
  };

  const refreshToken = async ()=>{
    let token = localStorage.getItem('token')
    if(!token)return
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
      } 
      else {
      }
    } catch (error) {
      localStorage.removeItem('token');
      setUserIsLoggedIn(false);
    } finally {
      // setLoading(false);
    }
  }

  useEffect(() => {
    validLocalToken();
  },[]);

  return (
    // <LoaderContext.Provider value={context}>
      <BrowserRouter>
        <Routes>

          {/* mettre ici les routes protégé pour modération : */}
          {(userIsLoggedIn && (userRoles.indexOf('ROLE_MODERATOR') !== -1 || userRoles.indexOf('ROLE_ADMIN') !== -1)) && 
            <Route element={<ModedLayout userIsLoggedIn={userIsLoggedIn} token={token} />}>
              <Route path='/moderation' element={<Moderation userIsLoggedIn={userIsLoggedIn} token={token} />} />
            </Route>
          }
          
          {/* mettre ici les routes protégé par login :  */}
          {userIsLoggedIn &&
            <Route element={<LogedLayout userIsLoggedIn={userIsLoggedIn} token={token} userRoles={userRoles} />}>
              <Route path='/activitees' element={<Activitees userIsLoggedIn={userIsLoggedIn} token={token} />} />
              <Route path='/monCompte' element={<MonCompte userIsLoggedIn={userIsLoggedIn} token={token} />} />
              <Route path='/Deconnection' element={<Deconnection setUserIsLoggedIn={setUserIsLoggedIn} />} /> 
            </Route>
          }
          {/* mettre ici les routes non protégé :  */}
          <Route element={<PublicLayout userIsLoggedIn={userIsLoggedIn} token={token} userRoles={userRoles} />}>
            <Route path="*" element={<FourOFour />} />
            <Route path='/' element={<Home userIsLoggedIn={userIsLoggedIn} token={token} />} />
            
            {/* affichage des pages :  */}
            <Route path="/pages/:pagenom/" element={<Pages />}/>
            
            {/* affichage des catégories :  */}
            <Route path="/categories/" element={<Categories />}/>
            
            {/* affichage d'une catégorie et de ses articles associé */}
            <Route path="/categorie/:nom/" element={<Categorie />}/>
            
            {/* affichage d'un article d'une catégorie */}
            <Route path="/categorie/:nom/:article" element={<Article />}/>
            
            {/* <Route path='/mesDonnees' element={<GestionDonneesRgpd />}/> */}

            {/* Routes d'authentification */}
            <Route path="/connexion" element={<Auth userIsLoggedIn={userIsLoggedIn} setUserIsLoggedIn={setUserIsLoggedIn} setToken={setToken} token={token} />} />
            <Route path="/googleauth" element={<Navigate to={"/"} />} />
            <Route path="/googleauth/:gtoken" element={<GoogleAuth userIsLoggedIn={userIsLoggedIn} setUserIsLoggedIn={setUserIsLoggedIn} setUserRoles={setUserRoles} setToken={setToken} token={token} />} />
            {/* FIN Routes d'authentification */}
          </Route>
        </Routes>
      </BrowserRouter>
    // </LoaderContext.Provider>
  );
};

export default App;
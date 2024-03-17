import { useEffect } from "react"
import { Navigate, Outlet, useParams } from "react-router-dom"
import axios from 'axios';
import urls from "../../constants/urls";

const GoogleAuth = ({userIsLoggedIn,setUserIsLoggedIn,setUserRoles,setToken, token}) =>{

  let { gtoken } = useParams();
  useEffect(()=>{
    const validateToken = () =>{
      if(!gtoken) window.location.replace('/');
      axios({
        url:`${urls.apiUrl}/api/users/internal/googlelogin/${gtoken}`,
        method: 'GET',
      }).then((res)=>{
        if(res.data.token === undefined){
          console.log('undefined')
          window.location.replace('/');
        } 
        setUserRoles(JSON.parse(atob(res.data.token.split('.')[1])).roles);
        localStorage.setItem('token', res.data.token)
        setUserIsLoggedIn(true)
        setToken(res.data.token)
        setInterval(refreshToken, 7180*1000)
      })
    }
    if(!userIsLoggedIn){
      validateToken()
    }
  })
  
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

  return(
    <>
      {userIsLoggedIn &&
        <Navigate to={"/"} />
      }
      <Outlet/>
    </>
  )
}
export default GoogleAuth
import { useEffect, useState } from "react"
import { Navigate, Outlet, redirect, useParams } from "react-router-dom"
import axios from 'axios';
import urls from "../../constants/urls";

const GoogleAuth = ({userIsLoggedIn,setUserIsLoggedIn,setToken, token}) =>{

  let { gtoken } = useParams();
  useEffect(()=>{
    const validateToken = () =>{
      if(!gtoken) window.location.replace('/');
      axios({
        url:`${urls.apiUrl}/api/users/internal/googlelogin/${gtoken}`,
        method: 'GET',
      }).then((res)=>{
        if(res.data.token == undefined){
          console.log('undefined')
          window.location.replace('/');
        } 
        localStorage.setItem('token', res.data.token)
        setUserIsLoggedIn(true)
        setToken(res.data.token)
      })
    }
    if(!userIsLoggedIn){
      validateToken()
    }
  },[])

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
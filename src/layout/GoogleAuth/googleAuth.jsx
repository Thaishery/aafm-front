import { useEffect, useState } from "react"
import { Navigate, Outlet, redirect, useParams } from "react-router-dom"
import axios from 'axios';
import urls from "../../constants/urls";

const GoogleAuthLayout = ({userIsLoggedIn,setUserIsLoggedIn}) =>{

  let { token } = useParams();
  useEffect(()=>{
    if(!token) window.location.replace('/');
    axios({
      url:`${urls.apiUrl}/api/users/internal/googlelogin/${token}`,
      method: 'GET',
    }).then((res)=>{
      if(res.data.token == undefined) window.location.replace('/');
      localStorage.setItem('token', JSON.stringify(res.data.token))
      setUserIsLoggedIn(true)
      window.location.replace('/');
    })
  },[])

  return(
    <>
      <Outlet/>
    </>
  )
}
export default GoogleAuthLayout
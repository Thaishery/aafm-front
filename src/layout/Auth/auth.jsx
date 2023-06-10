import { useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = () =>{
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(true)
  return(
    <>
    {!userIsLoggedIn && <Navigate to="/" replace={true} />}
      logique d'authentification 
      <Outlet/>
    </>
  )
}
export default AuthLayout
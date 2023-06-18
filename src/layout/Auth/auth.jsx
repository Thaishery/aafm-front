import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = () =>{
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(true)
  
  //? test change function : 
  const onChange = ()=>{
    setUserIsLoggedIn(false)
  }

  return(
    <>
      <input type="checkbox" onChange={onChange}/>changeStateTrigger<input/>
    {!userIsLoggedIn &&
    <>
      <span className="false">should have navigate</span>
      {/* <Navigate to="/" replace={true} /> */}
    </>
    }
      <span className="true">logique d'authentification</span> 
      <Outlet/>
    </>
  )
}
export default AuthLayout
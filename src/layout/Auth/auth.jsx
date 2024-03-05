import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = ({userIsLoggedIn,setUserIsLoggedIn}) =>{
  // const [userIsLoggedIn, setUserIsLoggedIn] = useState(true)
  
  //? test change function : 
  const onChange = ()=>{
    setUserIsLoggedIn(!userIsLoggedIn)
  }

  return(
    <>
      <input type="checkbox" checked={userIsLoggedIn} onChange={onChange}/> changeStateTrigger
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
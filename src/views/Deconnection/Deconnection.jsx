import { useEffect } from "react"
import { Navigate } from "react-router-dom"

const Deconnection = ({setUserIsLoggedIn})=>{
  useEffect(()=>{
    localStorage.clear('token')
    setUserIsLoggedIn(false)
  })
  return(
    <Navigate to={"/"} />
  )
}
export default Deconnection
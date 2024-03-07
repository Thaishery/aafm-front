import { Navigate } from "react-router-dom"

const Deconnection = ({setUserIsLoggedIn})=>{
  localStorage.clear('token')
  setUserIsLoggedIn(false)
  return(
    <Navigate to={"/"} />
  )
}
export default Deconnection
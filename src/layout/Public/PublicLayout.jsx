import { Outlet } from "react-router-dom"
import Footer from "../../componant/footer/Footer"
// import './style.scss'
import { useEffect, useState } from "react"
import Header from "../../componant/header/header"
import LogedLayout from "../Loged/LogedLayout"

const PublicLayout = ({userIsLoggedIn ,token}) =>{ 
  if(userIsLoggedIn == true){
    return (<LogedLayout userIsLoggedIn={userIsLoggedIn} token={token}/>)
  }
  const defaultMenu = [
    {path:"/",link:"Accueil"},{path:"/auth",link:"Espace membre"}
  ]
  const [navElements,setNavElements] = useState(defaultMenu)
  return (
    <>
    <Header navElements={navElements} />
    <div className="main_container">
      <Outlet />
    </div>
    <Footer />
    </>
  )
}
export default PublicLayout
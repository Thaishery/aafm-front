import { Outlet } from "react-router-dom"
import Footer from "../../componant/footer/Footer"
// import './style.scss'
import { useEffect, useState } from "react"
import Header from "../../componant/header/header"
import LogedLayout from "../Loged/LogedLayout"
import "../style.scss"
import Cookies from "../../componant/Cookies/Cookies"

const PublicLayout = ({userIsLoggedIn ,token}) =>{ 
  const cookies = localStorage.getItem('cookies');
  const [cliked,setClicked] = useState(false)
  if(userIsLoggedIn == true){
    return (<LogedLayout userIsLoggedIn={userIsLoggedIn} token={token}/>)
  }
  const defaultMenu = [
    {path:"/",link:"Accueil"},{path:"/auth",link:"Espace membre"}
  ]
  const [navElements,setNavElements] = useState(defaultMenu)
  return (
    <>
    {cliked &&
    <></>
    }
    <Header navElements={navElements} />
    <div className="main_container">
    {cookies === null || cookies !== "true" ? <Cookies setClicked={setClicked} cliked={cliked} /> : null}
      <Outlet />
    </div>
    <Footer />
    </>
  )
}
export default PublicLayout
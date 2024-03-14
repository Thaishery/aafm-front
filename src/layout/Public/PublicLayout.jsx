import { Outlet } from "react-router-dom"
import Footer from "../../componant/footer/Footer"
// import './style.scss'
import { useEffect, useState } from "react"
import Header from "../../componant/header/header"
import LogedLayout from "../Loged/LogedLayout"
import "../style.scss"
import Cookies from "../../componant/Cookies/Cookies"

const PublicLayout = ({userIsLoggedIn ,token}) =>{ 
  const [cookies,setCookies] = useState();
  useEffect(()=>{
    setCookies(localStorage.getItem('cookies'));
  },[])
  const [cliked,setClicked] = useState(false)
  const defaultMenu = [
    {path:"/",link:"Accueil"},{path:"/connexion",link:"Espace membre"}
  ]
  const [navElements,setNavElements] = useState(defaultMenu)
  if(userIsLoggedIn === true){
    return (<LogedLayout userIsLoggedIn={userIsLoggedIn} token={token}/>)
  }else return (
    <>
      {cliked &&
        <> 
          {/* cheap way to force re-render */}
        </>
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
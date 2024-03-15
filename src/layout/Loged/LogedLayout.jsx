import { Outlet } from "react-router-dom"
import Footer from "../../componant/footer/Footer"
// import './style.scss'
import { useEffect, useState } from "react"
import Header from "../../componant/header/header"
import ModedLayout from "../Moded/ModedLayout"
import Cookies from "../../componant/Cookies/Cookies"

const LogedLayout = ({userRoles}) =>{ 
  const [cookies,setCookies] = useState();
  useEffect(()=>{
    setCookies(localStorage.getItem('cookies'));
  })
  const [cliked,setClicked] = useState(false)
  const defaultMenu = [
    {path:"/",link:"Accueil"},{path:"/categories", link:"Catégories"},{path:"/activitees",link:"Activitées"},{path:"/monCompte",link:"Mon Compte"},{path:'/Deconnection', link:'Déconnection'}
  ]
  const [navElements,setNavElements] = useState(defaultMenu)
  if(userRoles.indexOf('ROLE_MODERATOR') !== -1 || userRoles.indexOf('ROLE_ADMIN') !== -1){
    return (<ModedLayout userRoles={userRoles}/>)
  }else return (
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
export default LogedLayout
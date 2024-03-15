import { Outlet } from "react-router-dom"
import Footer from "../../componant/footer/Footer"
// import './style.scss'
import { useEffect, useState } from "react"
import Header from "../../componant/header/header"
import Cookies from "../../componant/Cookies/Cookies"

const ModedLayout = () =>{ 
  const [cookies,setCookies] = useState();
  useEffect(()=>{
    setCookies(localStorage.getItem('cookies'));
  })
  const [cliked,setClicked] = useState(false)
  const defaultMenu = [
    {path:"/",link:"Accueil"},{path:"/moderation", link:"moded"},{path:"/categories", link:"Catégories"},{path:"/activitees",link:"Activitées"},{path:"/monCompte",link:"Mon Compte"},{path:'/Deconnection', link:'Déconnection'}
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
export default ModedLayout
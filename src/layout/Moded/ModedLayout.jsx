import { Outlet } from "react-router-dom"
import Footer from "../../componant/footer/Footer"
// import './style.scss'
import { useState } from "react"
import Header from "../../componant/header/header"

const ModedLayout = () =>{ 
  const defaultMenu = [
    {path:"/",link:"Accueil"},{path:"/moderation", link:"moded"},{path:"/categories", link:"Catégories"},{path:"/activitees",link:"Activitées"},{path:"/monCompte",link:"Mon Compte"},{path:'/Deconnection', link:'Déconnection'}
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
export default ModedLayout
import { Outlet } from "react-router-dom"
import Logo from '../../assets/img/logo_clean.webp'
import Burger from "../../componant/Navbar/burger"
import NavDesktop from "../../componant/Navbar/nav-desktop"
import Footer from "../../componant/footer/Footer"
import './style.scss'

const Header = () =>{ 
  const navElements = [{path:"/",link:"home"},{path:"/test",link:"test"}]
  return (
    <>
    <div className="header">
      <div className="img-container">
        <img src={Logo} alt="Logo de l'aafm" className="logo-img"/>
      </div>
      <div className="title-container">
        <h1>Association de l'amitie Franco-Marocaine de Grigny</h1>
      </div>
      <Burger navElements={navElements}/>
      <div className="nav-desktop-filler"></div>
    </div>
    <hr className="nav-desktop-line"></hr>
    <div className="nav-container-desktop">
        <NavDesktop navElements={navElements}/>
    </div>
    <Outlet />
    <Footer />
    </>
  )
}
export default Header
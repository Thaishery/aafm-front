// import {  useState } from "react"
import "./style.scss";
// import { Navigate } from "react-router-dom";

const Cookies = ({setClicked,cliked}) =>{
  const acceptCookies = ()=>{
    setClicked(!cliked)
    cookiesExpirationTime()
    localStorage.setItem('cookies','true')
  }
  const refuseCookies = ()=>{
    setClicked(!cliked)
    window.location.replace('https://google.fr');
    // localStorage.setItem('cookies','false')
    // cookiesExpirationTime()
  }
  const cookiesExpirationTime = ()=>{
    localStorage.setItem('cookiesExpirations', ""+Date.now())
  }

  return(
    <>
    <div className="bscbypass-template">
      <div className="bscbypass-inner">
        <p className="bscbypass-messages">
          En poursuivant votre navigation sur ce site, vous acceptez l’utilisation de cookies pour faciliter votre visite. <a className="link" href="/pages/RGPD">Politique de confidentialité.</a>
        </p>
        <div className="bscbypass-buttons">
          <button onClick={acceptCookies}>Accepter les cookies</button>
          <button onClick={refuseCookies}>Refuser les cookies</button>
        </div>
      </div>
    </div>
    </>
  )
}
export default Cookies;
import './style.scss'
import logo from '../../assets/img/logo_clean.webp'
// import instagramLogo from '../../assets/img/Instagram_logo.webp'
import facebookLogo from '../../assets/img/facebook-logo.webp'

const Footer = () =>{
  const links = [{path:"/",link:"Accueil"},{path:"/pages/rgpd",link:"Mes données"}]

  return( 
    <div className="footer-container">
      <div className="footer-top-container">
        <div className="link-container">
          <ul className='link-list'>
            {links &&
              links.map((link)=>
                <li className='link-list-element' key={link.path}>
                  <a href={link.path} className="link-link">
                    <div className='link-content'>
                      {link.link}
                    </div>
                  </a>
                </li>
              )
            }
          </ul>
        </div>
        <div className="moto-container">
          <div className="moto-text">
            <p>16 place aux Herbes. 91350 GRIGNY <br />
            <a href="mailto:aafmgrigny@gmail.com">aafmgrigny@gmail.com</a>
            </p>
          </div>
          <div className='moto-logo-container'>
            <img className='moto-logo' src={logo} alt="logo de l'association de l'amitie franco-marocaine de grigny" />
          </div>
        </div>
      </div>
      <div className="social-network">
        <span className='social-network-text'>Retrouvez nous sur : </span>
        <div className="social-links">
          <a href="https://www.facebook.com/RAKOUBMOHAMMED/?locale=fr_FR">
            <img className='social-logo' src={facebookLogo} alt="logo du reseau social" />
          </a>
        </div>
      </div>
      <div className="copyright-container">
        <div className="copyright-left">
          <span>Association de l'amitiée Franco - Marocaine de Grigny</span>
        </div>
        <div className='copyright-separator'></div>
        <div className="copyright-right">
          <span>Réaliser par : <a className='copyright-link' rel="noreferrer" href="http://gdeb.fr" target="_blank">Guillaume DEBUCQUET</a></span>
        </div>
      </div>
    </div>
  )
}
export default Footer
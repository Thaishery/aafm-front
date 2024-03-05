import { Link, Navigate } from "react-router-dom"

const NavDesktop = ({ navElements }) => {

  return (
    <>
      <nav>
        <ul className="nav-desktop-element-container">
          {navElements.map((element) => (
            <li key={element.link} className="nav-desktop-element">
              <Link to={element.path} className="nav-desktop-link">
                <div className="nav-desktop-link-container">
                  {element.link}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
export default NavDesktop